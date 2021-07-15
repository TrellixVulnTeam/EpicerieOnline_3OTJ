using System;
using System.Net.Mail;
using System.Threading.Tasks;
using FluentEmail.Core;
using FluentEmail.Smtp;

namespace EpicerieOnline2.EmailSender
{
    public class Sender : ISender
    {


        public Sender()
        {
        }


        //Sending email

        public async Task SendEmailAsync()
        {

            var sender = new SmtpSender(() => new SmtpClient()
            {
                //EnableSsl = false,
                //DeliveryMethod = SmtpDeliveryMethod.SpecifiedPickupDirectory,
                //PickupDirectoryLocation = @"C:\Demos"

                DeliveryMethod = SmtpDeliveryMethod.Network,
                Host = "smtp.gmail.com",
                Port = 587,
                EnableSsl = true,
                UseDefaultCredentials = false,
                Credentials = new System.Net.NetworkCredential("jacek.bialek1908@gmail.com", "LksLodz1908!")



            });

            Email.DefaultSender = sender;

            var email = await Email
                .From("jacek.bialek1908@gmail.com")
                .To("jacek.bialek1908@gmail.com", "Alex")
                .Subject("Test")
                .Body("<h1>Jacek bialek jest najemlpszy!</h1>")
                .SendAsync();


        }

       
    }
}
