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
./authenticate.sh <X-API-KEY>
```

The script accepts one parameter X-API-KEY, which you can find #FIXME