Consent Management APIs for Apigee Identity Solution

  

Consent Management APIs expose a uniform REST based interface for 

  

-   Creating and storing user consents
-   Query consent details by user, by application and by developers
-   Updating consent 
-   Revoke / Invalidate a consent

  

Primary consumer of these APIs are 

-   “Resource Server” Admins (API Team)
-   Consent Management UI for End-user Self-Service
-   Consent  capture protocol implementation like OAUTH 
-   Third-party developers (in future)

  

**Design principles**

****  

-   Consent Management API abstracts the Apigee's standard access token
    functionality and Apigee App Services APIs. It provides protocol
    independent way to manage the consent.
-   Wherever possible these APIs follows standards such as OAUTH 2.0 or
    User Management Access (UMA) Protocol.

API Version

Version of this API specifications is 1.0

This documentation is published on March 18, 2014. 

Authentication and Authorization

Following are the consumers of this API

-   **First Party/End User Self Service UI**: UI component access the
    consent api using OAUTH 2.0 client credential authentication model.
    First party application are configured to access all consent 
    queries by Application, by User, By Device. 
-   **Third Party Application**: In future these APIs can be exposed to
    Developer to query consent details at application or developer
    level.  Developers will use Oauth v2 client credentials mechanism to
    authenticate with this service. But application typically have
    access to consent queries only by THE application.

  

Standard Error Responses 

Broadly following the REST principles and HTTP conventions the following
error codes are used by the Consent API:

  

  

<table>
<col width="50%" />
<col width="50%" />
<tbody>
<tr class="odd">
<td align="left"><p>HTTP Error Code</p></td>
<td align="left"><p>Explanation</p></td>
</tr>
<tr class="even">
<td align="left"><p>400</p></td>
<td align="left"><p>Bad Request – The request contains incorrect structure or parameters</p></td>
</tr>
<tr class="odd">
<td align="left"><p>401</p></td>
<td align="left"><p>Unauthorized – Authorization header is missing or incorrect.</p></td>
</tr>
<tr class="even">
<td align="left"><p>403</p></td>
<td align="left"><p>Forbidden – Access to the requested resource is not allowed</p></td>
</tr>
<tr class="odd">
<td align="left"><p>404</p></td>
<td align="left"><p>Not Found – The specified resource could not be found</p></td>
</tr>
<tr class="even">
<td align="left"><p>405</p></td>
<td align="left"><p>Method Not Allowed – Specified HTTP method is not allowed on the requested resource</p></td>
</tr>
<tr class="odd">
<td align="left"><p>409</p></td>
<td align="left"><p>Conflict – The resource already exists (while creating)</p></td>
</tr>
<tr class="even">
<td align="left"><p>500</p></td>
<td align="left"><p>Internal Server Error – Server side error. Please try again later.</p></td>
</tr>
<tr class="odd">
<td align="left"><p>503</p></td>
<td align="left"><p>Service Unavailable – One or more required server side services are not available. Please try again later.</p></td>
</tr>
</tbody>
</table>

  

\<\< Please add detail error response, for example: what will be error
message, if you unable to create consent record because backend(App
Services) is down\>\>

  

  

  
 Conceptual Entity Model

  

  

The diagram above depicts the high-level entity model that is underlying
the Consent Management APIs.  The resource structure of a REST API
follows the entity model as closely as possible. Hence it is important
to declare the Entity Model reference for a consistent API design.

  

Note:

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

  

  

  

  

Creating and storing user consent for each third-party application

This will be an internal API that will be used by the OpenID flow to
internally generate Consent records based on User Authorization events
(i.e., Code Generation step)

  

  

