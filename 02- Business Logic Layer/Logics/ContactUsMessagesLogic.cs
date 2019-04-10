using System.Linq;

namespace RentACar
{
	public class ContactUsMessagesLogic : BaseLogic
	{
		public ContactUsMessageModel AddContactUs(ContactUsMessageModel contactUsMessageModel)
		{
			ContactUsMessage contactUsMessage = new ContactUsMessage
			{
				FirstName = contactUsMessageModel.firstName,
				LastName = contactUsMessageModel.lastName,
				Email = contactUsMessageModel.email,
				Phone = contactUsMessageModel.phone,
				Message = contactUsMessageModel.message,
				Subject = contactUsMessageModel.subject,
				MessageDate=contactUsMessageModel.messageDate,
				UserId=contactUsMessageModel.userId
			};
			DB.ContactUsMessages.Add(contactUsMessage);
			DB.SaveChanges();
			return GetOneContactUsMessage(contactUsMessage.ContactUsID);
		}

		private ContactUsMessageModel GetOneContactUsMessage(int id)
		{
			return DB.ContactUsMessages
				.Where(c => c.ContactUsID == id)
				.Select(c => new ContactUsMessageModel
				{
					contactUsID = c.ContactUsID,
					firstName = c.FirstName,
					lastName = c.LastName,
					email = c.Email,
					phone = c.Phone,
					message = c.Message,
					subject = c.Subject,
					messageDate=c.MessageDate,
					userId=c.UserId
				}).SingleOrDefault();
		}
	}
}
