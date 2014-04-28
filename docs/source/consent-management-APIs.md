
#Consent Management APIs for Apigee Identity Solution

\

##Consent Management APIs expose a uniform REST based interface for 

\

-   Creating and storing user consents
-   Query consent details by user, by application and by developers
-   Updating consent 
-   Revoke / Invalidate a consent

\

Primary consumer of these APIs are 

-   “Resource Server” Admins (API Team)
-   Consent Management UI for End-user Self-Service
-   Consent  capture protocol implementation like OAUTH 
-   Third-party developers (in future)

\

**Design principles**

\

-   Consent Management API abstracts the Apigee's standard access token
    functionality and Apigee App Services APIs. It provides protocol
    independent way to manage the consent.
-   Wherever possible these APIs follows standards such as OAUTH 2.0 or
    User Management Access (UMA) Protocol.

##API Version

Version of this API specifications is 1.0

This documentation is published on March 18, 2014. 

Authentication and Authorization

Following are the consumers of this API

-   **First****-****Party/End User Self Service UI**: UI component
    access the Consent Management API using HTTP Basic Authentication
    model. First-party Applications are considered to be within the same
    system domain hence more secure protocols like Oauth are not
    required. First-party Application are configured to access all
    consent  queries unrestricted, i.e., for all Application, all Users
    and all Devices. 
-   **Third****-****Party Application**: In future the Consent
    Management APIs would also be exposed to external Developers to
    query consent details at their own Application level or Developer
    level.  Developers will use Oauth v2 client credentials mechanism to
    authenticate with this service. But any given Application typically
    will have access to Consent queries only by the specific
    Application.

\

##Standard Error Responses 

Broadly following the REST principles and HTTP conventions the following
error codes are used by the Consent API:

\

+--------------------------+--------------------------+--------------------------+
| **HTTP Error Code**      | **Error Response         | **Explanation**          |
|                          | Payload**                |                          |
+--------------------------+--------------------------+--------------------------+
| **400**                  | {                        | Bad Request – The        |
|                          |                          | request contains         |
|                          |     "error\_code" :      | incorrect structure or   |
|                          | "BAD\_REQUEST",          | parameters               |
|                          |                          |                          |
|                          |     "error\_description" |                          |
|                          | : "Content-Type Header   |                          |
|                          | required"                |                          |
|                          |                          |                          |
|                          | }                        |                          |
+--------------------------+--------------------------+--------------------------+
| **401**                  | {                        | Unauthorized –           |
|                          |                          | Authorization header is  |
|                          |     "error\_code" :      | missing or incorrect.    |
|                          | "AUTHENTICATION\_FAILED" |                          |
|                          | ,                        |                          |
|                          |                          |                          |
|                          |     "error\_description" |                          |
|                          | : "Authorization header  |                          |
|                          | missing"                 |                          |
|                          |                          |                          |
|                          | }                        |                          |
+--------------------------+--------------------------+--------------------------+
| **403**                  | {                        | Forbidden – Access to    |
|                          |                          | the requested resource   |
|                          |     "error\_code" :      | is not allowed           |
|                          | "ACCESS\_DENIED",        |                          |
|                          |                          |                          |
|                          |     "error\_description" |                          |
|                          | : "Your credentials do   |                          |
|                          | not have access to the   |                          |
|                          | requested Developer      |                          |
|                          | resource "               |                          |
|                          |                          |                          |
|                          | }                        |                          |
+--------------------------+--------------------------+--------------------------+
| **404**                  | {                        | Not Found – The          |
|                          |                          | specified resource could |
|                          |     "error\_code" :      | not be found             |
|                          | "UNKNOWN\_DEVELOPER",    |                          |
|                          |                          |                          |
|                          |     "error\_description" |                          |
|                          | : "Requested Consent ID  |                          |
|                          | is not found"            |                          |
|                          |                          |                          |
|                          | }                        |                          |
+--------------------------+--------------------------+--------------------------+
| **405**                  | {                        | Method Not Allowed –     |
|                          |                          | Specified HTTP method is |
|                          |     "error\_code" :      | not allowed on the       |
|                          | "METHOD\_NOT\_ALLOWED",  | requested resource       |
|                          |                          |                          |
|                          |     "error\_description" |                          |
|                          | : "Use only GET and      |                          |
|                          | POST"                    |                          |
|                          |                          |                          |
|                          | }                        |                          |
+--------------------------+--------------------------+--------------------------+
| **409**                  | {                        | Conflict – The resource  |
|                          |                          | already exists (while    |
|                          |     "error\_code" :      | creating)                |
|                          | "CAN\_NOT\_CREATE\_COOKI |                          |
|                          | E",                      |                          |
|                          |                          |                          |
|                          |     "error\_description" |                          |
|                          | : "Resource already      |                          |
|                          | exists"                  |                          |
|                          |                          |                          |
|                          | }                        |                          |
+--------------------------+--------------------------+--------------------------+
| **500**                  | {                        | Internal Server Error –  |
|                          |                          | Server side error.       |
|                          |     "error\_code" :      | Please try again later.  |
|                          | "UNKNOWN\_ERROR",        |                          |
|                          |                          |                          |
|                          |     "error\_description" |                          |
|                          | : "Please contact        |                          |
|                          | service administrator if |                          |
|                          | this error persists."    |                          |
|                          |                          |                          |
|                          | }                        |                          |
+--------------------------+--------------------------+--------------------------+
| **503**                  | {                        | Service Unavailable –    |
|                          |                          | One or more required     |
|                          |     "error\_code" :      | server side services are |
|                          | "SERVICE TEMPORARILY     | not available. Please    |
|                          | UNAVAILABLE",            | try again later.         |
|                          |                          |                          |
|                          |     "error\_description" |                          |
|                          | : "Please try later"     |                          |
|                          |                          |                          |
|                          | }                        |                          |
+--------------------------+--------------------------+--------------------------+

\

\

\

\

\
 ##Conceptual Entity Model

\

\

The diagram above depicts the high-level entity model that is underlying
the Consent Management APIs.  The resource structure of a REST API
follows the entity model as closely as possible. Hence it is important
to declare the Entity Model reference for a consistent API design.

