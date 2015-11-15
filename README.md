<p align="left"><a href="http://apigee.com/"><img src="http://apigee.com/about/sites/all/themes/apigee_themes/apigee_mktg/images/logo.png"/></a></p>

Overview
--------
[Grass](https://github.com/apigee/grass#grass-definition) is an **identity solution** based on Apigee Edge platform. Identity is the essential block of any digital ecosystem needs, let it be application, data analysis and contextual content delivery through APIs. 

The key differences between Grass and any traditional identity system are:

    •	It can handle millions of users. 
    •	It is exposed as REST API and Standards (Open ID Connect).
    •	It has in-built consent management, which is expandable for all non-identity resource type as well.
    •	It can authenticate in different ways including SMS Login, Social login etc.
    
The identity solution is built based upon the OpenID Connect 1.0 Specification, which is a simple identity layer on top of the OAuth 2.0 protocol. Check the details at [OpenID connect](http://openid.net/connect/) and [FAQ](http://openid.net/connect/faq/). The FAQ has a nice 5 minute video, don't miss to check it out.
The Grass identity solution at present supports the [Authorization Code flow](http://openid.net/specs/openid-connect-core-1_0.html#CodeFlowAuth). It does not support [Implicit Flow](http://openid.net/specs/openid-connect-core-1_0.html#ImplicitFlowAuth) and [Hybrid Flow](http://openid.net/specs/openid-connect-core-1_0.html#HybridFlowAuth).


Architecture and API Specification
----------------------------------

<p align="left"><a><img src="https://i.cloudup.com/55Lv-NK4H2.png"/></a></p>


Broadly the present Architecture can be modularised as follows:

#### Apps
   * Consent App
     * Consent Managment solution on Apigee Edge. 
     * Supports the Demo app for Consent Management.
   * Demo App
     * Demonstrates the Identity solution. 
     * Accepts User Login, Mobile phone Login, Social login.
     * Presently only User Login is implemented. 
     * Upon successful user authentication, asks for User consent.
     * Post user allowing consent, shows user location information to mark completion.

#### API's
   * Internal
     * Identity-Authentication-spi
        * Wrapper for Thrid party Identity service provider interface. 
        * Presently not used. 
        * Contributions required.
     * Identity-sms-token-api
        * Provide SMS token capabilities for Strong authentication
        * [Details](https://github.com/apigee/grass/blob/master/docs/source/token-validation-api.md)
   * External
     * Identity-Consentmgmt-api
        * Provides Consent Management support on Apigee Edge. 
        * Uses App Services to store consent. Custom collections - consent, sso
        * [Details](https://github.com/apigeecs/grass/blob/master/docs/source/consent-management-api.md)
     * Identiy-Usermgmt-api
        * The identity provider API. 
        * Uses App Services as the User store. Default collection - user
        * [Details](https://github.com/apigeecs/grass/blob/master/docs/source/index.md)               
     * Identity-oauthv2-api
        * The key identity API based upon the OpenID spec.
        * Presently supports only the authorization code flow. 
        * [Details](https://github.com/apigeecs/grass/blob/master/docs/source/identity-api.md)
    * Identity-demo-app
        * This is demo app that runs on Apigee Gateway
        * [Details] (https://github.com/apigee/grass/tree/master/src/gateway/identity-demo-app)
            


Deploying and using Grass Identity Solution
-------------------------------------------
Prerequisites:
You need to have access to deployed Apigee Edge Services with organization details. If you don’t have this – please sign-up at [Apigee Edge](http://enterprise.apigee.com) now.
[Maven](http://maven.apache.org) is used for managing the dependencies and for build automation. Get it installed beforehand.

    Git clone “grass” repo.
    Goto /grass/src/gateway/setup-identity. 
    Run setup.sh

* When you run the setup.sh script it will ask for your organization name on Apigee Edge, the environment to setup the Identity solution and the Apigee Edge credentials.	
* It then creates API service resources (cache resources) ,  a developer (Identity User),  product (Identity App product) and an app (Identity App) for the created developer. 
* Then it will ask for the name of the App Services organization (An app services organization will be created by default when you create an organization on Apigee Edge. So the same can be used.) and the name for the App to be created on App services. 
* Post this, the App services will be setup along with 2 custom collections, Consent & SSO (Single Sign-On). 
* In the end it deploys the Identity API Proxies to your specified organization and deploys to the environment you specified.


###### Please Note: 
The setup.sh needs to be executed from setup-identity folder. It would fail otherwise since relative paths are used from the setup-identity folder. Please feel free to contribute to the setup script itself and make it robust.

Make your contributions to Grass
--------------------------------
You can make your valuable contributions to the open source project Grass. You can see the contribution guidlines and documenation at [Contribute to Grass](https://github.com/apigee/grass/blob/master/CONTRIBUTING.md).

Continuous Integration
----------------------
###### Setting Up Mocha: 
Guidlines in seting up Mocha for Continuous Integration

###### Create Jobs on Mocha: 
How to create a job on Mocha.

###### Jenkins: 
Add details here.