<table>
<col width="33%" />
<col width="33%" />
<col width="33%" />
<tbody>
<tr class="odd">
<td align="left"><p>Verb</p></td>
<td align="left"><p>POST</p></td>
<td align="left"><p>Remarks</p></td>
</tr>
<tr class="even">
<td align="left"><p>Path</p></td>
<td align="left"><p>/consents</p></td>
<td align="left"><p><br /></p></td>
</tr>
<tr class="odd">
<td align="left"><p>Query Params</p></td>
<td align="left"><p>NA</p></td>
<td align="left"><p><br /></p></td>
</tr>
<tr class="even">
<td align="left"><p>Headers</p></td>
<td align="left"><p>Authorization: Basic {creds}</p>
<p>Content-Type: application/json</p></td>
<td align="left"><p><br /></p></td>
</tr>
<tr class="odd">
<td align="left"><p>Body</p></td>
<td align="left"><p>{</p>
<p>  &quot;company_id&quot;: &quot;dev1@devorg.com&quot;,</p>
<p>  &quot;client_id&quot;: &quot;x11e3097caa5ea5e2&quot;,</p>
<p>  &quot;end_user_id&quot;: &quot;123456-ahdci-CRM&quot;,</p>
<p>  &quot;device_type&quot;: &quot;User-Agent xyz-model&quot;,</p>
<p>  &quot;authorization_code&quot;: &quot;bf84011e3&quot;,</p>
<p>  &quot;access_token&quot;: [ &quot;eab07f10f0a01e800118bba0&quot; ],</p>
<p>&quot;refresh_token&quot;: [ &quot;tyn267czx0aqhfnal54wsewo&quot; ],</p>
<p>  &quot;sso_token&quot;:[</p>
<p>  {</p>
<p>  “site_id”:  “abc”, </p>
<p>  &quot;token&quot;: &quot;0800200c9a660fee3010&quot;</p>
<p>  },</p>
<p>  {</p>
<p>  “site_id”:  “xyz”, </p>
<p>  &quot;token&quot;: &quot;8563823b8ih73941ash1&quot;</p>
<p>  }</p>
<p>  ]</p>
<p>“scope”: [“read profile”],</p>
<p>“status” : “active”</p>
<p>}</p>
<p><br /></p></td>
<td align="left"><p>The sso_token field is optional. One of the fields between authorization_code and access_token must be present while creating.  </p>
<p><br /></p>
<p>Once created most of the fields can not be updated except status, access_token, refresh_token and sso_token and scope.</p>
<p><br /></p>
<p>Always only the latest and active tokens are referenced from the consent. Old and inactive tokens are not.  This is required because when a consent is revoked, corresponding active access tokens and refresh tokens should be removed or deactivated.</p></td>
</tr>
<tr class="even">
<td align="left"><p>Response</p></td>
<td align="left"><p>{</p>
<p>  “consent_id”: “sah7tvv46mkosydht”  </p>
<p>  &quot;developer_id&quot;: &quot;dev1@devorg.com&quot;,</p>
<p>  &quot;client_id&quot;: &quot;x11e3097caa5ea5e2&quot;,</p>
<p>  &quot;end_user_id&quot;: &quot;123456-ahdci-CRM&quot;,</p>
<p>  &quot;device_type&quot;: &quot;User-Agent xyz-model&quot;,</p>
<p>  &quot;authorization_code&quot;: &quot;bf84011e3&quot;,</p>
<p>  &quot;access_token&quot;: [ &quot;eab07f10f0a01e800118bba0&quot; ], &quot;refresh_token&quot;: [ &quot;tyn267czx0aqhfnal54wsewo&quot; ],</p>
<p>  &quot;sso_token&quot;:[</p>
<p>  {</p>
<p>  “site_id”:  “abc”, </p>
<p>  &quot;token&quot;: &quot;0800200c9a660fee3010&quot;</p>
<p>  },</p>
<p>  {</p>
<p>  “site_id”:  “xyz”, </p>
<p>  &quot;token&quot;: &quot;8563823b8ih73941ash1&quot;</p>
<p>  }</p>
<p>  ]</p>
<p>“scope”: [“read profile”],</p>
<p>“status” : “active”,</p>
<p>&quot;last_updated&quot;: &quot;1394681135&quot;</p>
<p>}</p></td>
<td align="left"><p>The consent id should be stored as a custom attribute against the access token, the authorization code and the SSO token if any.  That way when an access token or the SSO token is being validated the handle to the consent id can be obtained. The idea is to update the consent details whenever there is a change in scope, access token or sso tokens. </p></td>
</tr>
</tbody>
</table>

  

  

