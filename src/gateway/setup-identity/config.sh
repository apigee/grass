apikey=__KEY__
apisecret=__SECRET__
auth=`echo ${apikey}:${apisecret} | base64`
org=__ORG__
env=__ENV__
host=$org-$env.apigee.net
appkey=__UGKEY__
appsecret=__UGSECRET__
apporg=__UGORG__
appapp=__UGAPP__
redirect_uri=http://$host/identity_app/callback

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

