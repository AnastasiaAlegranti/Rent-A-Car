using System.ComponentModel.DataAnnotations;

namespace RentACar
{
	public class CredentialsModel
	{
		[Required (ErrorMessage ="Missing Username.")]
		[StringLength(15, ErrorMessage = "Userame can not be more than 15 chars.")]
		public string username { get; set; }

		[Required(ErrorMessage = "Missing Password.")]
		[StringLength(100, ErrorMessage = "Password can not be more than 100 chars.")]
		public string password { get; set; }
	}
}