\

**Note**:

-   Developer, Apps & OAuth entities and corresponding APIs are exposed
    by Apigee Edge API Services component. This is existing platform
    feature. 
-   Entities to persist User Consent and SSO Token will be created in
    Apigee App Services Platform. 
-   User & Device will be reference tables only. For the simple reason
    that the user profile information will be coming from a different
    system of records. 
-   Consent Management API will aggregate and transform Apigee Platform
    APIs and Apigee App Services APIs to expose a Consent API that is
    consistent with the Entity Model.

\

\

\

\

Creating and storing user consent for each third-party application

This will be an internal API that will be used by the OpenID flow to
internally generate Consent records based on User Authorization events
(i.e., Code Generation step)

\

\

+--------------------------+--------------------------+--------------------------+
| Verb                     | POST                     | Remarks                  |
+--------------------------+--------------------------+--------------------------+
| Path                     | /consents                | \                        |
+--------------------------+--------------------------+--------------------------+
| Query Params             | NA                       | \                        |
+--------------------------+--------------------------+--------------------------+
| Headers                  | Authorization: Basic     | \                        |
|                          | {creds}                  |                          |
|                          |                          |                          |
|                          | Content-Type:            |                          |
|                          | application/json         |                          |
+--------------------------+--------------------------+--------------------------+
| Body                     | {                        | One of the fields        |
|                          |                          | between                  |
|                          |   "authorization\_code": | authorization\_code and  |
|                          | "bf84011e3",             | access\_token must be    |
|                          |                          | present while creating.  |
|                          |   "company\_id":         |                          |
|                          | "dev1@devorg.com",       |                          |
|                          |                          | \                        |
|                          |   "client\_id":          |                          |
|                          | "x11e3097caa5ea5e2",     | Always only the latest   |
|                          |                          | and active access token  |
|                          |   "end\_user\_id":       | is referenced from the   |
|                          | "123456-ahdci-CRM",      | consent. Old and         |
|                          |                          | inactive tokens are      |
|                          |   "device\_type":        | not.  Refresh token is   |
|                          | "User-Agent xyz-model",  | also not stored against  |
|                          |                          | the consent.             |
|                          |   "access\_token":       |                          |
|                          | "eab07f10f0a01e800118bba | \                        |
|                          | 0",                      |                          |
|                          |                          | Reference to active      |
|                          |   "scope": ["openid",    | access token is required |
|                          | "profile" ],             | because when a consent   |
|                          |                          | is revoked,              |
|                          |   "status" : "active",   | corresponding active     |
|                          |                          | access tokens and        |
|                          |   "consent\_type" :      | refresh tokens should be |
|                          | "in-band"                | removed or deactivated.  |
|                          |                          |                          |
|                          |   }                      | \                        |
|                          |                          |                          |
|                          | \                        | \                        |
|                          |                          |                          |
|                          |                          | If consent\_type doesn’t |
|                          |                          | come in request then by  |
|                          |                          | default it will be       |
|                          |                          | “in-band”                |
|                          |                          |                          |
|                          |                          | \                        |
|                          |                          |                          |
|                          |                          | \                        |
|                          |                          |                          |
|                          |                          | \                        |
|                          |                          |                          |
|                          |                          | mandatory params:        |
|                          |                          |                          |
|                          |                          | company\_id              |
|                          |                          |                          |
|                          |                          | client\_id               |
|                          |                          |                          |
|                          |                          | end\_user\_id            |
|                          |                          |                          |
|                          |                          | status                   |
|                          |                          |                          |
|                          |                          | \                        |
+--------------------------+--------------------------+--------------------------+
| Response                 | {                        | The consent id should be |
|                          |                          | stored as a custom       |
|                          |   "consent\_id":         | attribute against the    |
|                          | "sah7tvv46mkosydht",     | access token in 4G too.  |
|                          |                          |                          |
|                          |   "authorization\_code": |                          |
|                          | "bf84011e3",             | \                        |
|                          |                          |                          |
|                          |   "company\_id":         | Please note additional   |
|                          | "dev1@devorg.com",       | information is returned  |
|                          |                          | in the response.         |
|                          |   "client\_id":          |                          |
|                          | "x11e3097caa5ea5e2",     | ​1. consent\_id -\> This |
|                          |                          | is the primary key of    |
|                          |    "application\_name" : | the consent record.      |
|                          | "Special Birds",         |                          |
|                          |                          | ​2. application\_name    |
|                          |   "end\_user\_id":       | -\> In order to display  |
|                          | "123456-ahdci-CRM",      | a meaningful name for    |
|                          |                          | the application on an UI |
|                          |   "device\_type":        | application name is more |
|                          | "User-Agent xyz-model",  | appropriate than         |
|                          |                          | client\_id. So to avoid  |
|                          |   "access\_token":       | additional API calls,    |
|                          | "eab07f10f0a01e800118bba | the application name     |
|                          | 0",                      | attribute is returned.   |
|                          |                          |                          |
|                          |   "scope": ["openid",    | ​3. SSO token - \> at    |
|                          | "email" ] ,              | the time of first time   |
|                          |                          | creating a consent any   |
|                          |   "status" : "active",   | SSO tokens may not be    |
|                          |                          | present. But A consent   |
|                          |   "consent\_type" :      | would often be           |
|                          | "in-band",               | associated with a number |
|                          |                          | of tokens. Though it is  |
|                          |   "sso\_token":[],       | not allowed in the       |
|                          |                          | create or update calls,  |
|                          |   "last\_updated":       | the returned info has    |
|                          | "1394681135"             | all the valid SSO tokens |
|                          |                          | against the consent.     |
|                          | }                        | Note: SSO Token Feature  |
|                          |                          | is completely optional   |
|                          |                          | for Consent Management.  |
|                          |                          |                          |
|                          |                          | \                        |
|                          |                          |                          |
|                          |                          | The idea is to update    |
|                          |                          | the consent details      |
|                          |                          | whenever there is a      |
|                          |                          | change in scope, access  |
|                          |                          | token or sso tokens.     |
|                          |                          |                          |
|                          |                          | \                        |
|                          |                          |                          |
|                          |                          | For changes in the SSO   |
|                          |                          | token - SSO token APIs   |
|                          |                          | would need to be used.   |
|                          |                          |                          |
|                          |                          | \                        |
|                          |                          |                          |
|                          |                          | Once created most of the |
|                          |                          | fields can not be        |
|                          |                          | updated except status,   |
|                          |                          | access\_token,           |
|                          |                          | refresh\_token and scope |
|                          |                          | can be updated.          |
+--------------------------+--------------------------+--------------------------+

