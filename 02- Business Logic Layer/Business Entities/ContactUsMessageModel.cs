using System;
using System.ComponentModel.DataAnnotations;

namespace RentACar
{
	public class ContactUsMessageModel
	{
		public int contactUsID { get; set; }
		public int? userId { get; set; }//Not required

		[Required(ErrorMessage = "Missing name.")]
		[StringLength(20, ErrorMessage = "Fiest name can not be more than 20 letters.")]
		public string firstName { get; set; }

		[Required(ErrorMessage = "Missing last name.")]
		[StringLength(20, ErrorMessage = "Last name can not be more than 20 letters.")]
		public string lastName { get; set; }

		[Required(ErrorMessage = "Missing phone.")]
		[Phone(ErrorMessage = "Invalid phone.")]
		public string phone { get; set; }

		[EmailAddress(ErrorMessage = "Invalid email.")]
		public string email { get; set; }

		[Required(ErrorMessage = "Missing message.")]
		[StringLength(4000, ErrorMessage = "Message can not be more than 4000 chars.")]
		public string message { get; set; }

		[StringLength(50, ErrorMessage = "Subject can not be more than 50 chars.")]
		public string subject { get; set; }

		[Required(ErrorMessage = "Missing message date.")]
		public DateTime messageDate { get; set; }

		public override string ToString()
		{
			return $"First name: {firstName}," +
				$"Last Name: {lastName}," +
				$"Email: {email}," +
				$"Phone: {phone}," +
				$"Message: {message}," +
				$"Subject: {subject}" +
				$"Date: {messageDate}";
		}
	}
}
