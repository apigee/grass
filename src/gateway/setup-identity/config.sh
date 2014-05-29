apikey="2R3jhZdrhwrEiRhAhV1NWfp2mtAwKvBT"
apisecret="GKbfhxg9uAtLkpI1"
auth=`echo ${apikey}:${apisecret} | base64`
org=darshan1234
env=test
host=$org-$env.apigee.net
appkey="YXA6SDcLsODgEeObw2dLEcns_w"
appsecret="YXA6qF1ZSmv_yPV2DuCyOJx8p-aC6HU"
apporg=darshan1234
appapp=identityapp
redirect_uri=www.apigee.com

#identity-consent-app config.json 

sed -i "" "s/__APIKEY__/$apikey/g" ../identity-consent-app/config.json
sed -i "" "s/__AUTH__/$auth/g" ../identity-consent-app/config.json
sed -i "" "s/__HOST__/$host/g" ../identity-consent-app/config.json

#identity-consentmgmt-api config.json
sed -i "" "s/__APPKEY__/$appkey/g" ../identity-consentmgmt-api/config.json
sed -i "" "s/__APPSECRET__/$appsecret/g" ../identity-consentmgmt-api/config.json
sed -i "" "s/__APPORG__/$apporg/g" ../identity-consentmgmt-api/config.json
sed -i "" "s/__APPAPP__/$appapp/g" ../identity-consentmgmt-api/config.json

#identity-oauthv2-api config.json
sed -i "" "s/__HOST__/$host/g" ../identity-oauthv2-api/config.json
sed -i "" "s/__AUTH__/$auth/g" ../identity-oauthv2-api/config.json

#identity-usermgmt-api config.json
sed -i "" "s/__APPORG__/$apporg/g" ../identity-usermgmt-api/config.json
sed -i "" "s/__APPAPP__/$appapp/g" ../identity-usermgmt-api/config.json
sed -i "" "s/__APPKEY__/$appkey/g" ../identity-usermgmt-api/config.json
sed -i "" "s/__APPSECRET__/$appsecret/g" ../identity-usermgmt-api/config.json

#identity-usermgmt-api package.json
sed -i "" "s/__APPORG__/$apporg/g" ../identity-usermgmt-node-module/usermgmt/package.json
sed -i "" "s/__APPAPP__/$appapp/g" ../identity-usermgmt-node-module/usermgmt/package.json
sed -i "" "s/__APPKEY__/$appkey/g" ../identity-usermgmt-node-module/usermgmt/package.json
sed -i "" "s/__APPSECRET__/$appsecret/g" ../identity-usermgmt-node-module/usermgmt/package.json

#identity-demo-api config.json
sed -i "" "s/__HOST__/$host/g" ../identity-demo-app/config.json
sed -i "" "s/__REDIRECTURI__/$redirect_uri/g" ../identity-demo-app/config.json
sed -i "" "s/__APIKEY__/$apikey/g" ../identity-demo-app/config.json
sed -i "" "s/__APISECRET__/$apisecret/g" ../identity-demo-app/config.json

