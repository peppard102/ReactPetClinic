using Dapper.Contrib.Extensions;
using System;

namespace ReactPetClinic.Data
{
    [Table("AppointmentLengthOptions")] // Tell Dapper which table to use
    public class AppointmentLengthOptions
    {
        [Key] // Tell Dapper that this is the primary key in the DB table
        public int LengthInMinutes { get; set; }
    }
}
