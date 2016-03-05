using SendGrid;
using System.Configuration;
using System.Net;
using System.Net.Http;
using System.Net.Mail;
using System.Web.Http;

namespace ForloopWebApp.Controllers
{
    public class ContactController : ApiController
    {
        [HttpPost]
        public HttpResponseMessage SendMail(ContactBody request)
        {
            if (request != null)
            {
                SendEmail(request.Email, request.Message);
            }

            return Request.CreateResponse(HttpStatusCode.Created);
        }


        private string GetApiKey()
        {
            var apiKey = ConfigurationManager.AppSettings["SendGridApiKey"];

            if (string.IsNullOrEmpty(apiKey))
            {
                throw new System.ArgumentNullException("No Api-Key found in appSettings!");
            }

            return apiKey;
        }


        // Url: https://github.com/sendgrid/sendgrid-csharp
        // Url: https://sendgrid.com/docs/API_Reference/SMTP_API/substitution_tags.html
        private void SendEmail(string fromEmail, string message)
        {
            var apiKey = GetApiKey();

            // Create the email object first, then add the properties.
            SendGridMessage myMessage = new SendGridMessage();
            myMessage.AddTo("mmo_80@yahoo.se");
            myMessage.From = new MailAddress(fromEmail);
            myMessage.Subject = "Forloop Contact Form";
            myMessage.Text = message;

            // Create a Web transport, using API Key
            var transportWeb = new Web(apiKey);

            // Send the email.
            transportWeb.DeliverAsync(myMessage);
        }
    }


    public class ContactBody
    {
        public string Email { get; set; }
        public string Message { get; set; }
    }
}
