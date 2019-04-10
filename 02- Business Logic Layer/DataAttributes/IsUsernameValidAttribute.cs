using System.ComponentModel.DataAnnotations;
using System.Linq;

namespace RentACar
{
	class IsUsernameValidAttribute : ValidationAttribute
	{//Check in DB if username already taken.
		public override bool IsValid(object value)// Return a boolean value: true == IsValid, false != IsValid
		{
			BaseLogic baseLogic = new BaseLogic();

			var user = baseLogic.DB.Users.Where(u => u.UserName == value.ToString()).FirstOrDefault();
			return user == null;
		}
	}
}
