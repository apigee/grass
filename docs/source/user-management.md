---
title: Token Validation

language_tabs:
  - shell

toc_footers:
 - <a href='http://github.com/tripit/slate' target="_blank">Documentation Powered by Slate</a>
---

# Introduction

This document covers the Token Validation

This example API documentation page was created with [Slate](http://github.com/tripit/slate).

# User Management
This API is supposed to proxy the Usergrid API, and provide a SPI reference for
the other adapters. This will be invoked by the Identity API, and is a internal
facing API.

## Authorization
User Management API is an internal facing one, and thus requires only apikey
validation.

## Create User
> Request:

```shell
curl
  "http://api.example.com/v1/users"
  --verbose
  --request POST
  --header  "apikey: {client_id}"
  --header  "content-type: application/json"
  --data    "{
    "personal-info": {
        "name": {
            "surname": "Shell",
            "given": "Ron",
            "title": "Mr",
            "complete": "Mr. Ron Shell"
        },
        "dob": "12-12-1980",
        "gender": "male",
        "image": "http://gravatar.com/avatar/d43903a7f1db7f4246ecdd6hj6ed54gh",
        "secrets": {
            "what is your dob": "54431df57f827c3d38b49dd2bf9a29fa",
            "what is your birthplace": "11d0c7bdbc6cade41f2b2fcb36ac6b90"
        }
    },
    "external-info": {
        "id": "rshell",
        "crmid": 1238347384728723700,
        "dept": "something"
    },
    "email": {
        "0": "xyz@some.com",
        "1": "abc@another.com"
    },
    "phone": {
        "0": "+561234567890",
        "1": "+561234567891",
        "2": "+561234567892"
    },
    "address": {
        "house": "number something",
        "street": "something",
        "locality": "another",
        "city": "some",
        "state": "some",
        "country": "another",
        "postalcode": "4FCDG78",
        "landmark": "near some market"
    },
    "social": {
        "twitter": "handle",
        "google": "plusprofile",
        "facebook": "faceid",
        "live": "windowsliveid"
    },
    "status": "active",
    "groups": [
        "somegroup1",
        "somegroup2",
        "somegroup3"
    ]
}"
```

> Response:

```http
HTTP/1.1 201 Created
Content-Type: application/json

{
    "id": "b1615ce7-0f73-464d-bb15-45f701015aa0",
    "metadata": {
        "type": "user",
        "created": 1394800072652,
        "modified": 1394800072652,
        "uri": "https://api.example.com/v1/users/b1615ce7-0f73-464d-bb15-45f701015aa0"
    },
    "personal-info": {
        "name": {
            "surname": "Shell",
            "given": "Ron",
            "title": "Mr",
            "complete": "Mr. Ron Shell"
        },
        "dob": "12-12-1980",
        "gender": "male",
        "image": "http://gravatar.com/image/id/1238347384728723839",
        "secrets": {
            "what is your dob": "54431df57f827c3d38b49dd2bf9a29fa",
            "what is your birthplace": "11d0c7bdbc6cade41f2b2fcb36ac6b90"
        }
    },
    "external-info": {
        "id": "rshell",
        "crmid": 1238347384728723700,
        "dept": "something",
        "custom": {
            "salaryindex": "150K"
        }
    },
    "username": "rshell",
    "email": {
        "0": "xyz@some.com",
        "1": "abc@another.com"
    },
    "phone": {
        "0": "+561234567890",
        "1": "+561234567891",
        "2": "+561234567892"
    },
    "address": {
        "house": "number something",
        "street": "something",
        "locality": "another",
        "city": "some",
        "state": "some",
        "country": "another",
        "postalcode": "4FCDG78",
        "landmark": "near some market"
    },
    "social": {
        "twitter": "handle",
        "google": "plusprofile",
        "facebook": "faceid",
        "live": "windowsliveid",
        "skype": "skypeid",
        "linkedin": "profileid",
        "personaluri": "bloguri"
    },
    "status": "active",
    "groups": [
        "somegroup1",
        "somegroup2",
        "somegroup3"
    ]
}
```

###Purpose
CREATE a User entity

### HTTP Request

`POST http://api.example.com/v1/users`


### Body
Body is self-explanatory. Please look at the curl request, to learn more


<aside class="success">
Upon successful, Developer gets a 201 Created
</aside>

<aside class="warning">
Upon failure, Developer gets a 400 Bad Request
</aside>

## Get User
> Request:

```shell
curl
  "http://api.example.com/v1/users/{userid/email/username}"
  --verbose
  --request GET
  --header  "apikey: {client_id}"
```

> Response:

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
    "id": "b1615ce7-0f73-464d-bb15-45f701015aa0",
    "metadata": {
        "type": "user",
        "created": 1394800072652,
        "modified": 1394800072652,
        "uri": "https://api.example.com/v1/users/b1615ce7-0f73-464d-bb15-45f701015aa0"
    },
    "personal-info": {
        "name": {
            "surname": "Shell",
            "given": "Ron",
            "title": "Mr",
            "complete": "Mr. Ron Shell"
        },
        "dob": "12-12-1980",
        "gender": "male",
        "image": "http://gravatar.com/image/id/1238347384728723839",
        "secrets": {
            "what is your dob": "54431df57f827c3d38b49dd2bf9a29fa",
            "what is your birthplace": "11d0c7bdbc6cade41f2b2fcb36ac6b90"
        }
    },
    "external-info": {
        "id": "rshell",
        "crmid": 1238347384728723700,
        "dept": "something",
        "custom": {
            "salaryindex": "150K"
        }
    },
    "username": "rshell",
    "email": {
        "0": "xyz@some.com",
        "1": "abc@another.com"
    },
    "phone": {
        "0": "+561234567890",
        "1": "+561234567891",
        "2": "+561234567892"
    },
    "address": {
        "house": "number something",
        "street": "something",
        "locality": "another",
        "city": "some",
        "state": "some",
        "country": "another",
        "postalcode": "4FCDG78",
        "landmark": "near some market"
    },
    "social": {
        "twitter": "handle",
        "google": "plusprofile",
        "facebook": "faceid",
        "live": "windowsliveid",
        "skype": "skypeid",
        "linkedin": "profileid",
        "personaluri": "bloguri"
    },
    "status": "active",
    "groups": [
        "somegroup1",
        "somegroup2",
        "somegroup3"
    ]
}
```

###Purpose
GET a User entity

### HTTP Request

`GET http://api.example.com/v1/users/{userid/email/username}`