\

\

Get Consent Details by Consent ID

This is likely to be used by Administrators or Operations for debugging
purpose. 

\

+--------------------------+--------------------------+--------------------------+
| Verb                     | GET                      | Remarks                  |
+--------------------------+--------------------------+--------------------------+
| Path                     | /consents/{consent\_id}  | \                        |
+--------------------------+--------------------------+--------------------------+
| Query Params             | NA                       | \                        |
+--------------------------+--------------------------+--------------------------+
| Headers                  | Authorization: Basic     | \                        |
|                          | {creds}                  |                          |
|                          |                          |                          |
|                          | Accept: application/json |                          |
+--------------------------+--------------------------+--------------------------+
| Body                     | NA                       | \                        |
+--------------------------+--------------------------+--------------------------+
| Response                 | {                        | \                        |
|                          |                          |                          |
|                          |   "consent\_id":         |                          |
|                          | "sah7tvv46mkosydht",     |                          |
|                          |                          |                          |
|                          |   "authorization\_code": |                          |
|                          | "bf84011e3",             |                          |
|                          |                          |                          |
|                          |   "company\_id":         |                          |
|                          | "dev1@devorg.com",       |                          |
|                          |                          |                          |
|                          |   "client\_id":          |                          |
|                          | "x11e3097caa5ea5e2",     |                          |
|                          |                          |                          |
|                          |    "application\_name" : |                          |
|                          | "Special Birds",         |                          |
|                          |                          |                          |
|                          |   "end\_user\_id":       |                          |
|                          | "123456-ahdci-CRM",      |                          |
|                          |                          |                          |
|                          |   "device\_type":        |                          |
|                          | "User-Agent xyz-model",  |                          |
|                          |                          |                          |
|                          |   "access\_token":       |                          |
|                          | "eab07f10f0a01e800118bba |                          |
|                          | 0",                      |                          |
|                          |                          |                          |
|                          |   "scope": ["openid",    |                          |
|                          | "email" ] ,              |                          |
|                          |                          |                          |
|                          |   "status" : "active",   |                          |
|                          |                          |                          |
|                          |   "consent\_type" :      |                          |
|                          | "in-band",               |                          |
|                          |                          |                          |
|                          |   "sso\_token":[         |                          |
|                          |                          |                          |
|                          |   {                      |                          |
|                          |                          |                          |
|                          |       "site\_id":        |                          |
|                          | "abc",                   |                          |
|                          |                          |                          |
|                          |       "token":           |                          |
|                          | "0800200c9a660fee3010"   |                          |
|                          |                          |                          |
|                          |   },                     |                          |
|                          |                          |                          |
|                          |   {                      |                          |
|                          |                          |                          |
|                          |       "site\_id":        |                          |
|                          | "xyz",                   |                          |
|                          |                          |                          |
|                          |       "token":           |                          |
|                          | "8563823b8ih73941ash1"   |                          |
|                          |                          |                          |
|                          |   }                      |                          |
|                          |                          |                          |
|                          |   ]                      |                          |
|                          |                          |                          |
|                          |   "last\_updated":       |                          |
|                          | "1394681135"             |                          |
|                          |                          |                          |
|                          | }                        |                          |
+--------------------------+--------------------------+--------------------------+

\

Get Consent Details by User 

This is likely to be used by Consent Management UI or by Administrators.
 

\

