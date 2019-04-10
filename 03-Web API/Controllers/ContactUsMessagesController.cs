using RentACar.Helper;
using System;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace RentACar
{
    public class ContactUsMessagesController : ApiController
    {

		[EnableCors("*", "*", "*")]
		[RoutePrefix("api")]
		public class ContactUsMessagesApiController : ApiController
		{
			private ContactUsMessagesLogic logic = new ContactUsMessagesLogic();

			[HttpPost]
			[Route("contact-us")]
			public HttpResponseMessage AddContactUsMessage(ContactUsMessageModel contactUsMessageModel)
			{
				try
				{
					if (!ModelState.IsValid)
					{
						return Request.CreateResponse(HttpStatusCode.BadRequest, ErrorsHelper.GetErrorModel(ModelState));
					}

					ContactUsMessageModel addedContactUsMessageModel = logic.AddContactUs(contactUsMessageModel);


					Email.Send("New Contact Us!", contactUsMessageModel.ToString());

					return Request.CreateResponse(HttpStatusCode.Created, addedContactUsMessageModel);
				}
				catch (Exception ex)
				{
					return Request.CreateResponse(HttpStatusCode.InternalServerError, ErrorsHelper.GetErrorModel(ex));
				}
			}
		}
	}
}