<aside class="success">
Upon successful, Developer gets a 200 OK
</aside>

<aside class="warning">
Upon failure, Developer gets a 400 Bad Request
</aside>

## Update User
> Request:

```shell
curl
  "http://api.example.com/v1/users/{userid/email/username}"
  --verbose
  --request PUT
  --header  "apikey: {client_id}"
  --header  "content-type: application/json"
  --data    "{
    "personal-info": {
        "name": {
            "surname": "Shell",
            "given": "Ron",
            "title": "Mr",
            "complete": "Mr. Ron Shell"
        },
        "dob": "12-12-1980",
        "gender": "male",
        "image": "http://gravatar.com/avatar/d43903a7f1db7f4246ecdd6hj6ed54gh",
        "secrets": {
            "what is your dob": "54431df57f827c3d38b49dd2bf9a29fa",
            "what is your birthplace": "11d0c7bdbc6cade41f2b2fcb36ac6b90"
        }
    },
    "external-info": {
        "id": "rshell",
        "crmid": 1238347384728723700,
        "dept": "something"
    },
    "email": {
        "0": "xyz@some.com",
        "1": "abc@another.com"
    },
    "phone": {
        "0": "+561234567890",
        "1": "+561234567891",
        "2": "+561234567892"
    },
    "address": {
        "house": "number something",
        "street": "something",
        "locality": "another",
        "city": "some",
        "state": "some",
        "country": "another",
        "postalcode": "4FCDG78",
        "landmark": "near some market"
    },
    "social": {
        "twitter": "handle",
        "google": "plusprofile",
        "facebook": "faceid",
        "live": "windowsliveid"
    },
    "status": "active",
    "groups": [
        "somegroup1",
        "somegroup2",
        "somegroup3"
    ]
}"
```

> Response:

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
    "id": "b1615ce7-0f73-464d-bb15-45f701015aa0",
    "metadata": {
        "type": "user",
        "created": 1394800072652,
        "modified": 1394800072652,
        "uri": "https://api.example.com/v1/users/b1615ce7-0f73-464d-bb15-45f701015aa0"
    },
    "personal-info": {
        "name": {
            "surname": "Shell",
            "given": "Ron",
            "title": "Mr",
            "complete": "Mr. Ron Shell"
        },
        "dob": "12-12-1980",
        "gender": "male",
        "image": "http://gravatar.com/image/id/1238347384728723839",
        "secrets": {
            "what is your dob": "54431df57f827c3d38b49dd2bf9a29fa",
            "what is your birthplace": "11d0c7bdbc6cade41f2b2fcb36ac6b90"
        }
    },
    "external-info": {
        "id": "rshell",
        "crmid": 1238347384728723700,
        "dept": "something",
        "custom": {
            "salaryindex": "150K"
        }
    },
    "username": "rshell",
    "email": {
        "0": "xyz@some.com",
        "1": "abc@another.com"
    },
    "phone": {
        "0": "+561234567890",
        "1": "+561234567891",
        "2": "+561234567892"
    },
    "address": {
        "house": "number something",
        "street": "something",
        "locality": "another",
        "city": "some",
        "state": "some",
        "country": "another",
        "postalcode": "4FCDG78",
        "landmark": "near some market"
    },
    "social": {
        "twitter": "handle",
        "google": "plusprofile",
        "facebook": "faceid",
        "live": "windowsliveid",
        "skype": "skypeid",
        "linkedin": "profileid",
        "personaluri": "bloguri"
    },
    "status": "active",
    "groups": [
        "somegroup1",
        "somegroup2",
        "somegroup3"
    ]
}
```

###Purpose
UPDATE a User entity

### HTTP Request

`PUT http://api.example.com/v1/users/{userid/email/username}`


### Body
Body is self-explanatory. Please look at the curl request, to learn more


<aside class="success">
Upon successful, Developer gets a 200 OK
</aside>

<aside class="warning">
Upon failure, Developer gets a 400 Bad Request
</aside>

## Delete User
> Request:

```shell
curl
  "http://api.example.com/v1/users/{userid/email/username}"
  --verbose
  --request DELETE
  --header  "apikey: {client_id}"
```

> Response:

```http
HTTP/1.1 200 OK
```

###Purpose
DELETE a User entity

### HTTP Request

`DELETE http://api.example.com/v1/users/{userid/email/username}`


<aside class="success">
Upon successful, Developer gets a 200 OK
</aside>

<aside class="warning">
Upon failure, Developer gets a 400 Bad Request
</aside>