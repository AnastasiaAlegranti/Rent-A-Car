using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using System.IO;
using System.Web;

namespace RentACar
{
	[RoutePrefix("api/admin")]
	[EnableCors("*", "*", "*")]
	public class AdminsController : ApiController
	{
		private AdminsLogic logic = new AdminsLogic();
		public static readonly object LockObject = new object();

		[HttpPost]
		[Route("orders")]
		public HttpResponseMessage GetAllOrdersByAdmin(SearchOrderModel searchOrderModel)
		{
			try
			{
				if (!ModelState.IsValid)
				{
					return Request.CreateResponse(HttpStatusCode.BadRequest, ErrorsHelper.GetErrorModel(ModelState));
				}
				List<DetailedOrderModel> orders = logic.GetAllOrdersByAdmin(searchOrderModel);
				return Request.CreateResponse(HttpStatusCode.OK, orders);
			}
			catch (Exception ex)
			{
				return Request.CreateResponse(HttpStatusCode.InternalServerError, ErrorsHelper.GetErrorModel(ex));
			}
		}

		[HttpGet]
		[Route("users")]
		public HttpResponseMessage GetAllUsers()
		{
			try
			{
				if (!ModelState.IsValid)
				{
					return Request.CreateResponse(HttpStatusCode.BadRequest, ErrorsHelper.GetErrorModel(ModelState));
				}
				List<UserModel> users = logic.GetAllUsers();
				return Request.CreateResponse(HttpStatusCode.OK, users);
			}
			catch (Exception ex)
			{
				return Request.CreateResponse(HttpStatusCode.InternalServerError, ErrorsHelper.GetErrorModel(ex));
			}
		}

		[HttpGet]
		[Route("all-cars/{modelId}")]
		public HttpResponseMessage GetAllCarsByModel(int modelId)
		{
			try
			{
				List<CarModel> allcars = logic.GetAllCarsByModel(modelId);
				return Request.CreateResponse(HttpStatusCode.OK, allcars);
			}
			catch (Exception ex)
			{
				return Request.CreateResponse(HttpStatusCode.InternalServerError,
					ErrorsHelper.GetErrorModel(ex));
			}
		}

		[HttpGet]
		[Route("manufacturers/{manufacturerId}")]
		public HttpResponseMessage GetOneManufacturer(int manufacturerId)
		{
			try
			{
				ManufacturerModel manufacturer = logic.GetOneManufacturer(manufacturerId);
				return Request.CreateResponse(HttpStatusCode.OK, manufacturer);
			}
			catch (Exception ex)
			{
				return Request.CreateResponse(HttpStatusCode.InternalServerError,
					ErrorsHelper.GetErrorModel(ex));
			}
		}

		[HttpPost]
		[Route("manufacturers")]
		public HttpResponseMessage AddManufacturer(ManufacturerModel manufacturerModel)
		{
			try
			{
				if (!ModelState.IsValid)
				{
					return Request.CreateResponse(HttpStatusCode.BadRequest, ErrorsHelper.GetErrorModel(ModelState));
				}
				ManufacturerModel addedManufacturer = logic.AddManufacturer(manufacturerModel);
				return Request.CreateResponse(HttpStatusCode.Created, addedManufacturer);

			}
			catch (Exception ex)
			{
				return Request.CreateResponse(HttpStatusCode.InternalServerError, ErrorsHelper.GetErrorModel(ex));
			}
		}

		[HttpPut]
		[Route("manufacturers/{id}")]
		public HttpResponseMessage UpdateManufacturer(int id, ManufacturerModel manufacturerModel)
		{
			try
			{
				if (!ModelState.IsValid)
				{
					return Request.CreateResponse(HttpStatusCode.BadRequest, ErrorsHelper.GetErrorModel(ModelState));
				}
				manufacturerModel.id = id;
				ManufacturerModel updatedManufacturer = logic.UpdateManufacturer(manufacturerModel);
				return Request.CreateResponse(HttpStatusCode.OK, updatedManufacturer);

			}
			catch (Exception ex)
			{
				return Request.CreateResponse(HttpStatusCode.InternalServerError, ErrorsHelper.GetErrorModel(ex));
			}
		}

