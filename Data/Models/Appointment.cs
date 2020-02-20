using Dapper.Contrib.Extensions;
using System;

namespace ReactPetClinic.Data
{
    [Table("Appointment")] // Tell Dapper which table to use
    public class Appointment
    {
        [Key] // Tell Dapper that this is the primary key in the DB table
        public int Id { get; set; }

        public int PetId { get; set; }

        public int VetId { get; set; }

        public DateTime StartTime { get; set; }

        public DateTime EndTime { get; set; }
    }
}
