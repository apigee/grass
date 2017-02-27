/**
 * Created by rmahalank on 2/13/17.
 */

var request = require('request');
var Usergrid = {};

//authentication type constants
var AUTH_CLIENT_ID = 'CLIENT_ID';
var AUTH_APP_USER = 'APP_USER';
var AUTH_NONE = 'NONE';

Usergrid.Client = function (options) {
    //usergrid enpoint
    this.URI = options.URI || 'https://api.usergrid.com';

    //Find your Orgname and Appname in the Admin portal (http://apigee.com/usergrid)
    if (options.orgName) {
        this.set('orgName', options.orgName);
    }
    if (options.appName) {
        this.set('appName', options.appName);
    }

    //authentication data
    this.authType = options.authType || AUTH_NONE;
    this.clientId = options.clientId;
    this.clientSecret = options.clientSecret;
    this.token = options.token || null;

    //other options
    this.buildCurl = options.buildCurl || false;
    this.logging = options.logging || false;

    //timeout and callbacks
    this._callTimeout = options.callTimeout || 30000; //default to 30 seconds
    this._callTimeoutCallback = options.callTimeoutCallback || null;
    this.logoutCallback = options.logoutCallback || null;
};

/*
 *  Main function for making requests to the API.  Can be called directly.
 *
 *  options object:
 *  `method` - http method (GET, POST, PUT, or DELETE), defaults to GET
 *  `qs` - object containing querystring values to be appended to the uri
 *  `body` - object containing entity body for POST and PUT requests
 *  `endpoint` - API endpoint, for example 'users/fred'
 *  `mQuery` - boolean, set to true if running management query, defaults to false
 *
 *  @method request
 *  @public
 *  @params {object} options
 *  @param {function} callback
 *  @return {callback} callback(err, data)
 */
Usergrid.Client.prototype.request = function (options, callback) {
    var self = this;
    var method = options.method || 'GET';
    var endpoint = options.endpoint;
    var body = options.body || {};
    var qs = options.qs || {};
    var mQuery = options.mQuery || false; //is this a query to the management endpoint?
    var orgName = this.get('orgName');
    var appName = this.get('appName');
    if (!mQuery && !orgName && !appName) {
        if (typeof(this.logoutCallback) === 'function') {
            return this.logoutCallback(true, 'no_org_or_app_name_specified');
        }
    }
    var uri;
    if (mQuery) {
        uri = this.URI + '/' + endpoint;
    } else {
        uri = this.URI + '/' + orgName + '/' + appName + '/' + endpoint;
    }

    if (this.authType === AUTH_CLIENT_ID) {
        qs['client_id'] = this.clientId;
        qs['client_secret'] = this.clientSecret;
    } else if (this.authType === AUTH_APP_USER && self.getToken()) {
        qs['access_token'] = self.getToken();
    }

    if (this.logging) {
        console.log('calling: ' + method + ' ' + uri);
    }
    this._start = new Date().getTime();
    var callOptions = {
        method: method,
        uri: uri,
        json: body,
        qs: qs
    };
    request(callOptions, function (err, r, data) {

        r.body = r.body || {};
        data = data || {};

        if (self.buildCurl) {
            options.uri = r.request.uri.href;
            self.buildCurlCall(options);
        }
        self._end = new Date().getTime();
        if (r.statusCode === 200) {
            if (self.logging) {
                console.log('success (time: ' + self.calcTimeDiff() + '): ' + method + ' ' + uri);
            }
            callback(err, data);
        } else {
            err = true;
            data.statusCode = r.statusCode;
            if ((r.error === 'auth_expired_session_token') ||
                (r.error === 'auth_missing_credentials') ||
                (r.error == 'auth_unverified_oath') ||
                (r.error === 'expired_token') ||
                (r.error === 'unauthorized') ||
                (r.error === 'auth_invalid')) {
                //this error type means the user is not authorized. If a logout function is defined, call it
                var error = r.body.error;
                var errorDesc = r.body.error_description;
                if (self.logging) {
                    console.log('Error (' + r.statusCode + ')(' + error + '): ' + errorDesc);
                }
                //if the user has specified a logout callback:
                if (typeof(self.logoutCallback) === 'function') {
                    self.logoutCallback(err, data);
                } else if (typeof(callback) === 'function') {
                    callback(err, data);
                }
            } else {
                var error = r.body.error;
                var errorDesc = r.body.error_description;
                if (self.logging) {
                    console.log('Error (' + r.statusCode + ')(' + error + '): ' + errorDesc);
                }
                if (typeof(callback) === 'function') {
                    callback(err, data);
                }
            }
        }
    });
};


