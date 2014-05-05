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

# Token Validation

## Create Token
> Request:

```shell
curl
  "http://api.example.com/v1/token/{type}/{identifier}"
  --verbose
  --request POST
  --header  "apikey: {client_id}"
  --header  "content-type: application/json"
  --data    "{"type":"alphanumeric / numeric etc","length":6,"text":"One time PIN: {token} has been generated for your request# 12346","expiry":300}"
```

> Response:

```http
HTTP/1.1 200 OK
```

This endpoint creates a Token, and sends it to the given identifier.

### HTTP Request

`POST http://api.example.com/v1/token/{type}/{identifier}`

### Path Parameters

Parameter | Required | Values | Description
--------- | -------- | ------ | -----------
type | true | sms, email | type of service
identifier | true | +919xxxx, xxx@gmail.com | identifier using the service

### Body
Parameter | Values | Description
--------- | ------ | -----------
type | alphanumeric, numeric | type of the token to be generated
length | 7 | generated token's length
text | One time PIN: {token} | sample text, with placeholder for token
expiry | 300 | in seconds

<aside class="success">
Body is of JSON type. Please look at the curl request, to learn more.
</aside>


<aside class="success">
Upon successful, Developer gets a 200 OK
</aside>

<aside class="warning">
Upon failure, Developer gets a 400 Bad Request
</aside>

## Validate Token
> Request:

```shell
curl
  "http://api.example.com/v1/token/{type}/{identifier}/{token}"
  --verbose
  --request GET
  --header  "apikey: {client_id}"
```

> Response:

```http
HTTP/1.1 200 OK
```

This endpoint validates a Token, with its identifier.

### HTTP Request

`GET http://api.example.com/v1/token/{type}/{identifier}/{token}`

### Path Parameters

Parameter | Required | Values | Description
--------- | -------- | ------ | -----------
type | true | sms, email | type of service
identifier | true | +919xxxx, xxx@gmail.com | identifier using the service
token | true | xd4f67^ | user submitted token, that he/she has received

<aside class="success">
If Token is valid for the given identifier, Developer gets a 200 OK
</aside>

<aside class="warning">
If Token is not valid for the given identifier, Developer gets a 400 Bad Request
</aside>

## Response Codes

The Token API uses the following status codes:

Status Code | Meaning
----------- | -------
200 | OK -- You are cool, dude !!
400 | Bad Request -- Your request sucks, go home man !!##@@

