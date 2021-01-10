# forloop.se
Simple website for my company, Forloop AB (Swedish based)

## Updated 2021
Frontend is now all static files. Removed ASP.NET Core project from repo.<br>
Added sendmail backend to an Azure Function.<br>

### Hosted on Azure:
- Azure Storage for hosting the static web (Blob storage)
- Azure Function
- Azure CDN (For adding SSL to custom mapped domains)
- Azure API Management (For securing HTTP-Function)
- Azure DDoS Protection (DDOS protection and Cost protection)

### Links
[Hosting an SSL Custom Domain Static Website in Azure Storage Account](https://arlanblogs.alvarnet.com/hosting-an-ssl-custom-domain-static-website-in-azure-storage-account/)<br>
[Azure Functions HTTP trigger -> Secure an HTTP endpoint in production](https://docs.microsoft.com/en-gb/azure/azure-functions/functions-bindings-http-webhook-trigger?tabs=csharp#secure-an-http-endpoint-in-production)<br>
[CDN Rule Engine troubleshooting](https://stackoverflow.com/questions/58697519/azure-cdn-verizon-custom-rewrite-rule-invalid-origin)<br>
[SendGrid](https://sendgrid.com/) (For sending out emails)<br>
[Purge Azure CDN endpoints](https://docs.microsoft.com/en-gb/azure/cdn/cdn-purge-endpoint) (To purge all CDN endpoints and force emptying of cache)<br>
[Azure DDOS protection overview](https://docs.microsoft.com/en-us/azure/ddos-protection/ddos-protection-overview) (Nice with Cost Protection)<br>

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