/*
 *  Main function for creating new entities - should be called directly.
 *
 *  options object: options {data:{'type':'collection_type', 'key':'value'}, uuid:uuid}}
 *
 *  @method createEntity
 *  @public
 *  @params {object} options
 *  @param {function} callback
 *  @return {callback} callback(err, data)
 */
Usergrid.Client.prototype.createEntity = function (options, callback) {
    // todo: replace the check for new / save on not found code with simple save
    // when users PUT on no user fix is in place.
    /*
     var options = {
     client:this,
     data:options
     }
     var entity = new Usergrid.Entity(options);
     entity.save(function(err, data) {
     if (typeof(callback) === 'function') {
     callback(err, entity);
     }
     });
     */
    var getOnExist = options.getOnExist || false; //if true, will return entity if one already exists
    var options = {
        client: this,
        data: options
    };
    var entity = new Usergrid.Entity(options);
    entity.fetch(function (err, data) {
        //if the fetch doesn't find what we are looking for, or there is no error, do a save
        var okToSave = (err && 'service_resource_not_found' === data.error || 'no_name_specified' === data.error || 'null_pointer' === data.error) || (!err && getOnExist);
        if (okToSave) {
            entity.set(options.data); //add the data again just in case
            entity.save(function (err, data) {
                if (typeof(callback) === 'function') {
                    callback(err, entity, data);
                }
            });
        } else {
            if (typeof(callback) === 'function') {
                callback(err, entity, data);
            }
        }
    });

};


/*
 *  A private method to get call timing of last call
 */
Usergrid.Client.prototype.calcTimeDiff = function () {
    var seconds = 0;
    var time = this._end - this._start;
    try {
        seconds = ((time / 10) / 60).toFixed(2);
    } catch (e) {
        return 0;
    }
    return seconds;
};

Usergrid.Client.prototype.set = function (key, value) {
    var keyStore =  'apigee_' + key;
    this[key] = value;
    if(typeof(Storage)!=="undefined"){
        if (value) {
            localStorage.setItem(keyStore, value);
        } else {
            localStorage.removeItem(keyStore);
        }
    }
}

/*
 *  A class to Model a Usergrid Entity.
 *  Set the type and uuid of entity in the 'data' json object
 *
 *  @constructor
 *  @param {object} options {client:client, data:{'type':'collection_type', uuid:'uuid', 'key':'value'}}
 */
Usergrid.Entity = function (options) {
    if (options) {
        this._data = options.data || {};
        this._client = options.client || {};
    }
};

/*
 *  gets a specific field or the entire data object. If null or no argument
 *  passed, will return all data, else, will return a specific field
 *
 *  @method get
 *  @param {string} field
 *  @return {string} || {object} data
 */
Usergrid.Entity.prototype.get = function (field) {
    if (field) {
        return this._data[field];
    } else {
        return this._data;
    }
};

/*
 *  adds a specific key value pair or object to the Entity's data
 *  is additive - will not overwrite existing values unless they
 *  are explicitly specified
 *
 *  @method set
 *  @param {string} key || {object}
 *  @param {string} value
 *  @return none
 */
Usergrid.Entity.prototype.set = function (key, value) {
    if (typeof key === 'object') {
        for (var field in key) {
            this._data[field] = key[field];
        }
    } else if (typeof key === 'string') {
        if (value === null) {
            delete this._data[key];
        } else {
            this._data[key] = value;
        }
    } else {
        this._data = {};
    }
};

/*
 *  Saves the entity back to the database
 *
 *  @method save
 *  @public
 *  @param {function} callback
 *  @return {callback} callback(err, data)
 */