Get Consent Details by Consent ID

This is likely to be used by Administrators or Operations for debugging
purpose. 

  

<table>
<col width="33%" />
<col width="33%" />
<col width="33%" />
<tbody>
<tr class="odd">
<td align="left"><p>Verb</p></td>
<td align="left"><p>GET</p></td>
<td align="left"><p>Remarks</p></td>
</tr>
<tr class="even">
<td align="left"><p>Path</p></td>
<td align="left"><p>/consents/{consent_id}</p></td>
<td align="left"><p><br /></p></td>
</tr>
<tr class="odd">
<td align="left"><p>Query Params</p></td>
<td align="left"><p>NA</p></td>
<td align="left"><p><br /></p></td>
</tr>
<tr class="even">
<td align="left"><p>Headers</p></td>
<td align="left"><p>Authorization: Basic {creds}</p>
<p>Accept: application/json</p></td>
<td align="left"><p><br /></p></td>
</tr>
<tr class="odd">
<td align="left"><p>Body</p></td>
<td align="left"><p>NA</p></td>
<td align="left"><p><br /></p></td>
</tr>
<tr class="even">
<td align="left"><p>Response</p></td>
<td align="left"><p>{</p>
<p>  “consent_id”: “sah7tvv46mkosydht”  </p>
<p>  &quot;developer_id&quot;: &quot;dev1@devorg.com&quot;,</p>
<p>  &quot;client_id&quot;: &quot;x11e3097caa5ea5e2&quot;,</p>
<p>  &quot;end_user_id&quot;: &quot;123456-ahdci-CRM&quot;,</p>
<p>  &quot;device_type&quot;: &quot;User-Agent xyz-model&quot;,</p>
<p>  &quot;authorization_code&quot;: &quot;bf84011e3&quot;,</p>
<p>  &quot;access_token&quot;: [ &quot;eab07f10f0a01e800118bba0&quot; ], &quot;refresh_token&quot;: [ &quot;tyn267czx0aqhfnal54wsewo&quot; ],</p>
<p>  &quot;sso_token&quot;:[</p>
<p>  {</p>
<p>  “site_id”:  “abc”, </p>
<p>  &quot;token&quot;: &quot;0800200c9a660fee3010&quot;</p>
<p>  },</p>
<p>  {</p>
<p>  “site_id”:  “xyz”, </p>
<p>  &quot;token&quot;: &quot;8563823b8ih73941ash1&quot;</p>
<p>  }</p>
<p>  ]</p>
<p>“scope”: [“read profile”],</p>
<p>“status” : “active”,</p>
<p>&quot;last_updated&quot;: &quot;1394681135&quot;</p>
<p>}</p></td>
<td align="left"><p><br /></p></td>
</tr>
</tbody>
</table>

  

Get Consent Details by User 

This is likely to be used by Consent Management UI or by Administrators.
 

  

