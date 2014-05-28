/*
 GET home page.
 */

var Usergrid = require("usergrid");
var pkginfo = require('../package')


var client = new Usergrid.client({
  orgName :  pkginfo.orgName,
  appName :  pkginfo.appName,
  authType : Usergrid.AUTH_CLIENT_ID,
  clientId : pkginfo.client_id,
  clientSecret : pkginfo.client_secret
});


function getCurrenTime() {

  var now = new Date();
  var utc_now = new Date(now.getUTCFullYear(), now.getUTCMonth(), now
      .getUTCDate(), now.getUTCHours(), now.getUTCMinutes(), now
      .getUTCSeconds(), now.getUTCMilliseconds());
  var current_time = utc_now.getTime() + "";

  return current_time;

}

function createGuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

function parseJSON(json) {
  if (json != null) {
    try {
      parsedJSon = JSON.parse(JSON.stringify(json));
      return parsedJSon;
    } catch (e) {
      return null;
    }
  }

}

exports.createConsent = function(req, res) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Content-Type', 'application/json');

  console.log('in the flow to create consent');
  // intercept OPTIONS method
  if ('OPTIONS' == req.method) {
    res.send(200);
  }

  var now = new Date();
  var utc_now = new Date(now.getUTCFullYear(), now.getUTCMonth(), now
      .getUTCDate(), now.getUTCHours(), now.getUTCMinutes(), now
      .getUTCSeconds(), now.getUTCMilliseconds());
  var current_time = utc_now.getTime() + "";
  var sso_token = null;
  var scope = null;
  if (req.body.sso_token != null) {
    try {
      sso_token = JSON.parse(JSON.stringify(req.body.sso_token));
    } catch (e) {
    }
  }
  if (req.body.scope != null && req.body.scope != "") {
    try {

      scope = JSON.parse(JSON.stringify(req.body.scope));
    } catch (e) {
    }
  }
  var consent_id = createGuid();
  var options = {
    type : 'consents',
    name : consent_id,
    uuid : consent_id,
    company_id : req.body.company_id,
    client_id : req.body.client_id,
    end_user_id : req.body.end_user_id,
    device_type : req.body.device_type,
    authorization_code : req.body.authorization_code,
    application_name : req.body.application_name,
    consent_id : consent_id,
    access_token : req.body.access_token,
    consent_type : req.body.type || "in-band",
    scope : scope,
    status : req.body.status,
    sso_token : sso_token || "",
    last_updated : current_time
  }

  client.createEntity(options, function(err, response) {
    if (err) {
      var error = {
        "error_code" : "server_error",
        "error_description" : "consent not created"
      }
      res.send(500, error);
    } else {
      if (sso_token != null && sso_token != "undefined") {
        for ( var i in sso_token) {

          if (sso_token[i] != null && sso_token[i].site_id != null
              && sso_token[i].token != null) {

            ssoData = {
              type : 'ssos',
              name : sso_token[i].token,
              token : sso_token[i].token,
              site_id : sso_token[i].site_id,
              created_on : current_time,
              consent_id : consent_id
            }
            client.createEntity(ssoData, function(err, response) {
              if (err) {
                var error = {
                  "error_code" : "server_error",
                  "error_description" : "consent not created"
                }
                res.send(500, error);
              }
            });
          }
        }
      }
      res.send({
        'consent_id' : consent_id,
        'last_updated' : current_time
      });
    }
  });

};

