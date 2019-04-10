using System.ComponentModel.DataAnnotations;

namespace RentACar
{
	public class CarModel
	{
		public int id { get; set; }

		[Required(ErrorMessage = "Missing model id.")]
		public int modelId { get; set; }

		[Required(ErrorMessage = "Missing license number.")]
		[StringLength(50, ErrorMessage = "License number can not be more than 50 chars.")]
		public string licenseNumber { get; set; }
	}
}