+--------------------------+--------------------------+--------------------------+
| Verb                     | GET                      | Remarks                  |
+--------------------------+--------------------------+--------------------------+
| Path                     | /consents?user\_id={user | \                        |
|                          | \_id}&sort\_by={created\ |                          |
|                          | _at}&start\_at={off\_set |                          |
|                          | }                        |                          |
+--------------------------+--------------------------+--------------------------+
| Query Params             | user\_id  or             | \                        |
|                          | access\_token or         |                          |
|                          | authorization\_code      |                          |
|                          | should  to be passedpass |                          |
|                          | on the user context. One |                          |
|                          | of the three fields is   |                          |
|                          | mandatory.               |                          |
|                          |                          |                          |
|                          | \                        |                          |
|                          |                          |                          |
|                          | sort\_by optional field  |                          |
|                          | would sort the consents  |                          |
|                          | based on one of the      |                          |
|                          | following orders, by     |                          |
|                          | created time stamp, by   |                          |
|                          | developer\_id            |                          |
|                          | alphabetically.  Default |                          |
|                          | is created time stamp    |                          |
|                          | descending.              |                          |
|                          |                          |                          |
|                          | \                        |                          |
|                          |                          |                          |
|                          | start\_at is optional.   |                          |
|                          | It is provided to        |                          |
|                          | support pagination. Each |                          |
|                          | payload of consent would |                          |
|                          | contain at most 10       |                          |
|                          | records. More than 10    |                          |
|                          | records can be displayed |                          |
|                          | with pagination.         |                          |
+--------------------------+--------------------------+--------------------------+
| Headers                  | Authorization: Basic     | \                        |
|                          | {creds}                  |                          |
|                          |                          |                          |
|                          | Accept: application/json |                          |
+--------------------------+--------------------------+--------------------------+
| Body                     | NA                       | \                        |
+--------------------------+--------------------------+--------------------------+
| Response                 | {                        | In Phase-1 following     |
|                          |                          | attributes will not be   |
|                          | "totalCount" : "20",     | sent in response. But a  |
|                          |                          | different field “cursor” |
|                          | "start\_at" : "0",       | will be  sent which      |
|                          |                          | points to next page      |
|                          | "count" : "10"           |                          |
|                          |                          | \                        |
|                          | "consents": [            |                          |
|                          |                          | totalCount               |
|                          | \                        |                          |
|                          |                          | start\_at                |
|                          | {                        |                          |
|                          |                          | count                    |
|                          |   "consent\_id":         |                          |
|                          | "sah7tvv46mkosydht",     | \                        |
|                          |                          |                          |
|                          |   "authorization\_code": |                          |
|                          | "bf84011e3",             |                          |
|                          |                          |                          |
|                          |   "company\_id":         |                          |
|                          | "dev1@devorg.com",       |                          |
|                          |                          |                          |
|                          |   "client\_id":          |                          |
|                          | "x11e3097caa5ea5e2",     |                          |
|                          |                          |                          |
|                          |    "application\_name" : |                          |
|                          | "Special Birds",         |                          |
|                          |                          |                          |
|                          |   "end\_user\_id":       |                          |
|                          | "123456-ahdci-CRM",      |                          |
|                          |                          |                          |
|                          |   "device\_type":        |                          |
|                          | "User-Agent xyz-model",  |                          |
|                          |                          |                          |
|                          |   "access\_token":       |                          |
|                          | "eab07f10f0a01e800118bba |                          |
|                          | 0",                      |                          |
|                          |                          |                          |
|                          |   "scope": ["openid",    |                          |
|                          | "email" ] ,              |                          |
|                          |                          |                          |
|                          |   "status" : "active",   |                          |
|                          |                          |                          |
|                          |   "consent\_type" :      |                          |
|                          | "in-band",               |                          |
|                          |                          |                          |
|                          |   "sso\_token":[         |                          |
|                          |                          |                          |
|                          |   {                      |                          |
|                          |                          |                          |
|                          |       "site\_id":        |                          |
|                          | "abc",                   |                          |
|                          |                          |                          |
|                          |       "token":           |                          |
|                          | "0800200c9a660fee3010"   |                          |
|                          |                          |                          |
|                          |   },                     |                          |
|                          |                          |                          |
|                          |   {                      |                          |
|                          |                          |                          |
|                          |       "site\_id":        |                          |
|                          | "xyz",                   |                          |
|                          |                          |                          |
|                          |       "token":           |                          |
|                          | "8563823b8ih73941ash1"   |                          |
|                          |                          |                          |
|                          |   }                      |                          |
|                          |                          |                          |
|                          |   ]                      |                          |
|                          |                          |                          |
|                          |   "last\_updated":       |                          |
|                          | "1394681135"             |                          |
|                          |                          |                          |
|                          | }                        |                          |
|                          |                          |                          |
|                          | \                        |                          |
|                          |                          |                          |
|                          | {                        |                          |
|                          |                          |                          |
|                          |   "consent\_id":         |                          |
|                          | "sd2123vv46mkos12s",     |                          |
|                          |                          |                          |
|                          |   "authorization\_code": |                          |
|                          | "8dty3dty0",             |                          |
|                          |                          |                          |
|                          |   "company\_id":         |                          |
|                          | "dev1@devorg.com",       |                          |
|                          |                          |                          |
|                          |   "client\_id":          |                          |
|                          | "4rfg09ft874r9jc1",      |                          |
|                          |                          |                          |
|                          |    "application\_name" : |                          |
|                          | "Another Bird",          |                          |
|                          |                          |                          |
|                          |   "end\_user\_id":       |                          |
|                          | "123456-ahdci-CRM",      |                          |
|                          |                          |                          |
|                          |   "device\_type":        |                          |
|                          | "User-Agent xyz-model",  |                          |
|                          |                          |                          |
|                          |   "access\_token":       |                          |
|                          | "12sdcmbgy9ijngh41096dnj |                          |
|                          | j0",                     |                          |
|                          |                          |                          |
|                          |   "scope": ["openid",    |                          |
|                          | "email" ] ,              |                          |
|                          |                          |                          |
|                          |   "status" : "active",   |                          |
|                          |                          |                          |
|                          |   "consent\_type" :      |                          |
|                          | "in-band",               |                          |
|                          |                          |                          |
|                          |   "sso\_token":[         |                          |
|                          |                          |                          |
|                          |   {                      |                          |
|                          |                          |                          |
|                          |       "site\_id":        |                          |
|                          | "abc",                   |                          |
|                          |                          |                          |
|                          |       "token":           |                          |
|                          | "098gt60c9a660fee7yhu"   |                          |
|                          |                          |                          |
|                          |   },                     |                          |
|                          |                          |                          |
|                          |   {                      |                          |
|                          |                          |                          |
|                          |       "site\_id":        |                          |
|                          | "xyz",                   |                          |
|                          |                          |                          |
|                          |       "token":           |                          |
|                          | "fgh73823b8ih7394189ij"  |                          |
|                          |                          |                          |
|                          |   }                      |                          |
|                          |                          |                          |
|                          |   ]                      |                          |
|                          |                          |                          |
|                          |   "last\_updated":       |                          |
|                          | "1394681138"             |                          |
|                          |                          |                          |
|                          | }                        |                          |
|                          |                          |                          |
|                          | \                        |                          |
|                          |                          |                          |
|                          | …… more records          |                          |
|                          |                          |                          |
|                          | \                        |                          |
|                          |                          |                          |
|                          | ]                        |                          |
|                          |                          |                          |
|                          | \                        |                          |
|                          |                          |                          |
|                          | }                        |                          |
+--------------------------+--------------------------+--------------------------+
| \                        | \                        | \                        |
+--------------------------+--------------------------+--------------------------+

\

**Note: In phase-I Pagination is not supported. **

Get Consent Details by Company (Developer Company ID) 

This is likely to be used by Consent UI application 

\

