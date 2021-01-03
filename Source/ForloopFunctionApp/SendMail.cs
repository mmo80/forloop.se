using System;
using System.IO;
using System.Net;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using SendGrid;
using SendGrid.Helpers.Mail;

namespace ForloopFunctionApp
{
    public static class SendMail
    {
        [FunctionName("SendMail")]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", "post", Route = null)] HttpRequest req,
            ILogger log)
        {
            log.LogInformation("SendMail HTTP trigger function processed a request.");

            string email = req.Query["email"];
            string message = req.Query["message"];

            string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
            dynamic data = JsonConvert.DeserializeObject(requestBody);
            message ??= data?.message;
            email ??= data?.email;

            if (string.IsNullOrEmpty(email))
                throw new ArgumentNullException("email empty.");

            if (string.IsNullOrEmpty(message))
                throw new ArgumentNullException("message empty.");

            await SendEmail(message, email, GetToEmail());

            var responseMessage = "Message sent successfully.";
            return new OkObjectResult(new SendMailResponse { Message = responseMessage });
        }

        private static string GetToEmail()
        {
            var value = Environment.GetEnvironmentVariable("SendToMail");
            if (string.IsNullOrEmpty(value))
                throw new ArgumentNullException($"No ToEmail-Key found in settings!");

            return value;
        }

        private static string GetApiKey()
        {
            var value = Environment.GetEnvironmentVariable("SendGridApiKey");
            if (string.IsNullOrEmpty(value))
                throw new ArgumentNullException($"No Api-Key found in settings!");

            return value;
        }

        public static async Task SendEmail(string plainTextContent, string fromEmail, string toEmail)
        {
            var apiKey = GetApiKey();
            var client = new SendGridClient(apiKey);
            var from = new EmailAddress(fromEmail);
            var subject = "Forloop Contact Form";
            var to = new EmailAddress(toEmail);
            var msg = MailHelper.CreateSingleEmail(from, to, subject, plainTextContent, "");
            var response = await client.SendEmailAsync(msg);

            if (response.StatusCode != HttpStatusCode.Accepted && response.StatusCode != HttpStatusCode.OK)
            {
                throw new Exception($"Failed to send email. StatusCode:{response.StatusCode}, Message:{response.Body}");
            }
        }
    }

    public class SendMailResponse
    {
        public string Message { get; set; }
    }
}
