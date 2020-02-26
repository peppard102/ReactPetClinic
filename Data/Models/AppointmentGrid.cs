using Dapper.Contrib.Extensions;
using System;

namespace ReactPetClinic.Data
{
    public class AppointmentGrid
    {
        public int Id { get; set; }
        public string VetFirstName { get; set; }
        public string VetLastName { get; set; }
        public string PetName { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public string SpeciesName { get; set; }
        public string Allergies { get; set; }
    }
}