exports.updateConsent = function(req, res) {

  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Content-Type', 'application/json');
  console.log('in the flow to create consent');
  // intercept OPTIONS method
  if ('OPTIONS' == req.method) {
    res.send(200);
  }

  var consent_id = req.param("consentid");
  console.log("consent_id" + consent_id);

  var current_time = getCurrenTime();

  var options = {
    endpoint : "consents",
    qs : {
      ql : "consent_id = " + consent_id
    }
  };

  client
      .request(
          options,
          function(error, response) {

            if (error || response == null || response.entities[0] == null) {

              var error = {
                "error_code" : "bad_request",
                "error_description" : "consent doesn't exist"
              }
              res.send(400, error);

            } else {
              console.log(response);
              var status = response.entities[0].status;
              if (req.body.status != null && req.body.status != ""
                  && response.entities[0].status != null) {
                if (response.entities[0].status != "active") {
                  // status = response.entities[0].status;
                  var error = {
                    "error_code" : "bad_request",
                    "error_description" : "revoked or expired consent cannot be updated"
                  }
                  res.send(400, error);
                } else {
                  status = req.body.status;
                }
              }
              var scope = null;
              if (req.body.scope != null && req.body.scope != "") {
                try {

                  scope = JSON.parse(JSON.stringify(req.body.scope));
                } catch (e) {
                }
              }

              var options = {
                method : 'PUT',
                endpoint : 'consents/' + consent_id,
                body : {
                  company_id : response.entities[0].company_id,
                  client_id : response.entities[0].client_id,
                  application_name : response.entities[0].application_name,
                  end_user_id : response.entities[0].end_user_id,
                  device_type : response.entities[0].device_type,
                  authorization_code : response.entities[0].authorization_code,
                  consent_id : response.entities[0].consent_id,
                  access_token : req.body.access_token
                      || response.entities[0].access_token,
                  sso_token : response.entities[0].sso_token,
                  scope : scope || response.entities[0].scope,
                  status : status,
                  consent_type : response.entities[0].consent_type,
                  last_updated : current_time
                }
              }

              client.request(options, function(err, data) {
                if (err) {
                  var error = {
                    "error_code" : "server_error",
                    "error_description" : "consent couldn't be updated"
                  }
                  res.send(500, error);
                } else {
                  var responseJson = options.body;
                  res.send(responseJson);

                }
              });
            }
          });
}

