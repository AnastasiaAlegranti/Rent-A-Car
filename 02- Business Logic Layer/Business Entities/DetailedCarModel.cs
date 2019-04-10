using System;

namespace RentACar
{
	public class DetailedCarModel:CarModel
	{
		public DateTime? startDate { get; set; }
		public DateTime? finishDate { get; set; }
		public int? numberOfDays { get; set; }
		public decimal? totalCost { get; set; }
		public string manufacturerName { get; set; }
		public string modelName { get; set; }
		public string modelImageName { get; set; }
		public decimal modelPrice { get; set; }
	}
}
