```
curl https://{subdomain}.zendesk.com/oauth/tokens \
  -H "Content-Type: application/json" \
  -d '{"grant_type": "authorization_code", "code": "7783f438d6",
    "client_id": "fozzy_core_adapter", "client_secret": "zendesk_app_fozzy_oauth_client", 
    "redirect_uri": "https://b3bd-185-213-232-120.ngrok.io/zendesk_token", "scope": "read" }' \
  -X POST
```


grant_type - Specify "authorization_code" as the value.
code - Use the authorization code you received from Zendesk after the user granted access.
client_id - Use the unique identifier specified in an OAuth client in the Support admin interface (Admin > Channels > API > OAuth Clients). See Registering your application with Zendesk.
client_secret - Use the secret specified in an OAuth client in the Support admin interface (Admin > Channels > API > OAuth Clients). See Registering your application with Zendesk.
redirect_uri - The same redirect URL as in step 1. For ID purposes only.
scope - See Setting the scope..



sudo lsof -i -P -n | grep 3333