<table>
<col width="33%" />
<col width="33%" />
<col width="33%" />
<tbody>
<tr class="odd">
<td align="left"><p>Verb</p></td>
<td align="left"><p>GET</p></td>
<td align="left"><p>Remarks</p></td>
</tr>
<tr class="even">
<td align="left"><p>Path</p></td>
<td align="left"><p>/consents?user_id={user_id}&amp;sort_by={created_at}&amp;start_at={off_set}</p></td>
<td align="left"><p><br /></p></td>
</tr>
<tr class="odd">
<td align="left"><p>Query Params</p></td>
<td align="left"><p>user_id  or access_token or authorization_code should be passed to pass on the user context. One of the three fields is mandatory.</p>
<p><br /></p>
<p>sort_by optional field would sort the consents based on one of the following orders, by created time stamp, by developer_id alphabetically.  Default is created time stamp descending. </p>
<p><br /></p>
<p>start_at is optional. It is provided to support pagination. Each payload of consent would contain at most 10 records. More than 10 records can be displayed with pagination.</p></td>
<td align="left"><p><br /></p></td>
</tr>
<tr class="even">
<td align="left"><p>Headers</p></td>
<td align="left"><p>Authorization: Basic {creds}</p>
<p>Accept: application/json</p></td>
<td align="left"><p><br /></p></td>
</tr>
<tr class="odd">
<td align="left"><p>Body</p></td>
<td align="left"><p>NA</p></td>
<td align="left"><p><br /></p></td>
</tr>
<tr class="even">
<td align="left"><p>Response</p></td>
<td align="left"><p>{ </p>
<p></p>
<p>&quot;totalCount&quot; : &quot;20&quot;,</p>
<p>&quot;start_at&quot; : &quot;0&quot;,</p>
<p>&quot;count&quot; : &quot;10&quot;</p>
<p>&quot;consents&quot;: [</p>
<p>{</p>
<p>“consent_id”: “sah7tvv46mkosydht”  </p>
<p>&quot;developer_id&quot;: &quot;dev1@devorg.com&quot;,</p>
<p>&quot;client_id&quot;: &quot;x11e3097caa5ea5e2&quot;,</p>
<p>&quot;end_user_id&quot;: &quot;123456-ahdci-CRM&quot;,</p>
<p>&quot;device_type&quot;: &quot;User-Agent xyz-model&quot;,</p>
<p>&quot;authorization_code&quot;: &quot;bf84011e3&quot;,</p>
<p>&quot;access_token&quot;: [ &quot;eab07f10f0a01e800118bba0&quot; ],</p>
<p>&quot;sso_token&quot;:[</p>
<p>{</p>
<p>  “site_id”:  “abc”, </p>
<p>  &quot;token&quot;: &quot;0800200c9a660fee3010&quot;</p>
<p>},</p>
<p>{</p>
<p>“site_id”:  “xyz”, </p>
<p>&quot;token&quot;: &quot;8563823b8ih73941ash1&quot;</p>
<p>}</p>
<p>]</p>
<p>“scope”: [“read profile”],</p>
<p>“status” : “active”,</p>
<p>&quot;last_updated&quot;: &quot;1394681135&quot;</p>
<p>},</p>
<p>{</p>
<p>“consent_id”: “hud8fhg45mkosuyhf”  </p>
<p>&quot;developer_id&quot;: &quot;dev1@devorg.com&quot;,</p>
<p>&quot;client_id&quot;: &quot;x11e3097caa5ea5e2&quot;,</p>
<p>&quot;end_user_id&quot;: &quot;123456-ahdci-CRM&quot;,</p>
<p>&quot;device_type&quot;: &quot;User-Agent xyz-model&quot;,</p>
<p>&quot;authorization_code&quot;: &quot;74tgdb7mv1&quot;,</p>
<p>&quot;access_token&quot;: [ &quot;eab07f10f0a01e800118bba0&quot; ],<br />                            &quot;refresh_token&quot;: [ &quot;tyn67czx0aqhfnal54wsewo&quot; ],</p>
<p>&quot;sso_token&quot;:[</p>
<p>  {</p>
<p>  “site_id”:  “abc”, </p>
<p>  &quot;token&quot;: &quot;0800200c9a660fee3010&quot;</p>
<p>  },</p>
<p>  {</p>
<p>  “site_id”:  “xyz”, </p>
<p>  &quot;token&quot;: &quot;8563823b8ih73941ash1&quot;</p>
<p>  }</p>
<p>  ]</p>
<p>“scope”: [“read profile”],</p>
<p>“status” : “active”,</p>
<p>&quot;last_updated&quot;: &quot;1394681134&quot;</p>
<p>}]</p>
<p>…… more records</p>
<p>}</p></td>
<td align="left"><p><br /></p></td>
</tr>
</tbody>
</table>

  

  

Get Consent Details by Developer 

This is likely to be used by Consent UI application 

  

