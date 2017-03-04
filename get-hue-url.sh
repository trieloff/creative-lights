#!/bin/sh

echo "Getting internal IP address of bridge"
IP=`curl https://www.meethue.com/api/nupnp | jq -r ".[0].internalipaddress"`
echo "Found it: $IP"

RESP=`curl  -X POST -d '{"devicetype":"my_hue_app"}' http://$IP/api`

echo "Copy this user name (if it's null, press the button on the bridge):"
USERNAME=`echo $RESP | jq -r ".[0].success.username"`
echo $USERNAME

EXTIP=`curl https://api.ipify.org?format=json | jq -r ".ip"`

echo http://$EXTIP:8080/api/$USERNAME