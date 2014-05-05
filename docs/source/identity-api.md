title: Apigee Identity Support for OpenID Connect. 

language_tabs:



toc_footers:
 - <a href='http://apigee.com'> © 2012-2014 by Apigee Corporation</a>.
 - Powered by opensource tool <a href='http://github.com/tripit/slate'> Slate</a>.
---

# Overview

## Phase-I scope:
Phase-1 scope will focus on supporting a simple subset of the Core functionality for a web-based Relying Party using the OAuth code flow only. Here is a summary:
1. Support OpenID Connect core (with partial list of attributes etc.)
2. Support Authorisation Code Flow
3. Also support the OpConnect OpenID Connect Profile proposed by GSMA.

## Future Phases (Phase-II and beyond):
Support the OpenID Connect Core functionality for an implicit and hybrid flow. 
Support dynamic client registration. 

# List of parameters supported for OpenID Connect Core

## Authentication Request

Elements / Parameters | Description | Apigee support 
----------------------|------------------|------------------
request verb        | The HTTP method used in the request  | GET and POST both are spported
response_type | Mandatory | In phase-I one only 'code' is supported. In future we would support all the different flow types as described in the [spec](http://openid.net/specs/openid-connect-core-1_0.html#Authentication)
client_id | Mandatory | Yes.
scope | Mandatory | Space delimited and case-sensitive list of ASCII strings for scopes. Must contain 'openid'. Should support as per [spec](http://openid.net/specs/openid-connect-core-1_0.html#ScopeClaims). If unknown scope values are passed those will be ignored. No error will be returned for unknown scope values. However, if 'openid' is not supplied as the first scope value error must be returned.
redirect_uri | Mandatory | Apigee also validates this against the original redirect URI registered by the developer for that application.
state | Optional | In the OpConnect profile this was made mandatory. But Apigee implementation supports this parameter is optional. So Apigee implementation does not return an error when 'state' is not present. Generally state is used to maintain state between request and callback. 
nonce | Optional | In the OpConnect profile this was made mandatory. But Apigee implementation supports this parameter is optional.
display | Optional | supported values are <br/> page: Default value, if the display parameter is not added. The UI SHOULD be consistent with a full page view of the User-Agent. <br/> popup: Login window would be a pop-up 450px X 500px. <br/> touch: UI should be smartphone savvy. <br/>wap: The UI SHOULD be consistent with a “feature-phone” device display, i.e. XHTML with no JavaScrip.
prompt | Optional | Apigee implementation in phase-I ignores this parameter completely. 
max_age | Optional | Apigee implementation in phase-I ignores this parameter completely. **We still need to make sure that we capture the last successful authentication by an user for an application. This would be for future phases.**
ui_locales & claims_locales | Optional | only en is supported in phase-I
id_token_hint | Optional | N/A in phase - I
login_hint | Optional | An indication to the IDP/Authorisation Server on what ID to use for login, e.g. emailid, MSISDN (phone_number) etc. Only values supported by Apigee in phase-I is emailid & MSISDN. 
acr_values | Stands for Authentication Context class Reference. Optional | In the OpConnect profile this was made mandatory. But Apigee implementation does not support this parameter in Phase-I. If passed it would be ignored. 

## Note on scope Parameter 


Value |  Description | Apigee Support
------|----------------------|---------------------------
openid | Mandatory | Supported. 
profile | Optional | Supported by Apigee implementation. This includes the following attributes -> name, family_name, given_name, middle_name, nickname, preferred_username, profile, picture, website, gender, birthdate, zoneinfo, locale, and updated_at. 
email | Optional | Supported.
address | Optional | Supported.
phone | Optional |  Supported.
offline_access | Optional | Not supported by Apigee implementation in phase-I. 



## Authentication Response
Support 'code' and 'state'(if present in the original request.)

## Token Request 
Same as spec. No change.

POST /token HTTP/1.1
  Host: server.example.com
  Authorization: Basic czZCaGRSa3F0MzpnWDFmQmF0M2JW
  Content-Type: application/x-www-form-urlencoded

  grant_type=authorization_code&code=SplxlOBeZQQYbYS6WxSbIA
    &redirect_uri=https%3A%2F%2Fclient%2Eexample%2Ecom%2Fcb

## Token Response
Elements / Parameters | Description | Apigee support 
----------------------|------------------|------------------
access_token        | Mandatory  | Yes.
token_type       | Mandatory  | 'Bearer'
id_token        | Mandatory  | Yes.
expires_in        | Optional  | Always returned in Apigee implementation.
refresh_token        | Mandatory  | Returned for 'code' flows. 

## SSO Token
SSO service provided by Apigee is completely decoupled from the Identity (OpenID Connect based) or Consent API. Instead of providing an SSO token as the response to the token call, we did want to provide the choice to the application to request for an SSO token, in addition to ID token and access token. This way it would not interfare with the Open ID specifications. Developers would be able to use standard client libraries. Please refer to the Consent Management APIs docs for the details of the SSO token. 

## ID Token

Elements / Parameters | Description | Apigee support 
----------------------|------------------|------------------
iss        | Mandatory  | Yes. e.g., https://id.aloha.com
sub | Mandatory | Unique User ID. For each Developer a masked User ID is returned. The backend CRM ID of the user is not directly returned. 
aud | Mandatory | client_id of the application is returned.
exp | Mandatory | expiry time in epoch seconds. 
iat | Mandatory | issued at time in epoch seconds. 
auth_time | Mandatory if max_age was used in request | Not supported in Apigee implementation in Phase - I
nonce | Mandatory if nonce was used in the request | Supported. 
at_hash | Optional | Not supported in Apigee implementaion in phase-I. It is a hash of the access token. 
acr | Optional | Not supported in Apigee implementaion in phase-I. 
amr | Optional | Not supported in Apigee implementaion in phase-I.
azp | Optional (unless audience is different from authorized party) | Not supported in Apigee implementaion in phase-I.  Represented as the client_id of the Authorised Party. 

## User Info

Elements / Parameters | Description | Apigee support 
----------------------|------------------|------------------
sub | Mandatory | Unique User ID. For each Developer a masked User ID is 
name | Mandatory | String. User’s full name, in a form that it can be displayed.
given_name | Optional | Supported
family_name | Optional | Supported
middle_name | Optional | Supported
nickname | Optional | Supported
preferred_username | Optional | Supported
profile | Optional | Supported
website | Optional | Supported
email | Mandatory | Supported
email_verified | Mandatory | Feature is not supported in phase-I. 'FALSE' will be returned in all cases.   
gender | Optional | Supported
birthdate | Optional | Supported. ISO 8601:2004 YYYY-MM-DD format. YYYY = 0000 users not providing the year of birth. 
zoneinfo | Optional | Supported. User's timezone as per TimeZone [database](http://www.twinsun.com/tz/tz-link.htm)
phone_number | Mandatory | Supported
phone_number_verfied | Mandatory | Supported
address | Optional | Not supported in Apigee solution.
updated_at | Mandatory | Supported. Epoch seconds.