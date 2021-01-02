using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;

namespace ForloopFunctionApp
{
    public static class SendMail
    {
        [FunctionName("SendMail")]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", "post", Route = null)] HttpRequest req,
            ILogger log)
        {
            log.LogInformation("C# HTTP trigger function processed a request.");

            string email = req.Query["email"];
            string message = req.Query["message"];

            string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
            dynamic data = JsonConvert.DeserializeObject(requestBody);
            message ??= data?.message;
            email ??= data?.email;

            string responseMessage = string.IsNullOrEmpty(email)
                ? "This HTTP triggered function executed successfully. Pass a email and message in the query string or in the request body for a personalized response."
                : $"Hello, {email} and {message}. This HTTP triggered function executed successfully.";

            return new OkObjectResult(new SendMailResponse { Message = responseMessage });
        }
    }

    public class SendMailResponse
    {
        public string Message { get; set; }
    }
}
