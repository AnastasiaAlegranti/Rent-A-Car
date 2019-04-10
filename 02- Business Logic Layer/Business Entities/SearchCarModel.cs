using System;

namespace RentACar
{
	public class SearchCarModel
	{
		[DateForSearch(ErrorMessage = "Invalid date1")]
		public DateTime? startDate { get; set; }

		[DateForSearch(ErrorMessage = "Invalid date2")]
		public DateTime? finishDate { get; set; }

		public int? manufacturerId { get; set; }
		public int? modelId { get; set; }
		public int? carId { get; set; }
	}
}