exports.SSOaction = function(req, res) {

  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Content-Type', 'application/json');

  console.log('in the flow to create consent');
  // intercept OPTIONS method
  if ('OPTIONS' == req.method) {
    res.send(200);
  }

  var token = req.param("sso_token");
  var action = req.query.action;
  var token_life = req.query.token_life;
  var current_time = getCurrenTime();

  var options = {
    endpoint : "ssos",
    qs : {
      ql : "token = " + token
    }
  };

  client
      .request(
          options,
          function(error, response) {

            if (error || response == null || response.entities[0] == null
                || response.entities[0].consent_id == null) {
              var error = {
                "error_code" : "bad_request",
                "error_description" : "invalid SSO token"
              }
              res.send(400, error);

            } else if (token_life != null
                && (parseFloat(response.entities[0].last_updated) + parseFloat(token_life)) < parseFloat(current_time)) {

              var options = {
                method : 'PUT',
                endpoint : 'ssos/' + response.entities[0].uuid,
                body : {
                  status : "expired",
                }
              }

              client.request(options, function(err, data) {

                var error = {
                  "error_code" : "invalid_token",
                  "error_description" : "sso_token is expired"
                }
                res.send(400, error);

              });

            } else {
              var consent_id = response.entities[0].consent_id;
              var sso_token = token;
              var site_id = response.entities[0].site_id;
              var status = response.entities[0].status;
              var consent_id = response.entities[0].consent_id;
              var uuid = response.entities[0].uuid;

              var consentQuery = {
                endpoint : "consents",
                qs : {
                  ql : "consent_id = " + consent_id
                }
              };

              client
                  .request(
                      consentQuery,
                      function(error, consent) {

                        if (error || consent == null
                            || consent.entities[0] == null
                            || consent.entities[0].sso_token == null) {
                          var error = {
                            "error_code" : "bad_request",
                            "error_description" : "invalid SSO token1"
                          }
                          res.send(400, error);

                        } else {
                          console.log("*****action****" + action);
                          if (action == "validate") {

                            var responseConsent = {
                              application_name : consent.entities[0].application_name,
                              client_id : consent.entities[0].client_id,
                              company_id : consent.entities[0].company_id,
                              end_user_id : consent.entities[0].end_user_id,
                              device_type : consent.entities[0].device_type,
                              authorization_code : consent.entities[0].authorization_code,
                              consent_id : consent.entities[0].consent_id,
                              access_token : consent.entities[0].access_token,
                              sso_token : sso_token,
                              site_id : site_id,
                              scope : consent.entities[0].scope,
                              status : consent.entities[0].status,
                              consent_type : consent.entities[0].consent_type,
                              last_updated : consent.entities[0].last_updated
                            }

                            res.send(responseConsent);

                          } else if (action == "revoke") {

                            var ssoData = {
                              method : 'PUT',
                              endpoint : 'ssos/' + uuid,
                              body : {
                                status : "revoked",
                              }
                            }

                            client
                                .request(
                                    ssoData,
                                    function(err, data) {
                                      if (err) {
                                        var error = {
                                          "error_code" : "server_error",
                                          "error_description" : "sso_token couldn't be revoked"
                                        }
                                        res.send(500, error);
                                      } else {

                                        var responseConsent = {
                                          application_name : consent.entities[0].application_name,
                                          client_id : consent.entities[0].client_id,
                                          company_id : consent.entities[0].company_id,
                                          end_user_id : consent.entities[0].end_user_id,
                                          device_type : consent.entities[0].device_type,
                                          authorization_code : consent.entities[0].authorization_code,
                                          consent_id : consent.entities[0].consent_id,
                                          access_token : consent.entities[0].access_token,
                                          sso_token : sso_token,
                                          site_id : site_id,
                                          scope : consent.entities[0].scope,
                                          status : "revoked",
                                          consent_type : consent.entities[0].consent_type,
                                          last_updated : consent.entities[0].modified
                                        }

                                        res.send(responseConsent);

                                      }

                                    });

                          }

                          else if (action == "refresh") {

                            if (status == "active") {
                              console.log("****in refresh flow*****")
                              var new_token = createGuid();
                              var ssoData = {
                                method : 'PUT',
                                endpoint : 'ssos/' + uuid,
                                body : {
                                  site_id : site_id,
                                  status : status,
                                  consent_id : consent_id,
                                  token : new_token,
                                  last_updated : current_time

                                }
                              }

                              client
                                  .request(
                                      ssoData,
                                      function(err, data) {
                                        if (err) {
                                          var error = {
                                            "error_code" : "server_error",
                                            "error_description" : "sso_token couldn't be refreshed"
                                          }
                                          res.send(500, error);
                                        } else {

                                          if (consent.entities[0].sso_token != null) {

                                            for ( var i in consent.entities[0].sso_token) {
                                              if (consent.entities[0].sso_token[i].token == token) {
                                                consent.entities[0].sso_token[i].token = new_token;
                                              }

                                            }
                                          }
                                          var consentData = {
                                            method : 'PUT',
                                            endpoint : 'consents/'
                                                + response.entities[0].consent_id,
                                            body : {
                                              sso_token : consent.entities[0].sso_token,
                                            }
                                          }

                                          client
                                              .request(
                                                  consentData,
                                                  function(err, data) {
                                                    if (err) {
                                                      var error = {
                                                        "error_code" : "server_error",
                                                        "error_description" : "sso_token couldn't be updated"
                                                      }
                                                      res.send(500, error);
                                                    } else {

                                                      resposneJson = {
                                                        application_name : consent.entities[0].application_name,
                                                        client_id : consent.entities[0].client_id,
                                                        company_id : consent.entities[0].company_id,
                                                        end_user_id : consent.entities[0].end_user_id,
                                                        device_type : consent.entities[0].device_type,
                                                        authorization_code : consent.entities[0].authorization_code,
                                                        consent_id : consent.entities[0].consent_id,
                                                        access_token : consent.entities[0].access_token,
                                                        sso_token : new_token,
                                                        site_id : site_id,
                                                        scope : consent.entities[0].scope,
                                                        status : status,
                                                        consent_type : consent.entities[0].consent_type,
                                                        last_updated : consent.entities[0].modified
                                                      }

                                                      res.send(resposneJson);

                                                    }
                                                  });
                                        }

                                      });

                            } else {
                              var error = {
                                "error_code" : "invalid_token",
                                "error_description" : "token is not active"
                              }
                              res.send(400, error);

                            }
                          }
                        }
                      });
            }
          });
}