<table>
<col width="33%" />
<col width="33%" />
<col width="33%" />
<tbody>
<tr class="odd">
<td align="left"><p>Verb</p></td>
<td align="left"><p>GET</p></td>
<td align="left"><p>Remarks</p></td>
</tr>
<tr class="even">
<td align="left"><p>Path</p></td>
<td align="left"><p>/consents?developer_id={developer_id}&amp;sort_by={created_at}&amp;start_at={off_set}</p></td>
<td align="left"><p><br /></p></td>
</tr>
<tr class="odd">
<td align="left"><p>Query Params</p></td>
<td align="left"><p>developer_id is mandatory </p>
<p><br /></p>
<p>sort_by optional field would sort the consents based on one of the following orders, by created time stamp, by developer_id alphabetically.  Default is created time stamp descending. </p>
<p><br /></p>
<p>start_at is optional. It is provided to support pagination. Each payload of consent would contain at most 10 records. More than 10 records can be displayed with pagination. </p></td>
<td align="left"><p><br /></p></td>
</tr>
<tr class="even">
<td align="left"><p>Headers</p></td>
<td align="left"><p>Authorization: Basic {creds}</p>
<p>Accept: application/json</p></td>
<td align="left"><p><br /></p></td>
</tr>
<tr class="odd">
<td align="left"><p>Body</p></td>
<td align="left"><p>NA</p></td>
<td align="left"><p><br /></p></td>
</tr>
<tr class="even">
<td align="left"><p>Response</p></td>
<td align="left"><p>{ </p>
<p></p>
<p>&quot;totalCount&quot; : &quot;20&quot;,</p>
<p>&quot;start_at&quot; : &quot;0&quot;,</p>
<p>&quot;count&quot; : &quot;10&quot;</p>
<p>&quot;consents&quot;: [</p>
<p>{</p>
<p>“consent_id”: “sah7tvv46mkosydht”  </p>
<p>&quot;developer_id&quot;: &quot;dev1@devorg.com&quot;,</p>
<p>&quot;client_id&quot;: &quot;x11e3097caa5ea5e2&quot;,</p>
<p>&quot;end_user_id&quot;: &quot;123456-ahdci-CRM&quot;,</p>
<p>&quot;device_type&quot;: &quot;User-Agent xyz-model&quot;,</p>
<p>&quot;authorization_code&quot;: &quot;bf84011e3&quot;,</p>
<p>&quot;access_token&quot;: [ &quot;eab07f10f0a01e800118bba0&quot; ],<br />                            &quot;refresh_token&quot;: [ &quot;tyn267czx0aqhfnal54wsewo&quot; ],<br />                            &quot;sso_token&quot;:[</p>
<p>{</p>
<p>  “site_id”:  “abc”, </p>
<p>  &quot;token&quot;: &quot;0800200c9a660fee3010&quot;</p>
<p>},</p>
<p>{</p>
<p>“site_id”:  “xyz”, </p>
<p>&quot;token&quot;: &quot;8563823b8ih73941ash1&quot;</p>
<p>}</p>
<p>]</p>
<p>“scope”: [“read profile”],</p>
<p>“status” : “active”,</p>
<p>&quot;last_updated&quot;: &quot;1394681135&quot;</p>
<p>},</p>
<p>{</p>
<p>“consent_id”: “hud8fhg45mkosuyhf”  </p>
<p>&quot;developer_id&quot;: &quot;dev1@devorg.com&quot;,</p>
<p>&quot;client_id&quot;: &quot;x11e3097caa5ea5e2&quot;,</p>
<p>&quot;end_user_id&quot;: &quot;123456-ahdci-CRM&quot;,</p>
<p>&quot;device_type&quot;: &quot;User-Agent xyz-model&quot;,</p>
<p>&quot;authorization_code&quot;: &quot;74tgdb7mv1&quot;,</p>
<p>&quot;access_token&quot;: [ &quot;eab07f10f0a01e800118bba0&quot; ],</p>
<p>&quot;sso_token&quot;:[</p>
<p>  {</p>
<p>  “site_id”:  “abc”, </p>
<p>  &quot;token&quot;: &quot;0800200c9a660fee3010&quot;</p>
<p>  },</p>
<p>  {</p>
<p>  “site_id”:  “xyz”, </p>
<p>  &quot;token&quot;: &quot;8563823b8ih73941ash1&quot;</p>
<p>  }</p>
<p>  ]</p>
<p>“scope”: [“read profile”],</p>
<p>“status” : “active”,</p>
<p>&quot;last_updated&quot;: &quot;1394681134&quot;</p>
<p>}]</p>
<p>…… more records</p>
<p>}</p></td>
<td align="left"><p><br /></p></td>
</tr>
<tr class="odd">
<td align="left"><p><br /></p></td>
<td align="left"><p><br /></p></td>
<td align="left"><p><br /></p></td>
</tr>
</tbody>
</table>

  

  

