using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace RentACar
{
	[RoutePrefix("api")]
	[EnableCors("*", "*", "*")]
	public class SearchVehiclesController : ApiController
	{
		private SearchVehiclesLogic logic = new SearchVehiclesLogic();

		[HttpPost]
		[Route("search-vehicles")]
		public HttpResponseMessage GetAvailableCars(SearchCarModel searchModel)
		{
			try
			{
				if (!ModelState.IsValid)
				{
					return Request.CreateResponse(HttpStatusCode.BadRequest, ErrorsHelper.GetErrorModel(ModelState));
				}
				List<DetailedCarModel> allCars = logic.GetAvailableCarsBySearch(searchModel);
				return Request.CreateResponse(HttpStatusCode.OK, allCars);
			}
			catch (Exception ex)
			{
				return Request.CreateResponse(HttpStatusCode.InternalServerError,
					ErrorsHelper.GetErrorModel(ex));
			}
		}

	
		
		[HttpGet]
		[Route("manufacturers")]
		public HttpResponseMessage GetAllManufacturers()
		{
			try
			{
				List<ManufacturerModel> allManufacturers = logic.GetAllManufacturers();
				return Request.CreateResponse(HttpStatusCode.OK, allManufacturers);
			}
			catch (Exception ex)
			{
				return Request.CreateResponse(HttpStatusCode.InternalServerError,
					ErrorsHelper.GetErrorModel(ex));
			}
		}

		[HttpGet]
		[Route("models/{manufacturerId}")]
		public HttpResponseMessage GetAllModelsByManufacturer(int manufacturerId)
		{
			try
			{
				List<ModelModel> allModels = logic.GetAllModelsByManufacturer(manufacturerId);
				return Request.CreateResponse(HttpStatusCode.OK, allModels);
			}
			catch (Exception ex)
			{
				return Request.CreateResponse(HttpStatusCode.InternalServerError,
					ErrorsHelper.GetErrorModel(ex));
			}
		}

		[HttpGet]
		[Route("ordered-dates/{carId}")]
		public HttpResponseMessage GetBookedDates(int carId)
		{
			try
			{
				List<DateTime?> allBookedDates =logic.GetBookedDates(carId);
				return Request.CreateResponse(HttpStatusCode.OK, allBookedDates);
			}
			catch (Exception ex)
			{
				return Request.CreateResponse(HttpStatusCode.InternalServerError,
					ErrorsHelper.GetErrorModel(ex));
			}
		}

		[HttpPost]
		[Route("search-car")]
		public HttpResponseMessage GetOneCar(SearchCarModel searchModel)
		{
			try
			{
				if (!ModelState.IsValid)
				{
					return Request.CreateResponse(HttpStatusCode.BadRequest, ErrorsHelper.GetErrorModel(ModelState));
				}
				DetailedCarModel car = logic.GetOneCarBySearch(searchModel);
				return Request.CreateResponse(HttpStatusCode.OK, car);
			}
			catch (Exception ex)
			{
				return Request.CreateResponse(HttpStatusCode.InternalServerError,
					ErrorsHelper.GetErrorModel(ex));
			}
		}
	}
}
