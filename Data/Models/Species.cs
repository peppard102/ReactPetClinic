using Dapper.Contrib.Extensions;

namespace ReactPetClinic.Data
{
    [Table("Species")] // Tell Dapper which table to use
    public class Species
    {
        [Key] // Tell Dapper that this is the primary key in the DB table
        public int SpeciesId { get; set; }
        public string SpeciesName { get; set; }
    }
}
