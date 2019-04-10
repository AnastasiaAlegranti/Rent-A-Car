using System.Collections.Generic;
using System.Linq;
using System.Web.Security;
#pragma warning disable 618//Desaible warnings

namespace RentACar
{
	public class UsersLogic : BaseLogic
	{
		public UserModel GetOneUser(int id)
		{
			return DB.Users
				.Where(u => u.UserID == id)
				.Select(u => new UserModel
				{
					userId = u.UserID,
					firstName = u.FirstName,
					lastName = u.LastName,
					username = u.UserName,
					password = u.Password,
					phone = u.Phone,
					email = u.Email,
					dateOfBirth = u.DateOfBirth,
					role = u.Role
				}).SingleOrDefault();
		}

		public OrderModel GetOneOrder(int id)
		{
			return DB.Orders
				.Where(o => o.OrderID == id)
				.Select(o => new OrderModel
				{
					orderId = o.OrderID,
					userId = o.UserID,
					carId = o.CarID,
					startDate = o.StartRentalDate,
					finishDate = o.EndRentalDate,
					totalCost = o.TotalRentalCost
				}).SingleOrDefault();
		}


		public List<DetailedOrderModel> GetAllOrdersByUser(int userId)
		{
			return DB.GetAllOrdersByUser(userId).Select(o => new DetailedOrderModel
			{
				userId = o.UserId,
				carId = o.CarId,
				modelId = o.ModelId,
				manufacturerId = o.ManufacturerID,
				manufacturerName = o.ManufacturerName,
				modelName = o.ModelName,
				modelImageName = o.ModelImageName,
				startDate = o.StartRentalDate,
				firstName = o.FirstName,
				lastName = o.LastName,
				finishDate = o.EndRentalDate,
				totalCost = o.TotalRentalCost,
				orderId = o.OrderID,
				orderDate = o.OrderDate
			}).OrderBy(o => o.orderDate).ToList();
		}

		public OrderModel AddOrder(OrderModel orderModel)
		{
			Order order = new Order
			{
				StartRentalDate = orderModel.startDate,
				EndRentalDate = orderModel.finishDate,
				UserID = orderModel.userId,
				CarID = orderModel.carId,
				TotalRentalCost = orderModel.totalCost,
				OrderDate = orderModel.orderDate
			};
			DB.Orders.Add(order);
			DB.SaveChanges();
			return GetOneOrder(order.OrderID);
		}

		public UserModel AddUser(UserModel userModel)
		{
			User user = new User
			{
				FirstName = userModel.firstName,
				LastName = userModel.lastName,
				UserName = userModel.username,
				Password = FormsAuthentication.HashPasswordForStoringInConfigFile(userModel.password, "sha1"),
				Phone = userModel.phone,
				Email = userModel.email,
				DateOfBirth = userModel.dateOfBirth,
				Role = userModel.role
			};
			DB.Users.Add(user);
			DB.SaveChanges();

			return GetOneUser(user.UserID);
		}


		public UserModel LogIn(CredentialsModel credentialsModel)
		{
			string hashPassword = FormsAuthentication.HashPasswordForStoringInConfigFile(credentialsModel.password, "sha1");
			UserModel user = DB.
				Users.
				Where(u => u.UserName == credentialsModel.username && u.Password == hashPassword).
				Select(u => new UserModel
				{
					userId = u.UserID,
					firstName = u.FirstName,
					lastName = u.LastName,
					username = u.UserName,
					password = u.Password,
					phone = u.Phone,
					email = u.Email,
					dateOfBirth = u.DateOfBirth,
					role = u.Role
				}).SingleOrDefault();
			return user;
		}
	}
}