		[HttpDelete]
		[Route("manufacturers/{id}")]
		public HttpResponseMessage DeleteManufacturer(int id)
		{
			try
			{
				logic.DeleteManufacturer(id);
				return Request.CreateResponse(HttpStatusCode.NoContent);
			}
			catch (Exception ex)
			{
				return Request.CreateResponse(HttpStatusCode.InternalServerError, ErrorsHelper.GetErrorModel(ex));
			}
		}
		[HttpGet]
		[Route("models/{modelId}")]
		public HttpResponseMessage GetOneModel(int modelId)
		{
			try
			{
				ModelModel manufacturer = logic.GetOneModel(modelId);
				return Request.CreateResponse(HttpStatusCode.OK, manufacturer);
			}
			catch (Exception ex)
			{
				return Request.CreateResponse(HttpStatusCode.InternalServerError,
					ErrorsHelper.GetErrorModel(ex));
			}
		}

		[HttpPost]
		[Route("models")]
		public HttpResponseMessage AddModel(ModelModel modelModel)
		{
			try
			{
				if (!ModelState.IsValid)
				{
					return Request.CreateResponse(HttpStatusCode.BadRequest, ErrorsHelper.GetErrorModel(ModelState));
				}
				ModelModel addedModel = logic.AddModel(modelModel);
				return Request.CreateResponse(HttpStatusCode.Created, addedModel);
			}
			catch (Exception ex)
			{
				ErrorModel allErrors = ErrorsHelper.GetErrorModel(ex);
				try
				{
					//If model has not been added, delete image file .
					File.Delete(HttpContext.Current.Server.MapPath("~/assets/images/" + modelModel.imageName));
				}
				catch (Exception ex2)
				{
					ErrorModel deleteImageErrors = ErrorsHelper.GetErrorModel(ex2);
					//If errors occured in deleting image file, add that errors to errors array
					foreach (var item in deleteImageErrors.errors)
					{
						allErrors.errors.Add(item);
					}					
				}
				return Request.CreateResponse(HttpStatusCode.InternalServerError, allErrors);
			}
		}

		[HttpPut]
		[Route("models/{id}")]
		public HttpResponseMessage UpdateModel(int id, ModelModel modelModel)
		{
			try
			{
				if (!ModelState.IsValid)
				{
					return Request.CreateResponse(HttpStatusCode.BadRequest, ErrorsHelper.GetErrorModel(ModelState));
				}
				string previousImageFile = HttpContext.Current.Server.MapPath("~/assets/images/" + logic.GetModelImageName(id));
				modelModel.id = id;

				ModelModel updatedModel;
				lock (LockObject)//delete previous image file if model was updated
				{
					updatedModel = logic.UpdateModel(modelModel);
					File.Delete(previousImageFile);
				}
				return Request.CreateResponse(HttpStatusCode.OK, updatedModel);
			}
			catch (Exception ex)
			{
				ErrorModel allErrors = ErrorsHelper.GetErrorModel(ex);
				try
				{
					//If model has not been updated, delete new image file .
					File.Delete(HttpContext.Current.Server.MapPath("~/assets/images/" + modelModel.imageName));
				}
				catch (Exception ex2)
				{
					ErrorModel deleteImageErrors = ErrorsHelper.GetErrorModel(ex2);
					//If errors occured in deleting image file, add that errors to errors array
					foreach (var item in deleteImageErrors.errors)
					{
						allErrors.errors.Add(item);
					}
				}
				return Request.CreateResponse(HttpStatusCode.InternalServerError, allErrors);
			}
		}

		[HttpDelete]
		[Route("models/{id}")]
		public HttpResponseMessage DeleteModel(int id)
		{
			try
			{
				string imageFile = HttpContext.Current.Server.MapPath("~/assets/images/" + logic.GetModelImageName(id));
				lock (LockObject)//Delete Model only if image file also deleted.
				{
					logic.DeleteModel(id);
					File.Delete(imageFile);//Deletes image file from server
				}

				return Request.CreateResponse(HttpStatusCode.NoContent);
			}
			catch (Exception ex)
			{
				return Request.CreateResponse(HttpStatusCode.InternalServerError, ErrorsHelper.GetErrorModel(ex));
			}
		}