Usergrid.Entity.prototype.save = function (callback) {
    var type = this.get('type');
    var method = 'POST';
    if (isUUID(this.get('uuid'))) {
        method = 'PUT';
        type += '/' + this.get('uuid');
    }

    //update the entity
    var self = this;
    var data = {};
    var entityData = this.get();
    var password = this.get('password');
    var oldpassword = this.get('oldpassword');
    var newpassword = this.get('newpassword');
    //remove system specific properties
    for (var item in entityData) {
        if (item === 'metadata' || item === 'created' || item === 'modified' ||
            item === 'oldpassword' || item === 'newpassword' || //old and new pw not added to data
            item === 'type' || item === 'activated' || item === 'uuid') {
            continue;
        }
        data[item] = entityData[item];
    }
    var options = {
        method: method,
        endpoint: type,
        body: data
    };
    //save the entity first
    this._client.request(options, function (err, retdata) {
        //clear out pw info if present
        self.set('password', null);
        self.set('oldpassword', null);
        self.set('newpassword', null);
        if (err && self._client.logging) {
            console.log('could not save entity');
            if (typeof(callback) === 'function') {
                return callback(err, retdata, self);
            }
        } else {
            if (retdata.entities) {
                if (retdata.entities.length) {
                    var entity = retdata.entities[0];
                    self.set(entity);
                    var path = retdata.path;
                    //for connections, API returns type
                    while (path.substring(0, 1) === "/") {
                        path = path.substring(1);
                    }
                    self.set('type', path);
                }
            }
            //if this is a user, update the password if it has been specified;
            var needPasswordChange = ((self.get('type') === 'user' || self.get('type') === 'users') && oldpassword && newpassword);
            if (needPasswordChange) {
                //Note: we have a ticket in to change PUT calls to /users to accept the password change
                //      once that is done, we will remove this call and merge it all into one
                var pwdata = {};
                pwdata.oldpassword = oldpassword;
                pwdata.newpassword = newpassword;
                var options = {
                    method: 'PUT',
                    endpoint: type + '/password',
                    body: pwdata
                };
                self._client.request(options, function (err, data) {
                    if (err && self._client.logging) {
                        console.log('could not update user');
                    }
                    //remove old and new password fields so they don't end up as part of the entity object
                    self.set('oldpassword', null);
                    self.set('newpassword', null);
                    if (typeof(callback) === 'function') {
                        callback(err, data, self);
                    }
                });
            } else if (typeof(callback) === 'function') {
                callback(err, retdata, self);
            }
        }
    });
};

/*
 *  refreshes the entity by making a GET call back to the database
 *
 *  @method fetch
 *  @public
 *  @param {function} callback
 *  @return {callback} callback(err, data)
 */
Usergrid.Entity.prototype.fetch = function (callback) {
    var type = this.get('type');
    var self = this;

    //Check for an entity type, then if a uuid is available, use that, otherwise, use the name
    try {
        if (type === undefined) {
            throw 'cannot fetch entity, no entity type specified'
        } else if (this.get('uuid')) {
            type += '/' + this.get('uuid');
        } else if (type === 'users' && this.get('username')) {
            type += '/' + this.get('username');
        } else if (this.get('name')) {
            type += '/' + encodeURIComponent(this.get('name'));
        } else if (typeof(callback) === 'function') {
            throw 'no_name_specified';
        }
    } catch (e) {
        if (self._client.logging) {
            console.log(e);
        }
        return callback(true, {
            error: e
        }, self);
    }
    var options = {
        method: 'GET',
        endpoint: type
    };
    this._client.request(options, function (err, data) {
        if (err && self._client.logging) {
            console.log('could not get entity');
        } else {
            if (data.user) {
                self.set(data.user);
                self._json = JSON.stringify(data.user, null, 2);
            } else if (data.entities) {
                if (data.entities.length) {
                    var entity = data.entities[0];
                    self.set(entity);
                }
            }
        }
        if (typeof(callback) === 'function') {
            callback(err, data, self);
        }
    });
};


exports.client = Usergrid.Client;
exports.entity = Usergrid.Entity;
exports.AUTH_CLIENT_ID = AUTH_CLIENT_ID;
exports.AUTH_APP_USER = AUTH_APP_USER;
exports.AUTH_NONE = AUTH_NONE;
