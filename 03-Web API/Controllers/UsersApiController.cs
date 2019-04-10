using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace RentACar
{
	[RoutePrefix("api")]
	[EnableCors("*","*","*")]
	public class UsersApiController : ApiController
	{
		private UsersLogic logic = new UsersLogic();
	
		[HttpPost]
		[Route("login")]
		public HttpResponseMessage LogIn(CredentialsModel credentialsModel)
		{
			try
			{
				if (!ModelState.IsValid)
				{
					return Request.CreateResponse(HttpStatusCode.BadRequest, ErrorsHelper.GetErrorModel(ModelState));
				}
				UserModel userModel = logic.LogIn(credentialsModel);
				return Request.CreateResponse(HttpStatusCode.OK, userModel);
			}
			catch (Exception ex)
			{
				return Request.CreateResponse(HttpStatusCode.InternalServerError, ErrorsHelper.GetErrorModel(ex));
			}
		}

		[HttpPost]
		[Route("register")]
		public HttpResponseMessage Register(UserModel userModel)
		{
			try {
			if (!ModelState.IsValid)
			{
				return Request.CreateResponse(HttpStatusCode.BadRequest, ErrorsHelper.GetErrorModel(ModelState));
			}
			UserModel addedUser= logic.AddUser(userModel);
			return Request.CreateResponse(HttpStatusCode.Created, addedUser);
			}
			catch (Exception ex)
			{
				return Request.CreateResponse(HttpStatusCode.InternalServerError, ErrorsHelper.GetErrorModel(ex));
			}
		}

		[HttpPost]
		[Route("orders")]
		public HttpResponseMessage AddOrder(OrderModel orderModel)
		{
			try
			{
				if (!ModelState.IsValid)
				{
					return Request.CreateResponse(HttpStatusCode.BadRequest, ErrorsHelper.GetErrorModel(ModelState));
				}
				OrderModel addedOrder = logic.AddOrder(orderModel);
				return Request.CreateResponse(HttpStatusCode.OK, addedOrder);
			}
			catch (Exception ex)
			{
				return Request.CreateResponse(HttpStatusCode.InternalServerError, ErrorsHelper.GetErrorModel(ex));
			}
		}

		[HttpGet]
		[Route("my-orders/{userId}")]
		public HttpResponseMessage GetOrdersByUser(int userId)
		{
			try
			{
				if (!ModelState.IsValid)
				{
					return Request.CreateResponse(HttpStatusCode.BadRequest, ErrorsHelper.GetErrorModel(ModelState));
				}
				List<DetailedOrderModel> orders = logic.GetAllOrdersByUser(userId);
				return Request.CreateResponse(HttpStatusCode.OK, orders);
			}
			catch (Exception ex)
			{
				return Request.CreateResponse(HttpStatusCode.InternalServerError, ErrorsHelper.GetErrorModel(ex));
			}
		}
	}
}
