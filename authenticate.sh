#!/bin/sh
# Replace this with your own Client ID
CLIENT_ID="8d06fe64c9ea43b4a41adf9348dec9ae"
open "https://ims-na1-stg1.adobelogin.com/ims/authorize/v1?client_id=$CLIENT_ID&response_type=token&redirect_uri=https://requestb.in/y4nwg5y4&scope=openid,creative_sdk"
sleep 10
REDIRECT=`osascript -e 'tell Application "Safari" to return URL of front document'`
TOKEN=`echo $REDIRECT | sed -e "s/.*#access_token=//" | sed -e "s/&.*//"`
echo $TOKEN | pbcopy
#TOKEN=`pbpaste`
echo ""
echo "Got this token:"
echo $TOKEN

echo "Running: "
echo curl -vv --header 'Content-Type: application/json' --header 'Accept: application/json' --header "Authorization: Bearer $TOKEN" --header "x-api-key: $CLIENT_ID" -d '{ \ 
   "client_id": '"$1"', \ 
   "name": "Image uploaded", \ 
   "description": "Image uploaded, duh", \ 
   "webhook_url": "http://requestb.in/1mmkhdb1", \ 
   "events_of_interest": [{ "provider": "ci_sc_stg", "event_code": "asset_created"},  { "provider": "ci_sc_stg", "event_code": "asset_updated"},  { "provider": "ci_sc_stg", "event_code": "asset_deleted"} ] \
}' 'https://csm-stage.adobe.io/csm/users/webhooks'

Sleep 1

curl -vv --header 'Content-Type: application/json' --header 'Accept: application/json' --header "Authorization: Bearer $TOKEN" --header "x-api-key: $CLIENT_ID" -d '{ \ 
   "client_id": '"$1"', \ 
   "name": "Image uploaded", \ 
   "description": "Image uploaded, duh", \ 
   "webhook_url": "http://requestb.in/1mmkhdb1", \ 
   "events_of_interest": [{ "provider": "ci_sc_stg", "event_code": "asset_created"},  { "provider": "ci_sc_stg", "event_code": "asset_updated"},  { "provider": "ci_sc_stg", "event_code": "asset_deleted"} ] \ 
}' 'https://csm-stage.adobe.io/csm/users/webhooks'