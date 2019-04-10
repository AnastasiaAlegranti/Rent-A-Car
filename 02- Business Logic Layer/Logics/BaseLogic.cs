using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RentACar
{
	public class BaseLogic : IDisposable
	{
		internal RentalCarEntities DB = new RentalCarEntities();//internal and not protected because IsUserNameValidAttribute use DB.
		public void Dispose()
		{
			DB.Dispose();
		}
	}
}