Get Consent Details by Developer Application (Client)

This is likely to be used by Consent UI application 

  

<table>
<col width="33%" />
<col width="33%" />
<col width="33%" />
<tbody>
<tr class="odd">
<td align="left"><p>Verb</p></td>
<td align="left"><p>GET</p></td>
<td align="left"><p>Remarks</p></td>
</tr>
<tr class="even">
<td align="left"><p>Path</p></td>
<td align="left"><p>/consents?client_id={client_id}&amp;sort_by={created_at}&amp;start_at={off_set}</p></td>
<td align="left"><p><br /></p></td>
</tr>
<tr class="odd">
<td align="left"><p>Query Params</p></td>
<td align="left"><p>client_id is mandatory </p>
<p><br /></p>
<p>Note: An application by default may have more than one client id. However this API returns all consents for a client_id, irrespective of the users. </p>
<p><br /></p>
<p>sort_by field would sort the consents based on one of the following orders, by created time stamp, by developer_id alphabetically.  Default is created time stamp descending. </p>
<p><br /></p>
<p>start_at is provided to support pagination. Each payload of consent would contain at most 10 records. More than 10 records can be displayed with pagination. E.g. when </p></td>
<td align="left"><p><br /></p></td>
</tr>
<tr class="even">
<td align="left"><p>Headers</p></td>
<td align="left"><p>Authorization: Basic {creds}</p>
<p>Accept: application/json</p></td>
<td align="left"><p><br /></p></td>
</tr>
<tr class="odd">
<td align="left"><p>Body</p></td>
<td align="left"><p>NA</p></td>
<td align="left"><p><br /></p></td>
</tr>
<tr class="even">
<td align="left"><p>Response</p></td>
<td align="left"><p>{ </p>
<p></p>
<p>&quot;totalCount&quot; : &quot;20&quot;,</p>
<p>&quot;start_at&quot; : &quot;0&quot;,</p>
<p>&quot;count&quot; : &quot;10&quot;</p>
<p>&quot;consents&quot;: [</p>
<p>{</p>
<p>“consent_id”: “sah7tvv46mkosydht”  </p>
<p>&quot;developer_id&quot;: &quot;dev1@devorg.com&quot;,</p>
<p>&quot;client_id&quot;: &quot;x11e3097caa5ea5e2&quot;,</p>
<p>&quot;end_user_id&quot;: &quot;123456-ahdci-CRM&quot;,</p>
<p>&quot;device_type&quot;: &quot;User-Agent xyz-model&quot;,</p>
<p>&quot;authorization_code&quot;: &quot;bf84011e3&quot;,</p>
<p>&quot;access_token&quot;: [ &quot;eab07f10f0a01e800118bba0&quot; ],</p>
<p>&quot;sso_token&quot;:[</p>
<p>{</p>
<p>  “site_id”:  “abc”, </p>
<p>  &quot;token&quot;: &quot;0800200c9a660fee3010&quot;</p>
<p>},</p>
<p>{</p>
<p>“site_id”:  “xyz”, </p>
<p>&quot;token&quot;: &quot;8563823b8ih73941ash1&quot;</p>
<p>}</p>
<p>]</p>
<p>“scope”: [“read profile”],</p>
<p>“status” : “active”,</p>
<p>&quot;last_updated&quot;: &quot;1394681135&quot;</p>
<p>},</p>
<p>{</p>
<p>“consent_id”: “hud8fhg45mkosuyhf”  </p>
<p>&quot;developer_id&quot;: &quot;dev1@devorg.com&quot;,</p>
<p>&quot;client_id&quot;: &quot;x11e3097caa5ea5e2&quot;,</p>
<p>&quot;end_user_id&quot;: &quot;123456-ahdci-CRM&quot;,</p>
<p>&quot;device_type&quot;: &quot;User-Agent xyz-model&quot;,</p>
<p>&quot;authorization_code&quot;: &quot;74tgdb7mv1&quot;,</p>
<p>&quot;access_token&quot;: [ &quot;eab07f10f0a01e800118bba0&quot; ],</p>
<p>&quot;sso_token&quot;:[</p>
<p>  {</p>
<p>  “site_id”:  “abc”, </p>
<p>  &quot;token&quot;: &quot;0800200c9a660fee3010&quot;</p>
<p>  },</p>
<p>  {</p>
<p>  “site_id”:  “xyz”, </p>
<p>  &quot;token&quot;: &quot;8563823b8ih73941ash1&quot;</p>
<p>  }</p>
<p>  ]</p>
<p>“scope”: [“read profile”],</p>
<p>“status” : “active”,</p>
<p>&quot;last_updated&quot;: &quot;1394681134&quot;</p>
<p>}]</p>
<p>…… more records</p>
<p>}</p></td>
<td align="left"><p><br /></p></td>
</tr>
</tbody>
</table>

  

  

