using System.ComponentModel.DataAnnotations;

namespace RentACar
{
	public class ManufacturerModel
	{
		public int id { get; set; }

		[Required(ErrorMessage = "Missing manufacturer name.")]
		[StringLength(50, ErrorMessage = "Manufacturer name number can not be more than 50 chars.")]
		public string name { get; set; }
	}
}
