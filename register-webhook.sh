#!/bin/sh
# Replace this with your own Client ID
CLIENT_ID="8d06fe64c9ea43b4a41adf9348dec9ae"

# Replace this with your own Consumer ID
# Get this from https://admin-stage.adobe.io/ then navigate to your app
# https://admin-stage.adobe.io/consumer/org/$CONSUMER_ID/apps/$APPLICATION_ID
CONSUMER_ID="1609"

# Replace this with your own Application ID
APPLICATION_ID="2993"

WEBHOOK_URL="https://6v0m5wjis3.execute-api.eu-west-1.amazonaws.com/prod/"

echo "Asking the user (you) to authorize the application"

open "https://ims-na1-stg1.adobelogin.com/ims/authorize/v1?response_type=code&client_id=$CLIENT_ID&scope=AdobeID%2Copenid%2Ccreative_sdk&redirect_uri=https://requestb.in/y4nwg5y4"
REDIRECT=""
sleep 10
until [ `echo $REDIRECT | grep code` ]; do
	sleep 1
	REDIRECT=`osascript -e 'tell Application "Safari" to return URL of front document'`
	echo "not there yet…"
done

echo "Authorization received, now getting token from redirect target"

TOKEN=`echo $REDIRECT | sed -e "s/.*code=//" | sed -e "s/&.*//"`

echo "Exchanging token for user access token"

# Getting the user access token
ACCESS_TOKEN=`curl -X POST -H "Content-Type: application/x-www-form-urlencoded" -d "grant_type=authorization_code&client_id=$CLIENT_ID&client_secret=$1&code=$TOKEN" "https://ims-na1-stg1.adobelogin.com/ims/token/v1" | jq -r .access_token`

echo "Access token received."

echo ""
echo $ACCESS_TOKEN
echo ""

node webhook-handler.js $ACCESS_TOKEN $CLIENT_ID

echo "Now registering the WebHook"

curl \
	--header 'Content-Type: application/json' \
	--header 'Accept: application/json' \
	--header "Authorization: Bearer $ACCESS_TOKEN" \
	--header "x-api-key: $CLIENT_ID" \
	--header "x-ams-consumer-id: $CONSUMER_ID" \
	--header "x-ams-application-id: $APPLICATION_ID" \
	-d '{ "client_id": "'$CLIENT_ID'", "name": "Files uploaded", "description": "Let me know when files have been uploaded", "webhook_url": "'$WEBHOOK_URL'",   "events_of_interest": [{ "provider": "ccstorage", "event_code": "asset_created"},  { "provider": "ccstorage", "event_code": "asset_updated"},  { "provider": "ccstorage", "event_code": "asset_deleted"} ]    }' \
	"https://csm-stage.adobe.io/csm/webhooks"

echo "WebHook registered."

echo "Opening browser, please upload a file to Creative Cloud"

open https://assets-stage.adobecc.com/files
