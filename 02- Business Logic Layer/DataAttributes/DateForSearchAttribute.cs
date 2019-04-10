using System;
using System.ComponentModel.DataAnnotations;

namespace RentACar
{
	public class DateForSearchAttribute : ValidationAttribute
	{
		public override bool IsValid(object value)// Return a boolean value: true == IsValid, false != IsValid
		{
			if (value == null)
				return true;
			DateTime d = Convert.ToDateTime(value);
			return d >= DateTime.Today; //Dates Greater than or equal to today are valid (true)
		}
	}
}
