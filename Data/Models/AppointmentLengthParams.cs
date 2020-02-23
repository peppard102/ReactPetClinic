using Dapper.Contrib.Extensions;
using System;

namespace ReactPetClinic.Data
{
    public class AppointmentLengthParams
    {
        public int VetId { get; set; }
         public DateTime Date { get; set; }
         public int LengthOfAppt { get; set; }
    }
}
