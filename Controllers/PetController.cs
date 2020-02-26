using Microsoft.AspNetCore.Mvc;
using ReactPetClinic.Data;
using System.Threading.Tasks;

namespace ReactPetClinic.Controllers
{
    [Route("api/[controller]")]
    public class PetController : Controller
    {
        private IPetService _service;
        public PetController(IPetService service)
        {
            this._service = service;
        }

        // POST: api/Pet/AddPet
        [HttpPost("[action]")]
        public async Task<IActionResult> AddPet([FromBody]Pet pet)
        {
            var result = await _service.AddPet(pet);
            return Ok(result);
        }

        // GET: api/Pet/GetAllPets
        [HttpGet("[action]")]
        public async Task<IActionResult> GetAllPets()
        {
            var result = await _service.GetAllPets();
            return Ok(result);
        }

        // GET: api/Pet/GetPetById/5
        [HttpGet("[action]/{id}")]
        public async Task<IActionResult> GetPetById(int id)
        {
            var result = await _service.GetPetById(id);
            return Ok(result);
        }

        // PUT: api/Pet/UpdatePet
        [HttpPut("[action]")]
        public async Task<IActionResult> UpdatePet([FromBody]Pet value)
        {
            var result = await _service.UpdatePet(value);
            return Ok(result);
        }

        // DELETE: api/Pet/DeletePet/5
        [HttpDelete("[action]/{id}")]
        public async Task<IActionResult> DeletePet(int id)
        {
            var result = await _service.DeletePet(new Pet { Id = id });
            return Ok(result);
        }
    }
}