namespace RentACar
{
	public class DetailedOrderModel : OrderModel
	{
		public int manufacturerId { get; set; }
		public int modelId { get; set; }
		public string manufacturerName { get; set; }
		public string modelName { get; set; }
		public string modelImageName { get; set; }
		public string firstName { get; set; }
		public string lastName { get; set; }
	}
}
