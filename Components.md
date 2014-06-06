<p align="left"><a href="http://apigee.com/"><img src="http://apigee.com/about/sites/all/themes/apigee_themes/apigee_mktg/images/logo.png"/></a></p>

#Component Level Details

### 1. User Profile Management Pages

Type | Notes
--------- | --------
Datastore | Usergrid
Stack | Existing Usergrid Admin Pages
Notes | <ul><li>This is for admins to manage users, and their profiles and comes with the Usergrid UI, at the moment.</li><li>Talks to Usergrid, to fetch the relevant information and display.</li></ul>
Configurable | No

### 2. User Login Pages

Type | Notes
--------- | --------
Datastore | Usergrid
Stack | HTML5, CSS, Node.Js (Apigee Edge)
Dependencies | Identity API, User Profile API, SMS Token Validation
Notes | <ul><li>Supports registration via MSISDN, On-Net, OpenID</li><li>Supports login via On-Net, Off-Net (userid, password in Apigee, SMS Token via MSISDN, OpenID)</li></ul>
Configurable | Branding, SMS Backend, SMS Token, Injection Header for On-Net, front-end SSL, session validity

### 3. User Consent Pages

Type | Notes
--------- | --------
Datastore | Cassandra
Stack | HTML5, CSS, Node.Js (Apigee Edge)
Dependencies | Consent Mgmt API
Notes | <ul><li>Display details about the transaction / scope of application – for the user to grant / deny consent</li></ul>
Configurable | Branding, T&C, Responsive Theme

### 4. User Consent Mgmt Pages

Type | Notes
--------- | --------
Datastore | Cassandra
Stack | HTML5, CSS, Node.Js (Apigee Edge)
Dependencies | Consent Mgmt API
Notes | <ul><li>Display details about the consents approved by the specific user</li><li>Query by App, device, date / time, scope</li></ul>
Configurable | Branding, T&C, Responsive Theme

### 5. Usergrid API Adapter

Type | Notes
--------- | --------
Datastore | Usergrid
Stack | Apigee Edge
Dependencies | N/A
Notes | <ul><li>Proxy Usergrid API for common CRUD operations against User entity to SPI Interface</li></ul>
Configurable | N/A

### 6. CRM API Adapter

Type | Notes
--------- | --------
Datastore | Operator CRM
Stack | Apigee Edge
Dependencies | Operator CRM Backend
Notes | <ul><li>Proxy Operator CRM Backend to SPI Interface</li></ul>
Configurable | N/A

### 7. Gigya API Adapter

Type | Notes
--------- | --------
Datastore | Gigya
Stack | Apigee Edge
Dependencies | Gigya
Notes | <ul><li>Proxy Gigya Backend to SPI Interface</li></ul>
Configurable | N/A

### 8. Identity API

Type | Notes
--------- | --------
Datastore | Usergrid
Stack | Apigee Edge
Dependencies | User Profile API, Consent Mgmt API
Notes | <li>Provides On-Net authentication</li><li>Provides Off-Net authentication via Onetime PIN, userid password in Usergrid & OpenID provider.</li><li>Expose SSO API using the above.</li>
Configurable | N/A

### 9. Consent Mgmt API

Type | Notes
--------- | --------
Datastore | 4G Oauth (provided by 4G API Services) & Usergrid
Stack | Apigee Edge
Dependencies | N/A
Notes | <li>Provides Consent Management capabilities.</li><li>Create, Read, Update / Delete Consent.</li>
Configurable | N/A

### 10. SMS Token Validation API

Type | Notes
--------- | --------
Datastore | 4G Cache Service (provided by 4G API Services)
Stack | Apigee Edge
Dependencies | N/A
Notes | <li>Generate Token for a given Identifier.</li><li>Validate Token for a given Identifier.</li>
Configurable | N/A