Update Consent 

<table>
<col width="33%" />
<col width="33%" />
<col width="33%" />
<tbody>
<tr class="odd">
<td align="left"><p>Verb</p></td>
<td align="left"><p>PUT</p></td>
<td align="left"><p>Remarks</p></td>
</tr>
<tr class="even">
<td align="left"><p>Path</p></td>
<td align="left"><p>/consents/{consent_id}</p></td>
<td align="left"><p><br /></p></td>
</tr>
<tr class="odd">
<td align="left"><p>Query Params</p></td>
<td align="left"><p>NA</p></td>
<td align="left"><p><br /></p></td>
</tr>
<tr class="even">
<td align="left"><p>Headers</p></td>
<td align="left"><p>Authorization: Basic {creds}</p>
<p>Content-Type: application/json</p></td>
<td align="left"><p><br /></p></td>
</tr>
<tr class="odd">
<td align="left"><p>Body</p></td>
<td align="left"><p>{</p>
<p>  &quot;access_token&quot;: [ &quot;eab07f10f0a01e800118bba0&quot; ],</p>
<p>&quot;refresh_token&quot;: [ &quot;tyn267czx0aqhfnal54wsewo&quot; ],</p>
<p>  &quot;sso_token&quot;:[</p>
<p>  {</p>
<p>  “site_id”:  “abc”, </p>
<p>  &quot;token&quot;: &quot;0800200c9a660fee3010&quot;</p>
<p>  },</p>
<p>  {</p>
<p>  “site_id”:  “xyz”, </p>
<p>  &quot;token&quot;: &quot;8563823b8ih73941ash1&quot;</p>
<p>  }</p>
<p>  ]</p>
<p>“scope”: [“read profile”],</p>
<p>“status” : “active”</p>
<p>}</p>
<p><br /></p></td>
<td align="left"><p><br /></p>
<p>Only access token, sso token, scope and status of a consent can be updated.   Status field can be changed from active to revoked or expired.  But it can not be changed to active state once revoked or expired.  </p></td>
</tr>
<tr class="even">
<td align="left"><p>Response</p></td>
<td align="left"><p>{</p>
<p>  “consent_id”: “sah7tvv46mkosydht”  </p>
<p>  &quot;developer_id&quot;: &quot;dev1@devorg.com&quot;,</p>
<p>  &quot;client_id&quot;: &quot;x11e3097caa5ea5e2&quot;,</p>
<p>  &quot;end_user_id&quot;: &quot;123456-ahdci-CRM&quot;,</p>
<p>  &quot;device_type&quot;: &quot;User-Agent xyz-model&quot;,</p>
<p>  &quot;authorization_code&quot;: &quot;bf84011e3&quot;,</p>
<p>  &quot;access_token&quot;: [ &quot;eab07f10f0a01e800118bba0&quot; ],</p>
<p>&quot;refresh_token&quot;: [ &quot;tyn267czx0aqhfnal54wsewo&quot; ],</p>
<p>  &quot;sso_token&quot;:[</p>
<p>  {</p>
<p>  “site_id”:  “abc”, </p>
<p>  &quot;token&quot;: &quot;0800200c9a660fee3010&quot;</p>
<p>  },</p>
<p>  {</p>
<p>  “site_id”:  “xyz”, </p>
<p>  &quot;token&quot;: &quot;8563823b8ih73941ash1&quot;</p>
<p>  }</p>
<p>  ]</p>
<p>“scope”: [“read profile”],</p>
<p>“status” : “active”,</p>
<p>&quot;last_updated&quot;: &quot;1394681135&quot;</p>
<p>}</p></td>
<td align="left"><p><br /></p></td>
</tr>
</tbody>
</table>

  

