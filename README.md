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


~~## Before getting started [Obsolete] ##~~
~~Create file 'appSettings.config' in project root.<br>
Add following values:~~

~~
```
<?xml version="1.0"?>
<appSettings>
  <add key="webpages:Version" value="3.0.0.0" />
  <add key="webpages:Enabled" value="false" />
  
  <add key="SendGridApiKey" value="[YOUR-SENDGRID-APIKEY]"/>
</appSettings>
```
~~