+--------------------------+--------------------------+--------------------------+
| Verb                     | GET                      | Remarks                  |
+--------------------------+--------------------------+--------------------------+
| Path                     | /consents?comany\_id={co | \                        |
|                          | mpany\_id}&sort\_by={cre |                          |
|                          | ated\_at}&start\_at={off |                          |
|                          | \_set}                   |                          |
+--------------------------+--------------------------+--------------------------+
| Query Params             | company\_id is           | In Phase-1 following     |
|                          | mandatory                | attributes will not be   |
|                          |                          | sent in response. But a  |
|                          | \                        | different field “cursor” |
|                          |                          | will be  sent which      |
|                          | sort\_by optional field  | points to next page      |
|                          | would sort the consents  |                          |
|                          | based on one of the      | \                        |
|                          | following orders, by     |                          |
|                          | created time stamp, by   | totalCount               |
|                          | developer\_id            |                          |
|                          | alphabetically.  Default | start\_at                |
|                          | is created time stamp    |                          |
|                          | descending.              | count                    |
|                          |                          |                          |
|                          | \                        | \                        |
|                          |                          |                          |
|                          | start\_at is optional.   |                          |
|                          | It is provided to        |                          |
|                          | support pagination. Each |                          |
|                          | payload of consent would |                          |
|                          | contain at most 10       |                          |
|                          | records. More than 10    |                          |
|                          | records can be displayed |                          |
|                          | with pagination.         |                          |
+--------------------------+--------------------------+--------------------------+
| Headers                  | Authorization: Basic     | \                        |
|                          | {creds}                  |                          |
|                          |                          |                          |
|                          | Accept: application/json |                          |
+--------------------------+--------------------------+--------------------------+
| Body                     | NA                       | \                        |
+--------------------------+--------------------------+--------------------------+
| Response                 | {                        | \                        |
|                          |                          |                          |
|                          | "totalCount" : "20",     |                          |
|                          |                          |                          |
|                          | "start\_at" : "0",       |                          |
|                          |                          |                          |
|                          | "count" : "10"           |                          |
|                          |                          |                          |
|                          | "consents": [            |                          |
|                          |                          |                          |
|                          | {                        |                          |
|                          |                          |                          |
|                          |   “consent\_id”:         |                          |
|                          | “sah7tvv46mkosydht”,     |                          |
|                          |                          |                          |
|                          |   "authorization\_code": |                          |
|                          | "bf84011e3",             |                          |
|                          |                          |                          |
|                          |   "company\_id":         |                          |
|                          | "dev1@devorg.com",       |                          |
|                          |                          |                          |
|                          |   "client\_id":          |                          |
|                          | "x11e3097caa5ea5e2",     |                          |
|                          |                          |                          |
|                          |    "application\_name" : |                          |
|                          | "Special Birds",         |                          |
|                          |                          |                          |
|                          |   "end\_user\_id":       |                          |
|                          | "123456-ahdci-CRM",      |                          |
|                          |                          |                          |
|                          |   "device\_type":        |                          |
|                          | "User-Agent xyz-model",  |                          |
|                          |                          |                          |
|                          |   "access\_token":       |                          |
|                          | "eab07f10f0a01e800118bba |                          |
|                          | 0",                      |                          |
|                          |                          |                          |
|                          |   “scope”: ["openid",    |                          |
|                          | "email" ] ,              |                          |
|                          |                          |                          |
|                          |   “status” : “active”,   |                          |
|                          |                          |                          |
|                          |   "consent\_type" :      |                          |
|                          | "in-band",               |                          |
|                          |                          |                          |
|                          |   "sso\_token":[         |                          |
|                          |                          |                          |
|                          |   {                      |                          |
|                          |                          |                          |
|                          |       “site\_id”:        |                          |
|                          | “abc”,                   |                          |
|                          |                          |                          |
|                          |       "token":           |                          |
|                          | "0800200c9a660fee3010"   |                          |
|                          |                          |                          |
|                          |   },                     |                          |
|                          |                          |                          |
|                          |   {                      |                          |
|                          |                          |                          |
|                          |       “site\_id”:        |                          |
|                          | “xyz”,                   |                          |
|                          |                          |                          |
|                          |       "token":           |                          |
|                          | "8563823b8ih73941ash1"   |                          |
|                          |                          |                          |
|                          |   }                      |                          |
|                          |                          |                          |
|                          |   ]                      |                          |
|                          |                          |                          |
|                          |   "last\_updated":       |                          |
|                          | "1394681135"             |                          |
|                          |                          |                          |
|                          | }                        |                          |
|                          |                          |                          |
|                          | \                        |                          |
|                          |                          |                          |
|                          | {                        |                          |
|                          |                          |                          |
|                          |   “consent\_id”:         |                          |
|                          | “sd2123vv46mkos12s”,     |                          |
|                          |                          |                          |
|                          |   "authorization\_code": |                          |
|                          | "8dty3dty0",             |                          |
|                          |                          |                          |
|                          |   "company\_id":         |                          |
|                          | "dev1@devorg.com",       |                          |
|                          |                          |                          |
|                          |   "client\_id":          |                          |
|                          | "4rfg09ft874r9jc1",      |                          |
|                          |                          |                          |
|                          |    "application\_name" : |                          |
|                          | "Another Bird",          |                          |
|                          |                          |                          |
|                          |   "end\_user\_id":       |                          |
|                          | "123456-ahdci-CRM",      |                          |
|                          |                          |                          |
|                          |   "device\_type":        |                          |
|                          | "User-Agent xyz-model",  |                          |
|                          |                          |                          |
|                          |   "access\_token":       |                          |
|                          | "12sdcmbgy9ijngh41096dnj |                          |
|                          | j0",                     |                          |
|                          |                          |                          |
|                          |   “scope”: ["openid",    |                          |
|                          | "email" ] ,              |                          |
|                          |                          |                          |
|                          |   “status” : “active”,   |                          |
|                          |                          |                          |
|                          |   "consent\_type" :      |                          |
|                          | "in-band",               |                          |
|                          |                          |                          |
|                          |   "sso\_token":[         |                          |
|                          |                          |                          |
|                          |   {                      |                          |
|                          |                          |                          |
|                          |       “site\_id”:        |                          |
|                          | “abc”,                   |                          |
|                          |                          |                          |
|                          |       "token":           |                          |
|                          | "098gt60c9a660fee7yhu"   |                          |
|                          |                          |                          |
|                          |   },                     |                          |
|                          |                          |                          |
|                          |   {                      |                          |
|                          |                          |                          |
|                          |       “site\_id”:        |                          |
|                          | “xyz”,                   |                          |
|                          |                          |                          |
|                          |       "token":           |                          |
|                          | "fgh73823b8ih7394189ij"  |                          |
|                          |                          |                          |
|                          |   }                      |                          |
|                          |                          |                          |
|                          | …… more records          |                          |
|                          |                          |                          |
|                          | ]                        |                          |
|                          |                          |                          |
|                          | \                        |                          |
|                          |                          |                          |
|                          | }                        |                          |
+--------------------------+--------------------------+--------------------------+

\

\

Note: In phase-I Pagination is not supported.

Get Consent Details by Developer Application (Client)

This is likely to be used by Consent UI application 

\

+--------------------------+--------------------------+--------------------------+
| Verb                     | GET                      | Remarks                  |
+--------------------------+--------------------------+--------------------------+
| Path                     | /consents?client\_id={cl | \                        |
|                          | ient\_id}&sort\_by={crea |                          |
|                          | ted\_at}&start\_at={off\ |                          |
|                          | _set}                    |                          |
+--------------------------+--------------------------+--------------------------+
| Query Params             | client\_id is mandatory  | In Phase-1 following     |
|                          |                          | attributes will not be   |
|                          | \                        | sent in response. But a  |
|                          |                          | different field “cursor” |
|                          | Note: An application by  | will be  sent which      |
|                          | default may have more    | points to next page      |
|                          | than one client id.      |                          |
|                          | However this API returns | \                        |
|                          | all consents for a       |                          |
|                          | client\_id, irrespective | totalCount               |
|                          | of the users.            |                          |
|                          |                          | start\_at                |
|                          | \                        |                          |
|                          |                          | count                    |
|                          | sort\_by field would     |                          |
|                          | sort the consents based  | \                        |
|                          | on one of the following  |                          |
|                          | orders, by created time  |                          |
|                          | stamp, by developer\_id  |                          |
|                          | alphabetically.  Default |                          |
|                          | is created time stamp    |                          |
|                          | descending.              |                          |
|                          |                          |                          |
|                          | \                        |                          |
|                          |                          |                          |
|                          | start\_at is provided to |                          |
|                          | support pagination. Each |                          |
|                          | payload of consent would |                          |
|                          | contain at most 10       |                          |
|                          | records. More than 10    |                          |
|                          | records can be displayed |                          |
|                          | with pagination. E.g.    |                          |
|                          | when                     |                          |
+--------------------------+--------------------------+--------------------------+
| Headers                  | Authorization: Basic     | \                        |
|                          | {creds}                  |                          |
|                          |                          |                          |
|                          | Accept: application/json |                          |
+--------------------------+--------------------------+--------------------------+
| Body                     | NA                       | \                        |
+--------------------------+--------------------------+--------------------------+
| Response                 | {                        | \                        |
|                          |                          |                          |
|                          | "totalCount" : "20",     |                          |
|                          |                          |                          |
|                          | "start\_at" : "0",       |                          |
|                          |                          |                          |
|                          | "count" : "10"           |                          |
|                          |                          |                          |
|                          | "consents": [            |                          |
|                          |                          |                          |
|                          | {                        |                          |
|                          |                          |                          |
|                          |   “consent\_id”:         |                          |
|                          | “sah7tvv46mkosydht”,     |                          |
|                          |                          |                          |
|                          |   "authorization\_code": |                          |
|                          | "bf84011e3",             |                          |
|                          |                          |                          |
|                          |   "company\_id":         |                          |
|                          | "dev1@devorg.com",       |                          |
|                          |                          |                          |
|                          |   "client\_id":          |                          |
|                          | "4rfg09ft874r9jc1",      |                          |
|                          |                          |                          |
|                          |    "application\_name" : |                          |
|                          | "Special Birds",         |                          |
|                          |                          |                          |
|                          |   "end\_user\_id":       |                          |
|                          | "123456-ahdci-CRM",      |                          |
|                          |                          |                          |
|                          |   "device\_type":        |                          |
|                          | "User-Agent xyz-model",  |                          |
|                          |                          |                          |
|                          |   "access\_token":       |                          |
|                          | "eab07f10f0a01e800118bba |                          |
|                          | 0",                      |                          |
|                          |                          |                          |
|                          |   “scope”: ["openid",    |                          |
|                          | "email" ] ,              |                          |
|                          |                          |                          |
|                          |   “status” : “active”,   |                          |
|                          |                          |                          |
|                          |   "consent\_type" :      |                          |
|                          | "in-band",               |                          |
|                          |                          |                          |
|                          |   "sso\_token":[         |                          |
|                          |                          |                          |
|                          |   {                      |                          |
|                          |                          |                          |
|                          |       “site\_id”:        |                          |
|                          | “abc”,                   |                          |
|                          |                          |                          |
|                          |       "token":           |                          |
|                          | "0800200c9a660fee3010"   |                          |
|                          |                          |                          |
|                          |   },                     |                          |
|                          |                          |                          |
|                          |   {                      |                          |
|                          |                          |                          |
|                          |       “site\_id”:        |                          |
|                          | “xyz”,                   |                          |
|                          |                          |                          |
|                          |       "token":           |                          |
|                          | "8563823b8ih73941ash1"   |                          |
|                          |                          |                          |
|                          |   }                      |                          |
|                          |                          |                          |
|                          |   ]                      |                          |
|                          |                          |                          |
|                          |   "last\_updated":       |                          |
|                          | "1394681135"             |                          |
|                          |                          |                          |
|                          | }                        |                          |
|                          |                          |                          |
|                          | \                        |                          |
|                          |                          |                          |
|                          | {                        |                          |
|                          |                          |                          |
|                          |   “consent\_id”:         |                          |
|                          | “sd2123vv46mkos12s”,     |                          |
|                          |                          |                          |
|                          |   "authorization\_code": |                          |
|                          | "8dty3dty0",             |                          |
|                          |                          |                          |
|                          |   "company\_id":         |                          |
|                          | "dev1@devorg.com",       |                          |
|                          |                          |                          |
|                          |   "client\_id":          |                          |
|                          | "4rfg09ft874r9jc1",      |                          |
|                          |                          |                          |
|                          |    "application\_name" : |                          |
|                          | "Another Bird",          |                          |
|                          |                          |                          |
|                          |   "end\_user\_id":       |                          |
|                          | "123456-ahdci-CRM",      |                          |
|                          |                          |                          |
|                          |   "device\_type":        |                          |
|                          | "User-Agent xyz-model",  |                          |
|                          |                          |                          |
|                          |   "access\_token":       |                          |
|                          | "12sdcmbgy9ijngh41096dnj |                          |
|                          | j0",                     |                          |
|                          |                          |                          |
|                          |   “scope”: ["openid",    |                          |
|                          | "email" ] ,              |                          |
|                          |                          |                          |
|                          |   “status” : “active”,   |                          |
|                          |                          |                          |
|                          |   "consent\_type" :      |                          |
|                          | "in-band",               |                          |
|                          |                          |                          |
|                          |   "sso\_token":[         |                          |
|                          |                          |                          |
|                          |   {                      |                          |
|                          |                          |                          |
|                          |       “site\_id”:        |                          |
|                          | “abc”,                   |                          |
|                          |                          |                          |
|                          |       "token":           |                          |
|                          | "098gt60c9a660fee7yhu"   |                          |
|                          |                          |                          |
|                          |   },                     |                          |
|                          |                          |                          |
|                          |   {                      |                          |
|                          |                          |                          |
|                          |       “site\_id”:        |                          |
|                          | “xyz”,                   |                          |
|                          |                          |                          |
|                          |       "token":           |                          |
|                          | "fgh73823b8ih7394189ij"  |                          |
|                          |                          |                          |
|                          |   }                      |                          |
|                          |                          |                          |
|                          | …… more records          |                          |
|                          |                          |                          |
|                          | ]                        |                          |
|                          |                          |                          |
|                          | \                        |                          |
|                          |                          |                          |
|                          | }                        |                          |
+--------------------------+--------------------------+--------------------------+

\

**Note: In phase-I Pagination is not supported.**

Update Consent 

+--------------------------+--------------------------+--------------------------+
| Verb                     | PUT                      | Remarks                  |
+--------------------------+--------------------------+--------------------------+
| Path                     | /consents/{consent\_id}  | \                        |
+--------------------------+--------------------------+--------------------------+
| Query Params             | NA                       | \                        |
+--------------------------+--------------------------+--------------------------+
| Headers                  | Authorization: Basic     | \                        |
|                          | {creds}                  |                          |
|                          |                          |                          |
|                          | Content-Type:            |                          |
|                          | application/json         |                          |
+--------------------------+--------------------------+--------------------------+
| Body                     | {                        | \                        |
|                          |                          |                          |
|                          | "access\_token":         | Only access token, scope |
|                          | "eab07f10f0a01e800118bba | and status of a consent  |
|                          | 0",                      | can be updated.   Status |
|                          |                          | field can be changed     |
|                          | “scope”: [“profile”],    | from active to revoked   |
|                          |                          | or expired.  But it can  |
|                          | “status” : “active”      | not be changed to active |
|                          |                          | state once ‘revoked’ or  |
|                          | }                        | ‘expired’.               |
+--------------------------+--------------------------+--------------------------+
| Response                 | {                        | \                        |
|                          |                          |                          |
|                          |   "consent\_id":         |                          |
|                          | "sah7tvv46mkosydht",     |                          |
|                          |                          |                          |
|                          |   "authorization\_code": |                          |
|                          | "bf84011e3",             |                          |
|                          |                          |                          |
|                          |   "company\_id":         |                          |
|                          | "dev1@devorg.com",       |                          |
|                          |                          |                          |
|                          |   "client\_id":          |                          |
|                          | "x11e3097caa5ea5e2",     |                          |
|                          |                          |                          |
|                          |    "application\_name" : |                          |
|                          | "Special Birds",         |                          |
|                          |                          |                          |
|                          |   "end\_user\_id":       |                          |
|                          | "123456-ahdci-CRM",      |                          |
|                          |                          |                          |
|                          |   "device\_type":        |                          |
|                          | "User-Agent xyz-model",  |                          |
|                          |                          |                          |
|                          |   "access\_token":       |                          |
|                          | "eab07f10f0a01e800118bba |                          |
|                          | 0",                      |                          |
|                          |                          |                          |
|                          |   "scope": ["openid",    |                          |
|                          | "email" ] ,              |                          |
|                          |                          |                          |
|                          |   "status" : "active",   |                          |
|                          |                          |                          |
|                          |   "consent\_type" :      |                          |
|                          | "in-band",               |                          |
|                          |                          |                          |
|                          |   "sso\_token":[         |                          |
|                          |                          |                          |
|                          |   {                      |                          |
|                          |                          |                          |
|                          |       "site\_id":        |                          |
|                          | "abc",                   |                          |
|                          |                          |                          |
|                          |       "token":           |                          |
|                          | "0800200c9a660fee3010"   |                          |
|                          |                          |                          |
|                          |   },                     |                          |
|                          |                          |                          |
|                          |   {                      |                          |
|                          |                          |                          |
|                          |       "site\_id":        |                          |
|                          | "xyz",                   |                          |
|                          |                          |                          |
|                          |       "token":           |                          |
|                          | "8563823b8ih73941ash1"   |                          |
|                          |                          |                          |
|                          |   }                      |                          |
|                          |                          |                          |
|                          |   ]                      |                          |
|                          |                          |                          |
|                          |   "last\_updated":       |                          |
|                          | "1394681135"             |                          |
|                          |                          |                          |
|                          | }                        |                          |
+--------------------------+--------------------------+--------------------------+

\

Create SSO Token

+--------------------------+--------------------------+--------------------------+
| Verb                     | POST                     | Remarks                  |
+--------------------------+--------------------------+--------------------------+
| Path                     | /token/sso/              | This method provides a   |
|                          |                          | way to create a user and |
|                          |                          | site specific SSO token  |
|                          |                          | for each consent         |
|                          |                          | (represented by Access   |
|                          |                          | Token) so that this      |
|                          |                          | token can be handed-over |
|                          |                          | to the end-user.         |
+--------------------------+--------------------------+--------------------------+
| Query Params             | NA                       | \                        |
+--------------------------+--------------------------+--------------------------+
| Headers                  | Authorization: Basic     | \                        |
|                          | {creds}                  |                          |
+--------------------------+--------------------------+--------------------------+
| Body                     | {                        | \                        |
|                          |                          |                          |
|                          | "site\_id":  "abc",      |                          |
|                          |                          |                          |
|                          | "access\_token":         |                          |
|                          | "eab07f10f0a01e800118bba |                          |
|                          | 0"                       |                          |
|                          |                          |                          |
|                          | }                        |                          |
+--------------------------+--------------------------+--------------------------+
| \                        | {                        | \                        |
|                          |                          |                          |
| \                        |   "sso\_token":          |                          |
|                          | "0800200c9a660fee3010",  |                          |
| \                        |                          |                          |
|                          |   "site\_id":  "abc",    |                          |
| \                        |                          |                          |
|                          |   "consent\_id":         |                          |
| Response                 | "sah7tvv46mkosydht",     |                          |
|                          |                          |                          |
|                          |   "authorization\_code": |                          |
|                          | "bf84011e3",             |                          |
|                          |                          |                          |
|                          |   "company\_id":         |                          |
|                          | "dev1@devorg.com",       |                          |
|                          |                          |                          |
|                          |   "client\_id":          |                          |
|                          | "x11e3097caa5ea5e2",     |                          |
|                          |                          |                          |
|                          |    "application\_name" : |                          |
|                          | "Special Birds",         |                          |
|                          |                          |                          |
|                          |   "end\_user\_id":       |                          |
|                          | "123456-ahdci-CRM",      |                          |
|                          |                          |                          |
|                          |   "device\_type":        |                          |
|                          | "User-Agent xyz-model",  |                          |
|                          |                          |                          |
|                          |   "access\_token":       |                          |
|                          | "eab07f10f0a01e800118bba |                          |
|                          | 0",                      |                          |
|                          |                          |                          |
|                          |   "scope": ["openid",    |                          |
|                          | "email" ] ,              |                          |
|                          |                          |                          |
|                          |   "status" : "active",   |                          |
|                          |                          |                          |
|                          |   "consent\_type" :      |                          |
|                          | "in-band",               |                          |
|                          |                          |                          |
|                          |   "last\_updated":       |                          |
|                          | "1394681135"             |                          |
|                          |                          |                          |
|                          | }                        |                          |
+--------------------------+--------------------------+--------------------------+

\

\

Validate/Refresh/Revoke SSO Token

+--------------------------+--------------------------+--------------------------+
| Verb                     | GET                      | Remarks                  |
+--------------------------+--------------------------+--------------------------+
| Path                     | /token/sso/{sso\_token}? | \                        |
|                          | action=validate          |                          |
|                          |                          | \                        |
|                          |                          |                          |
|                          |                          | \                        |
+--------------------------+--------------------------+--------------------------+
| Query Params             | action                   | action can be validate,  |
|                          |                          | refresh or revoke.       |
|                          |                          |                          |
|                          |                          | \                        |
|                          |                          |                          |
|                          |                          |  validate action - only  |
|                          |                          | the present state of the |
|                          |                          | sso token is returned.   |
|                          |                          |                          |
|                          |                          | \                        |
|                          |                          |                          |
|                          |                          | For refresh action - a   |
|                          |                          | new sso token replaces   |
|                          |                          | the existing sso token.  |
|                          |                          | Old sso token is         |
|                          |                          | completely removed.      |
|                          |                          |                          |
|                          |                          | \                        |
|                          |                          |                          |
|                          |                          | For revoke action - the  |
|                          |                          | token status is changed  |
|                          |                          | to revoked.              |
+--------------------------+--------------------------+--------------------------+
| Headers                  | Authorization: Basic     | \                        |
|                          | {creds}                  |                          |
+--------------------------+--------------------------+--------------------------+
| Body                     | \                        | \                        |
|                          |                          |                          |
|                          |                          |                          |
+--------------------------+--------------------------+--------------------------+
| \                        | {                        | value of status can be   |
|                          |                          | active, revoked or       |
| \                        |   "sso\_token":          | expired.                 |
|                          | "0800200c9a660fee3010",  |                          |
| \                        |                          | \                        |
|                          |   "site\_id":  "abc",    |                          |
| \                        |                          | \                        |
|                          |   "consent\_id":         |                          |
| Response                 | "sah7tvv46mkosydht",     |                          |
|                          |                          |                          |
|                          |   "authorization\_code": |                          |
|                          | "bf84011e3",             |                          |
|                          |                          |                          |
|                          |   "company\_id":         |                          |
|                          | "dev1@devorg.com",       |                          |
|                          |                          |                          |
|                          |   "client\_id":          |                          |
|                          | "x11e3097caa5ea5e2",     |                          |
|                          |                          |                          |
|                          |    "application\_name" : |                          |
|                          | "Special Birds",         |                          |
|                          |                          |                          |
|                          |   "end\_user\_id":       |                          |
|                          | "123456-ahdci-CRM",      |                          |
|                          |                          |                          |
|                          |   "device\_type":        |                          |
|                          | "User-Agent xyz-model",  |                          |
|                          |                          |                          |
|                          |   "access\_token":       |                          |
|                          | "eab07f10f0a01e800118bba |                          |
|                          | 0",                      |                          |
|                          |                          |                          |
|                          |   "scope": ["openid",    |                          |
|                          | "email" ] ,              |                          |
|                          |                          |                          |
|                          |   "status" : "active",   |                          |
|                          |                          |                          |
|                          |   "consent\_type" :      |                          |
|                          | "in-band",               |                          |
|                          |                          |                          |
|                          |   "last\_updated":       |                          |
|                          | "1394681135"             |                          |
|                          |                          |                          |
|                          | }                        |                          |
+--------------------------+--------------------------+--------------------------+

\

\

Token Expiry

If the last updated\_field of the token response is older than the
present time by a preconfigured time period, it is changed to as
‘expired’ and returned. This applies only to active tokens. Already
expried tokens or revoked tokens do not need this calculation. 