Validate SSO Token

<table>
<col width="33%" />
<col width="33%" />
<col width="33%" />
<tbody>
<tr class="odd">
<td align="left"><p>Verb</p></td>
<td align="left"><p>GET</p></td>
<td align="left"><p>Remarks</p></td>
</tr>
<tr class="even">
<td align="left"><p>Path</p></td>
<td align="left"><p>/token/sso</p></td>
<td align="left"><p><br /></p></td>
</tr>
<tr class="odd">
<td align="left"><p>Query Params</p></td>
<td align="left"><p>NA</p></td>
<td align="left"><p><br /></p></td>
</tr>
<tr class="even">
<td align="left"><p>Headers</p></td>
<td align="left"><p>Authorization: SSO {sso_token}</p></td>
<td align="left"><p><br /></p></td>
</tr>
<tr class="odd">
<td align="left"><p>Body</p></td>
<td align="left"><p>N/A</p></td>
<td align="left"><p><br /></p>
<p> </p></td>
</tr>
<tr class="even">
<td align="left"><p>Response</p></td>
<td align="left"><p>{</p>
<p>  “consent_id”: “sah7tvv46mkosydht”  </p>
<p>  &quot;developer_id&quot;: &quot;dev1@devorg.com&quot;,</p>
<p>  &quot;client_id&quot;: &quot;x11e3097caa5ea5e2&quot;,</p>
<p>  &quot;end_user_id&quot;: &quot;123456-ahdci-CRM&quot;,</p>
<p>  &quot;device_type&quot;: &quot;User-Agent xyz-model&quot;,</p>
<p>  &quot;authorization_code&quot;: &quot;bf84011e3&quot;,</p>
<p>  &quot;access_token&quot;: [ &quot;eab07f10f0a01e800118bba0&quot; ],</p>
<p>&quot;refresh_token&quot;: [ &quot;tyn267czx0aqhfnal54wsewo&quot; ],</p>
<p>  &quot;sso_token&quot;:[</p>
<p>  {</p>
<p>  “site_id”:  “abc”, </p>
<p>  &quot;token&quot;: &quot;0800200c9a660fee3010&quot; </p>
<p>  }</p>
<p>  ]</p>
<p>“scope”: [“read profile”],</p>
<p>“status” : “active”,</p>
<p>&quot;last_updated&quot;: &quot;1394681135&quot;</p>
<p>}</p></td>
<td align="left"><p>Only one site specific to the SSO token will be returned in the response, though all the SSO tokens belong to the same application for multiple sites. </p></td>
</tr>
</tbody>
</table>

  