exports.getConsent = function(req, res) {

  console.log("in get consent flow");
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  res.header('Content-Type', 'application/json');

  console.log('in the flow to get consent');
  // intercept OPTIONS method
  if ('OPTIONS' == req.method) {
    res.send(200);
  }

  var entities = [];
  var queryString = "";
  var queryParam = null;

  // Create query as per request parameter
  if (req.query.consent_id != null && req.query.consent_id != "") {
    queryString = "consent_id = " + req.query.consent_id;
    queryParam = "consent_id";
  } else if (req.query.user_id != null && req.query.user_id != "") {
    queryString = "end_user_id = '" + req.query.user_id + "'";
    queryParam = "user_id";

  } else if (req.query.client_id != null && req.query.client_id != "") {
    queryString = "client_id = '" + req.query.client_id + "'";
    queryParam = "client_id";

  } else if (req.query.company_id != null && req.query.company_id != "") {
    queryString = "company_id = '" + req.query.company_id + "'";
    queryParam = "company_id";
  } else if (req.query.access_token != null && req.query.access_token != "") {
    queryString = "access_token = '" + req.query.access_token + "'";
    queryParam = "access_token";
  } else if (req.query.authorization_code != null
      && req.query.authorization_code != "") {
    queryString = "authorization_code = '" + req.query.authorization_code + "'";
    queryParam = "authorization_code";
  }

  else {
    var error = {
      "error_code" : "bad_request",
      "error_description" : "invalid query parameter"
    }
    res.send(400, error);
  }

  var options = {
    endpoint : 'consents',
    qs : {
      ql : queryString
    }
  }

  if (queryString != null
      && (req.query.consent_id != null || queryParam == "authorization_code" || queryParam == "access_token")) {
    console.log("retrieving consent against consent_id" + req.query.consent_id);
    client.request(options, function(error, response) {
      if (error || response == null || response.entities == null
          || response.entities.length == 0) {
        var error = {
          error : "bad_request",
          error_description : "invalid " + queryParam
        };
        res.send(400, error);
      } else {

        console.log("app services response for consent_id: "
            + JSON.stringify(response));

     

        var entity = {
          company_id : response.entities[0].company_id,
          client_id : response.entities[0].client_id,
          end_user_id : response.entities[0].end_user_id,
          device_type : response.entities[0].device_type,
          authorization_code : response.entities[0].authorization_code,
          application_name : response.entities[0].application_name,
          consent_id : response.entities[0].consent_id,
          access_token : response.entities[0].access_token,
          sso_token : response.entities[0].sso_token,
          scope : response.entities[0].scope,
          status : response.entities[0].status,
          consent_type : response.entities[0].consent_type,
          last_updated : response.entities[0].last_updated

        }

        console.log("consent details" + JSON.stringify(entity));
        res.send(entity);
      }
    });
  } else {

    if (req.query.cursor != null && req.query.cursor != "") {
      console.log("cursor in req: " + req.query.cursor);
      options.qs['cursor'] = req.query.cursor;

    }

    client.request(options, function(error, response) {
      if (error || response == null || response.entities == null
          || response.entities.length == 0) {

        console.log("app services response for " + queryString
            + JSON.stringify(response));
        console.log("Error in retrieving consents for " + queryString);
        var error = {
          "error_code" : "bad_request",
          "error_description" : "invalid " + queryParam
        }
        res.send(400, error);
      } else {

        console.log("app services response for " + queryString
            + JSON.stringify(response));

        for ( var i in response.entities) {

          if (response.entities[i] != null) {
            
            var scope= response.entities[i].scope;
            if (scope != null && scope != "") {
              try {

                scope = JSON.parse(scope);
              } catch (e) {
              }
            }

            var entity = {
              company_id : response.entities[i].company_id,
              client_id : response.entities[i].client_id,
              end_user_id : response.entities[i].end_user_id,
              device_type : response.entities[i].device_type,
              authorization_code : response.entities[i].authorization_code,
              application_name : response.entities[i].application_name,
              consent_id : response.entities[i].consent_id,
              access_token : response.entities[i].access_token,
              sso_token : response.entities[i].sso_token,
              scope : scope,
              status : response.entities[i].status,
              consent_type : response.entities[i].consent_type,
              last_updated : response.entities[i].last_updated
            }

            entities.push(entity);
          }
        }

        responseJson = {
          cursor : response.cursor || "",
          consents : entities

        }

        console.log("consents for " + queryString + " " + responseJson);
        res.send(responseJson);

      }
    });

  }

};

