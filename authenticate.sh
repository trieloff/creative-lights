#!/bin/sh
# Replace this with your own Client ID
CLIENT_ID="8d06fe64c9ea43b4a41adf9348dec9ae"
open "https://ims-na1-stg1.adobelogin.com/ims/authorize/v1?client_id=8d06fe64c9ea43b4a41adf9348dec9ae&response_type=token&redirect_uri=https://requestb.in/y4nwg5y4&scope=openid,creative_sdk"
sleep 3
REDIRECT=`osascript -e 'tell Application "Safari" to return URL of front document'`
TOKEN=`echo $REDIRECT | sed -e "s/.*#access_token=//" | sed -e "s/&.*//"`
echo "Got this token:"
echo $TOKEN