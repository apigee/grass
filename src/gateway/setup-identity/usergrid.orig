### usergrid.sh

URI=__BAASURI__
ADMIN_EMAIL=__ADMINEMAIL__
APW=__APW__

### These are the Custom variables ###
echo "Enter Apigee App services org, followed by [ENTER]:"
read ORG

sed -i "" "s/__UGORG__/$ORG/g" ./config.sh

echo "Enter Application Name , followed by [ENTER]:"
read APP_NAME

echo "Enter Apigee Baas Org Client Id, followed by [ENTER]:"
read c_id

echo "Enter Apigee Baas Org Client Secret, followed by [ENTER]:"
read sec

echo "Fetching App Services Token, to login ..."
token=`curl -X POST ${URI}/management/token  -d '{"grant_type":"client_credentials", "client_id": "'${c_id}'", "client_secret": "'${sec}'"}' | sed 's/.*access_token\"\:\"\(.*\)\"\,\"expires_in.*/\1/'`

echo "Create App Services Application: ${APP_NAME}, with Token: ${token}"
`curl -X POST ${URI}/management/orgs/${ORG}/apps?access_token="${token}" -d '{"name":"'${APP_NAME}'"}'`

###
#creds=`curl -X POST ${URI}/management/orgs/${ORG}/apps/${APP_NAME}/credentials?access_token="${token}" | sed 's/}//'`
#echo "Got App Services Credentials for the App, that was created above: ${creds}"
#c_id=${creds#*client_id*:}
#c_id=`echo ${c_id%,*} | tr -d ' '`
#sec=${creds#*client_secret*:}
#sec=`echo ${sec%*} | tr -d ' '`
#echo "Client ID: ${c_id}"
#echo "Client Secret: ${sec}"
###

echo "Creating Collections"
resp=`curl -X POST ${URI}/${ORG}/${APP_NAME}/consent?access_token="${token}"`
echo "Status: Creating Consent Collection: ${resp}"

resp=`curl -X POST ${URI}/${ORG}/${APP_NAME}/sso?access_token="${token}"`
echo "Status: Creating SSO Collection:${resp}"

sed -i "" "s/__UGKEY__/$c_id/g" ./config.sh
sed -i "" "s/__UGSECRET__/$sec/g" ./config.sh
sed -i "" "s/__UGAPP__/$APP_NAME/g" ./config.sh
### End - Create Application ###

sh ./config.sh
