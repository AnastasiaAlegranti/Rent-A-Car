//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace RentACar
{
    using System;
    using System.Collections.Generic;
    
    public partial class ContactUsMessage
    {
        public int ContactUsID { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string Message { get; set; }
        public string Subject { get; set; }
        public System.DateTime MessageDate { get; set; }
        public Nullable<int> UserId { get; set; }
    
        public virtual ContactUsMessage ContactUsMessages1 { get; set; }
        public virtual ContactUsMessage ContactUsMessage1 { get; set; }
    }
}
