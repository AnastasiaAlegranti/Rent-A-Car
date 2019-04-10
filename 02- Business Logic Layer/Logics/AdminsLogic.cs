using System.Collections.Generic;
using System.Linq;

namespace RentACar
{
	public class AdminsLogic : BaseLogic
	{
		public List<DetailedOrderModel> GetAllOrdersByAdmin(SearchOrderModel searchOrderModel)
		{
			return DB.GetAllOrdersByAdmin(searchOrderModel.manufacturerId, searchOrderModel.modelId, searchOrderModel.carId, searchOrderModel.userId).Select(o => new DetailedOrderModel
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
			}).OrderBy(o => o.orderId).ToList();
		}

		public List<UserModel> GetAllUsers()
		{
			return DB.Users.Select(u => new UserModel
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
			}).OrderBy(u => u.lastName).ThenBy(u => u.firstName).ToList();
		}

		public List<CarModel> GetAllCarsByModel(int modelId)
		{
			return DB.Cars.Where(c => c.ModelID == modelId).Select(c => new CarModel
			{
				id = c.CarID,
				modelId = c.ModelID,
				licenseNumber = c.CarLicenseNumber
			}).ToList();
		}

		public ManufacturerModel AddManufacturer(ManufacturerModel manufacturerModel)
		{
			Manufacturer manufacturer = new Manufacturer
			{
				ManufacturerName = manufacturerModel.name
			};
			DB.Manufacturers.Add(manufacturer);
			DB.SaveChanges();
			return GetOneManufacturer(manufacturer.ManufacturerID);
		}

		public ManufacturerModel GetOneManufacturer(int id)
		{
			return DB.Manufacturers
				.Where(m => m.ManufacturerID == id)
				.Select(m => new ManufacturerModel
				{
					id = m.ManufacturerID,
					name = m.ManufacturerName
				}).SingleOrDefault();
		}

		public ManufacturerModel UpdateManufacturer(ManufacturerModel manufacturerModel)
		{
			Manufacturer manufacturer = DB.Manufacturers
				.Where(m => m.ManufacturerID == manufacturerModel.id
				).SingleOrDefault();
			if (manufacturer == null)
				return null;
			manufacturer.ManufacturerName = manufacturerModel.name;
			DB.SaveChanges();
			return GetOneManufacturer(manufacturer.ManufacturerID);
		}

		public void DeleteManufacturer(int id)
		{
			Manufacturer manufacturer = DB.Manufacturers.Where(m => m.ManufacturerID == id).SingleOrDefault();
			if (manufacturer == null)
				return;
			DB.Manufacturers.Remove(manufacturer);
			DB.SaveChanges();
		}

		public ModelModel AddModel(ModelModel modelModel)
		{
			Model model = new Model
			{
				ModelName = modelModel.name,
				ManufacturerID = modelModel.manufacturerId,
				ModelPrice = modelModel.price,
				ModelImageName = modelModel.imageName
			};
			DB.Models.Add(model);
			DB.SaveChanges();
			return GetOneModel(model.ModelID);
		}

		public ModelModel GetOneModel(int id)
		{
			return DB.Models
				.Where(m => m.ModelID == id)
				.Select(m => new ModelModel
				{
					id = m.ModelID,
					name = m.ModelName,
					manufacturerId = m.ManufacturerID,
					price = m.ModelPrice,
					imageName = m.ModelImageName
				}).SingleOrDefault();
		}

		public ModelModel UpdateModel(ModelModel modelModel)
		{
			Model model = DB.Models
				.Where(m => m.ModelID == modelModel.id
				).SingleOrDefault();
			if (model == null)
				return null;
			model.ModelName = modelModel.name;
			modelModel.manufacturerId = modelModel.manufacturerId;
			model.ModelPrice = modelModel.price;
			model.ModelImageName = modelModel.imageName;
			DB.SaveChanges();
			return GetOneModel(model.ModelID);
		}

		public string GetModelImageName(int id)
		{
		return DB.Models
				.Where(m => m.ModelID ==id
				).SingleOrDefault().ModelImageName;
		}


		public void DeleteModel(int id)
		{
			Model model = DB.Models.Where(m => m.ModelID == id).SingleOrDefault();
			if (model == null)
				return;
			DB.Models.Remove(model);
			DB.SaveChanges();
		}

		public List<ModelModel> GetAllModels()
		{
			return DB.Models.Select(m => new ModelModel
			{
				id = m.ModelID,
				name = m.ModelName,
				manufacturerId = m.ManufacturerID,
				imageName = m.ModelImageName,
				price = m.ModelPrice
			}).ToList();
		}

		public CarModel AddCar(CarModel fleetOfCarModel)
		{
			Car car = new Car
			{
				ModelID = fleetOfCarModel.modelId,
				CarLicenseNumber = fleetOfCarModel.licenseNumber
			};
			DB.Cars.Add(car);
			DB.SaveChanges();
			return GetOneCar(car.CarID);
		}

		public CarModel GetOneCar(int id)
		{
			return DB.Cars
				.Where(f => f.CarID == id)
				.Select(f => new CarModel
				{
					id = f.ModelID,
					modelId = f.ModelID,
					licenseNumber = f.CarLicenseNumber
				}).SingleOrDefault();
		}

		public CarModel UpdateCar(CarModel carModel)
		{
			Car car = DB.Cars
				.Where(f => f.CarID == carModel.id
				).SingleOrDefault();
			if (car == null)
				return null;
			car.ModelID = carModel.modelId;
			car.CarLicenseNumber = carModel.licenseNumber;
			DB.SaveChanges();
			return GetOneCar(car.CarID);
		}

		public void DeleteCar(int id)
		{
			Car car = DB.Cars.Where(f => f.CarID == id).SingleOrDefault();
			if (car == null)
				return;
			DB.Cars.Remove(car);
			DB.SaveChanges();
		}
		public List<CarModel> GetAllCars()
		{
			return DB.Cars.Select(c => new CarModel
			{
				id = c.CarID,
				modelId = c.ModelID,
				licenseNumber = c.CarLicenseNumber,
			}).ToList();
		}
	}
}
