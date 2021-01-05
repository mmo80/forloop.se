# forloop.se
Simple website for my company, Forloop AB (Swedish based)

## Updated 2021
Frontend is now all static files. Removing ASP.NET Core project from repo.<br>
Added sendmail backend to a Azure Function.<br>

### Going to be hosted on Azure:
- Azure Storage for hosting the static web (Blob storage)
- Azure Function
- Azure CDN (For adding SSL to custom mapped domains)
- Azure API Management (For securing HTTP-Function)

### Links
[Hosting an SSL Custom Domain Static Website in Azure Storage Account](https://arlanblogs.alvarnet.com/hosting-an-ssl-custom-domain-static-website-in-azure-storage-account/)<br>
[Azure Functions HTTP trigger -> Secure an HTTP endpoint in production](https://docs.microsoft.com/en-gb/azure/azure-functions/functions-bindings-http-webhook-trigger?tabs=csharp#secure-an-http-endpoint-in-production)<br>


## Before getting started ##
Add required keys to your function app.<br>
Local: Add keys to 'local.settings.json' (azure function project root)<br>
Azure: Through the Azure portal under 'Function App(where SendMail is hosted) > Configuration > Application settings'.<br>
<br>
Add following values:

```
"SendGridApiKey": "*****",
"SendToMail": "your@mail.com"
```