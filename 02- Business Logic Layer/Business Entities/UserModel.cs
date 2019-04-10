using System;
using System.ComponentModel.DataAnnotations;

namespace RentACar
{
	public class UserModel
	{
		public int userId { get; set; }

		[Required(ErrorMessage = "Missing name.")]
		[StringLength(20, ErrorMessage = "Name can not be more than 20 letters.")]
		public string firstName { get; set; }

		[Required(ErrorMessage = "Missing last name.")]
		[StringLength(20, ErrorMessage = "Last name can not be more than 20 letters.")]
		public string lastName { get; set; }

		//Not containing CredentialsModel- because of different validations.
		[Required(ErrorMessage = "Missing user name.")]
		[MinLength(2, ErrorMessage = "User name must contain at least 2 chars.")]
		[StringLength(15, ErrorMessage = "User name can not be more than 15 chars.")]
		[IsUsernameValid(ErrorMessage = "User name already exists.Please enter a different user name.")]
		public string username { get; set; }

		[Required(ErrorMessage = "Missing password.")]
		[MinLength(4, ErrorMessage = "Password must contain at least 4 letters.")]
		[MaxLength(50, ErrorMessage = "Password can not be more than 50 chars.")]
		public string password { get; set; }

		[Required(ErrorMessage = "Missing phone.")]
		[Phone(ErrorMessage = "Invalid phone.")]
		public string phone { get; set; }

		[EmailAddress(ErrorMessage = "Invalid email.")]
		public string email { get; set; }
		public DateTime? dateOfBirth { get; set; }

		[Required(ErrorMessage = "Missing role.")]
		[MinLength(2, ErrorMessage = "Role must contain at least 2 letters.")]
		[MaxLength(15, ErrorMessage = "Role can not be more than 15 letters.")]
		public string role { get; set; }
	}
}