exports.createSSO = function(req, res) {

  var site_id = req.body.site_id;
  var access_token = req.body.access_token;
  var sso_token = createGuid();

  var options = {
    endpoint : 'consents',
    qs : {
      ql : "access_token = '" + access_token + "'"
    }
  }

  client.request(options, function(error, response) {
    if (error || response == null || response.entities == null
        || response.entities.length == 0) {
      var error = {
        error : "bad_request",
        error_description : "invalid access_token"
      };
      res.send(400, error);
    } else {
      console.log("consent_id" + response.entities[0].consent_id);
      var ssoData = {
        type : 'ssos',
        uuid : sso_token,
        name : sso_token,
        token : sso_token,
        site_id : site_id,
        consent_id : response.entities[0].consent_id,
        status : "active",
        last_updated : getCurrenTime()
      }

      client.createEntity(ssoData, function(err, ssoResponse) {
        if (err) {
          var error = {
            "error_code" : "server_error",
            "error_description" : "sso couldn't be created"
          }
          res.send(500, error);
        } else {
          var sso = {
            site_id : site_id,
            token : sso_token
          };

          var ssoArray = [];
          var isoverwritten = false;
          if (response.entities[0].sso_token != null) {

            for ( var i in response.entities[0].sso_token) {
              if (response.entities[0].sso_token[i].site_id == site_id) {
                response.entities[0].sso_token[i].token = sso_token;
                isoverwritten = true;
              }

            }
            ssoArray = response.entities[0].sso_token;

            if (isoverwritten == false) {
              ssoArray.push(sso);
            }

          } else {
            ssoArray.push(sso);
          }
          var consent = {
            method : 'PUT',
            endpoint : 'consents/' + response.entities[0].consent_id,
            body : {
              sso_token : ssoArray,
            }
          }

          client.request(consent, function(err, data) {
            if (err) {
              var error = {
                "error_code" : "server_error",
                "error_description" : "sso_token couldn't be updated"
              }
              res.send(500, error);
            } else {

              resposneJson = {
                sso_token : sso_token,
                site_id : site_id,
                company_id : response.entities[0].company_id,
                client_id : response.entities[0].client_id,
                end_user_id : response.entities[0].end_user_id,
                device_type : response.entities[0].device_type,
                authorization_code : response.entities[0].authorization_code,
                application_name : response.entities[0].application_name,
                consent_id : response.entities[0].consent_id,
                access_token : response.entities[0].access_token,
                scope : response.entities[0].scope,
                status : "active",
                consent_type : response.entities[0].consent_type,
                last_updated : response.entities[0].last_updated
              }

              res.send(resposneJson);

            }
          });

        }
      });

    }
  });
};

exports.validateConsent = function(req, res) {

  console.log("in get consent flow");
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  res.header('Content-Type', 'application/json');

  console.log('in the flow to get consent');
  // intercept OPTIONS method
  if ('OPTIONS' == req.method) {
    res.send(200);
  }

  var queryString = "";

  queryString = "end_user_id = '" + req.query.user_id + "' and client_id = '"
      + req.query.client_id + "'";

  var options = {
    endpoint : 'consents',
    qs : {
      ql : queryString
    }
  }

  client.request(options, function(error, response) {
    if (error || response == null || response.entities == null
        || response.entities.length == 0) {
      var error = {
        error : "bad_request",
        error_description : "invalid client_id or user_id"
      };
      res.send(400, error);
    } else {

      console.log("app services response for consent_id: "
          + JSON.stringify(response));

      var entity = {
        company_id : response.entities[0].company_id,
        client_id : response.entities[0].client_id,
        end_user_id : response.entities[0].end_user_id,
        device_type : response.entities[0].device_type,
        authorization_code : response.entities[0].authorization_code,
        application_name : response.entities[0].application_name,
        consent_id : response.entities[0].consent_id,
        access_token : response.entities[0].access_token,
        sso_token : response.entities[0].sso_token,
        scope : response.entities[0].scope,
        status : response.entities[0].status,
        consent_type : response.entities[0].consent_type,
        last_updated : response.entities[0].last_updated

      }

      console.log("consent details" + JSON.stringify(entity));
      res.send(entity);
    }
  });

}
