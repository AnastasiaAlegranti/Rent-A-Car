using System;
using System.Collections.Generic;
using System.Linq;

namespace RentACar
{
	public class SearchVehiclesLogic : BaseLogic
	{
		public List<DateTime?> GetBookedDates(int carId)
		{
			List<DateTime?> bookedDates = DB.GetBookedDatesFromTodayByCar(carId).ToList();
			return bookedDates;
		}

		public List<DetailedCarModel> GetAvailableCarsBySearch(SearchCarModel searchCarModel)
		{
			return DB.GetAvailableCarsBySearch(searchCarModel.startDate, searchCarModel.finishDate, searchCarModel.manufacturerId, searchCarModel.modelId, searchCarModel.carId).Select(c => new DetailedCarModel
			{
				id = c.CarID,
				startDate = searchCarModel.startDate,
				finishDate = searchCarModel.finishDate,
				modelId =c.ModelID,
				modelName = c.ModelName,
				manufacturerName = c.ManufacturerName,
				modelImageName = c.ModelImageName,
				licenseNumber = c.CarLicenseNumber,
				modelPrice = c.ModelPrice,
				numberOfDays = c.numberOfDays,
				totalCost = Convert.ToDecimal(c.ModelPrice * c.numberOfDays)
			}).ToList();
		}

		public List<ManufacturerModel> GetAllManufacturers()
		{
			return DB.Manufacturers.Select(m => new ManufacturerModel
			{
				id = m.ManufacturerID,
				name = m.ManufacturerName
			}).ToList();
		}

		public List<ModelModel> GetAllModelsByManufacturer(int manufacturerId)
		{
			return DB.Models.Where(m=>m.ManufacturerID==manufacturerId).Select(m => new ModelModel
			{
				id = m.ModelID,
				name = m.ModelName,
				manufacturerId = m.ManufacturerID,
				price = m.ModelPrice,
				imageName = m.ModelImageName
			}).ToList();
		}


		//This function is only for convenience in ClientSide,  of having one object and treating it as one, rather than an array.
		public DetailedCarModel GetOneCarBySearch(SearchCarModel searchCarModel)
		{
			return DB.GetAvailableCarsBySearch(searchCarModel.startDate, searchCarModel.finishDate, searchCarModel.manufacturerId, searchCarModel.modelId, searchCarModel.carId).Select(c => new DetailedCarModel
			{
				startDate = searchCarModel.startDate,
				finishDate = searchCarModel.finishDate,
				id = c.CarID,
				modelId=c.ModelID,
				modelName = c.ModelName,
				manufacturerName = c.ManufacturerName,
				modelImageName = c.ModelImageName,
				licenseNumber = c.CarLicenseNumber,
				modelPrice = c.ModelPrice,				
				numberOfDays = c.numberOfDays,
				totalCost = Convert.ToDecimal(c.ModelPrice * c.numberOfDays)
			}).SingleOrDefault();
		}
	}
}
