using System.ComponentModel.DataAnnotations;

namespace RentACar
{
	public class ModelModel
	{
		public int id { get; set; }

		[Required(ErrorMessage = "Missing manufacturer name.")]
		public int manufacturerId { get; set; }

		[Required(ErrorMessage = "Missing model name.")]
		[StringLength(50, ErrorMessage = "Model name can not be more than 50 chars.")]
		public string name { get; set; }

		[Required(ErrorMessage = "Missing model price.")]
		public decimal price { get; set; }

		[Required(ErrorMessage = "Missing model image name.")]
		[StringLength(100, ErrorMessage = "Model image name can not be more than 100 chars.")]
		public string imageName { get; set; }		
	}
}
