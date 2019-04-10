using System;
using System.ComponentModel.DataAnnotations;

namespace RentACar
{
	public class OrderModel
	{
		public int orderId { get; set; }

		[Required(ErrorMessage = "Missing car ID.")]
		public int carId { get; set; }

		[Required(ErrorMessage = "Missing user ID.")]
		public int userId { get; set; }

		[Required(ErrorMessage = "Missing start date.")]
		[DateToOrder(ErrorMessage = "Invalid start date")]
		public DateTime startDate { get; set; }

		[Required(ErrorMessage = "Missing end date.")]
		[DateToOrder(ErrorMessage = "Invalid start date")]
		public DateTime finishDate { get; set; }

		[Required(ErrorMessage = "Missing total cost.")]
		public decimal totalCost { get; set; }

		[Required(ErrorMessage = "Missing order date.")]
		[DateToOrder(ErrorMessage = "Invalid order date")]
		public DateTime orderDate { get; set; }
	}
}
