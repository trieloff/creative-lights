#!/bin/sh
# Replace this with your own Client ID
CLIENT_ID="8d06fe64c9ea43b4a41adf9348dec9ae"

# Replace this with your own Consumer ID
# Get this from https://admin-stage.adobe.io/ then navigate to your app
# https://admin-stage.adobe.io/consumer/org/$CONSUMER_ID/apps/$APPLICATION_ID
CONSUMER_ID="1609"

# Replace this with your own Application ID
APPLICATION_ID="2993"

# Create a WebScript here at webscript.io with following contents

#	local request  = request
#	local method = request.method
#	if method == "GET" then
#	    if (request.query["challenge"]) then
#	        log("got challenge: " .. request.query["challenge"])
#	    else
#	        log("no challenge")
#	    end
#	    return request.query["challenge"]
#	end
#	if method == "POST" then
#	    log("webhook invoked with: " .. request.body)
#	    return request.body
#	end

WEBHOOK_URL="https://demo-otgpoz.webscript.io/script"

open "https://ims-na1-stg1.adobelogin.com/ims/authorize/v1?response_type=code&client_id=$CLIENT_ID&scope=AdobeID%2Copenid%2Ccreative_sdk&redirect_uri=https://requestb.in/y4nwg5y4"
#open "https://ims-na1-stg1.adobelogin.com/ims/authorize/v1?client_id=$CLIENT_ID&response_type=token&redirect_uri=https://requestb.in/y4nwg5y4&scope=openid,creative_sdk"
sleep 10
REDIRECT=`osascript -e 'tell Application "Safari" to return URL of front document'`
TOKEN=`echo $REDIRECT | sed -e "s/.*code=//" | sed -e "s/&.*//"`
#TOKEN=`echo $REDIRECT | sed -e "s/.*#access_token=//" | sed -e "s/&.*//"`
echo $TOKEN | pbcopy
#TOKEN=`pbpaste`
echo ""
echo "Got this token:"
echo $TOKEN

# Getting the user access token
ACCESS_TOKEN=`curl -X POST -H "Content-Type: application/x-www-form-urlencoded" -d "grant_type=authorization_code&client_id=$CLIENT_ID&client_secret=$1&code=$TOKEN" "https://ims-na1-stg1.adobelogin.com/ims/token/v1" | jq -r .access_token`


# curl -X POST -H "authorization: Bearer <user access token from previous step>" -H "content-type: application/json" -H "x-ams-consumer-id: <consumer id>" -H "x-ams-application-id: <application id>" -H "x-api-key: <client id of the app created earlier in the Adobe I/O console>" -d '{ "client_id": "<client id of the app created earlier in the Adobe I/O console>", "name": "<a name>", "description": "<a description>", "webhook_url": "<the https webscript.io URL you created above>",   "events_of_interest": [{ "provider": "ci_sc_stg", "event_code": "asset_created"},  { "provider": "ci_sc_stg", "event_code": "asset_updated"},  { "provider": "ci_sc_stg", "event_code": "asset_deleted"} ]    }' "https://csm-stage.adobe.io/csm/webhooks"

curl -vv \
	--header 'Content-Type: application/json' \
	--header 'Accept: application/json' \
	--header "Authorization: Bearer $ACCESS_TOKEN" \
	--header "x-api-key: $CLIENT_ID" \
	--header "x-ams-consumer-id: $CONSUMER_ID" \
	--header "x-ams-application-id: $APPLICATION_ID" \
	-d '{ "client_id": "'$CLIENT_ID'", "name": "Files uploaded", "description": "Let me know when files have been uploaded", "webhook_url": "'$WEBHOOK_URL'",   "events_of_interest": [{ "provider": "ci_sc_stg", "event_code": "asset_created"},  { "provider": "ci_sc_stg", "event_code": "asset_updated"},  { "provider": "ci_sc_stg", "event_code": "asset_deleted"} ]    }' \
	"https://csm-stage.adobe.io/csm/webhooks"


open https://assets-stage.adobecc.com/files