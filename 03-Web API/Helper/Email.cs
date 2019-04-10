using System.IO;
using System.Net;
using System.Net.Mail;
using System.Text;

namespace RentACar.Helper
{
	public static class Email
	{
		// ec7841424@gmail.com this is the owner of the site's email address.

		/// <summary>
		/// Sending email.
		/// </summary>
		/// <param name="subject">Email subject.</param>
		/// <param name="body">Email body.</param>
		public static void Send(string subject, string body)
		{
			Send("anastasiaalegranti@gmail.com", subject, body);
		}

		/// <summary>
		/// Sending email.
		/// </summary>
		/// <param name="toEmailAddress">Email address.</param>
		/// <param name="subject">Email subject.</param>
		/// <param name="body">Email body.</param>
		public static void Send(string toEmailAddress, string subject, string body)
		{
			Send(toEmailAddress, subject, body, null);
		}

		/// <summary>
		/// Sending email with attachment.
		/// </summary>
		/// <param name="toEmailAddress">Email address.</param>
		/// <param name="subject">Email subject.</param>
		/// <param name="body">Email body.</param>
		/// <param name="attachmentFileName">Attachment file name.</param>
		public static void Send(string toEmailAddress, string subject, string body, string attachmentFileName)
		{
			using (MailMessage msg2Send = new MailMessage("anastasiaalegranti@gmail.com", toEmailAddress))
			{
				// Set subject and body:
				msg2Send.IsBodyHtml = true;
				msg2Send.SubjectEncoding = Encoding.UTF8;
				msg2Send.BodyEncoding = Encoding.UTF8;
				msg2Send.Subject = subject;
				msg2Send.Body = body;

				// Set attachment if exist: 
				if (!string.IsNullOrEmpty(attachmentFileName) && File.Exists(attachmentFileName))
					msg2Send.Attachments.Add(new Attachment(attachmentFileName));

				// Set SMTP properties: 
				SmtpClient smtpClient = new SmtpClient("smtp.gmail.com", 587);
				smtpClient.EnableSsl = true;
				smtpClient.Timeout = 60000;
				smtpClient.DeliveryMethod = SmtpDeliveryMethod.Network;

				// Set credentials: 
				smtpClient.Credentials = new NetworkCredential("ec7841424@gmail.com", "q12q12q12");

				// Send email:
				smtpClient.Send(msg2Send);
			}
		}
	}
}