		[HttpPost]
		[Route("models/image")]
		public HttpResponseMessage SaveImage()
		{
			try
			{
				// Get full path and file name to assets/images: 
				string fileName = Guid.NewGuid() + ".jpg";

				string fullPath = HttpContext.Current.Server.MapPath("~/assets/images/" + fileName);
				//Add image file to directory
				using (var stream = new FileStream(fullPath, FileMode.Create))
				{
					HttpContext.Current.Request.InputStream.CopyTo(stream);
				}
				return Request.CreateResponse(HttpStatusCode.Created, fileName);
			}
			catch (Exception ex)
			{
				return Request.CreateResponse(HttpStatusCode.InternalServerError, ErrorsHelper.GetErrorModel(ex));
			}
		}

		[HttpGet]
		[Route("models")]
		public HttpResponseMessage GetAllModels()
		{
			try
			{
				List<ModelModel> allModels = logic.GetAllModels();
				return Request.CreateResponse(HttpStatusCode.OK, allModels);
			}
			catch (Exception ex)
			{
				return Request.CreateResponse(HttpStatusCode.InternalServerError,
					ErrorsHelper.GetErrorModel(ex));
			}
		}

		[HttpPost]
		[Route("cars")]
		public HttpResponseMessage AddCar(CarModel fleetOfCarModel)
		{
			try
			{
				if (!ModelState.IsValid)
				{
					return Request.CreateResponse(HttpStatusCode.BadRequest, ErrorsHelper.GetErrorModel(ModelState));
				}
				CarModel addedCar = logic.AddCar(fleetOfCarModel);
				return Request.CreateResponse(HttpStatusCode.Created, addedCar);

			}
			catch (Exception ex)
			{
				return Request.CreateResponse(HttpStatusCode.InternalServerError, ErrorsHelper.GetErrorModel(ex));
			}
		}

		[HttpPut]
		[Route("cars/{id}")]
		public HttpResponseMessage UpdateCar(int id, CarModel fleetOfCarModel)
		{
			try
			{
				if (!ModelState.IsValid)
				{
					return Request.CreateResponse(HttpStatusCode.BadRequest, ErrorsHelper.GetErrorModel(ModelState));
				}
				fleetOfCarModel.id = id;
				CarModel updatedCar = logic.UpdateCar(fleetOfCarModel);
				return Request.CreateResponse(HttpStatusCode.OK, updatedCar);
			}
			catch (Exception ex)
			{
				return Request.CreateResponse(HttpStatusCode.InternalServerError, ErrorsHelper.GetErrorModel(ex));
			}
		}

		[HttpDelete]
		[Route("cars/{id}")]
		public HttpResponseMessage DeleteCar(int id)
		{
			try
			{
				logic.DeleteCar(id);
				return Request.CreateResponse(HttpStatusCode.NoContent);
			}
			catch (Exception ex)
			{
				return Request.CreateResponse(HttpStatusCode.InternalServerError, ErrorsHelper.GetErrorModel(ex));
			}
		}

		[HttpGet]
		[Route("cars/{carId}")]
		public HttpResponseMessage GetOneCar(int carId)
		{
			try
			{
				CarModel car = logic.GetOneCar(carId);
				return Request.CreateResponse(HttpStatusCode.OK, car);
			}
			catch (Exception ex)
			{
				return Request.CreateResponse(HttpStatusCode.InternalServerError,
					ErrorsHelper.GetErrorModel(ex));
			}
		}

		[HttpGet]
		[Route("cars")]
		public HttpResponseMessage GetAllCars()
		{
			try
			{
				List<CarModel> allCars = logic.GetAllCars();
				return Request.CreateResponse(HttpStatusCode.OK, allCars);
			}
			catch (Exception ex)
			{
				return Request.CreateResponse(HttpStatusCode.InternalServerError,
					ErrorsHelper.GetErrorModel(ex));
			}
		}
	}
}
