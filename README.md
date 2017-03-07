# Creative Lights

This is a small example application that connects Adobe I/O Events with Creative Cloud, Adobe I/O Runtime and Philips Hue.

# Prerequisites

You need `jq`, which is a command line JSON parser and all-around awesome.

```
brew install jq
```

# Getting started
This script assumes macOS, with Safari as a default browser. 

The first step in the process is to register a webhook with Adobe I/O Events. There is a small helper script that authenticates the app, gets the authentication token and registers the webhook.

```
./register-webhook.sh <SECRET-KEY>
```

The script accepts one parameter SECRET-KEY, which I won't hard code (hint: it's secret), but you can get it from the Adobe I/O Console when registering your application.

# Hardware Setup

You will need:

 - 1 Philips Hue Bridge (buy the newer square version, although the older round version works, too)
 - 1 or more Philips Go Lights
 - 1 TP Link TL-MR6400 Router
 - 1 SIM card
 - 1 iPhone with the Philips Hue app installed
 
Do this only once.
 
1. Put the SIM card into the SIM card slot in the router and turn on the router
2. Connect the iPhone to the router's wifi network (password at the bottom of the router)
3. Connect the Hue bridge using an ethernet cable with the router
4. Launch the Hue app on the iPhone
5. Tap "Settings", "Hue bridges", "+", "Search"
6. Press the button on the Hue bridge
7. Wait and add the Hue bridge to the app
8. Perform the update as prompted
9. Tap "Light setup", "+"
10. (optional) add the serial numbers of the Hue Go lights. Numbers can be found at the bottom of the light, look for "S/N". Adding the numbers will make the process more reliable when switching lights between bridges or re-using lights
11. Tap "Search". Your lights should show up in the app.
12. (optional) Go back to "Home" and create a room as promted. This will allow you to control the lights using the app, which can help with troubleshooting.
13. Look up the bridge's IP address in the Hue app: "Settings", "Hue bridges", tap "i" next to your bridge, "Network settings", turn off "DHCP", note the IP address, save. The router will re-assign IP addresses after a short while, so we should reserve the address for the bridge.
14. Open the router's admin interface in a web browser, the IP address should be 192.168.1.0. Username/password is admin/admin
15. Click "Forwarding", "add new". Pick a "service port", e.g. 8080, use 80 for "internal port", and the bridge's IP address for "IP address". Click save.
16. (optional) set up Dynamic DNS
17. (if needed) change your APN to one that supports external IP addresses (no provider NAT)

Each time you set up the demo in a new environment:

1. Press the button on the bridge
2. Run this command on a computer that is on the same network as your Hue bridge: `sh get-hue-url.sh` and write down the username
3. The resulting address will be: `http://` + your public IP address (from https://www.whatismyip.com) or Dynamic DNS name + your chosen port + `/api/` + the resulting user name. Copy this address
4. Go to GitHub's WebHook settings and update the `bridge` URL parameter to the new URL

(If you use dynamic DNS, you only need to do this once.)