using Microsoft.AspNetCore.Mvc;
using ReactPetClinic.Data;
using System.Threading.Tasks;

namespace ReactPetClinic.Controllers
{
    [Route("api/[controller]")]
    public class VetController : Controller
    {
        private IVetService _service;
        public VetController(IVetService service)
        {
            this._service = service;
        }

        // POST: api/Vet/AddVet
        [HttpPost("[action]")]
        public async Task<IActionResult> AddVet([FromBody]Vet vet)
        {
            var result = await _service.AddVet(vet);
            return Ok(result);
        }

        // GET: api/Vet/GetAllVets
        [HttpGet("[action]")]
        public async Task<IActionResult> GetAllVets()
        {
            var result = await _service.GetAllVets();
            return Ok(result);
        }

        // GET: api/Vet/GetVetById/5
        [HttpGet("[action]/{id}")]
        public async Task<IActionResult> GetVetById(int id)
        {
            var result = await _service.GetVetById(id);
            return Ok(result);
        }

        // PUT: api/Vet/UpdateVet
        [HttpPut("[action]")]
        public async Task<IActionResult> UpdateVet([FromBody]Vet value)
        {
            var result = await _service.UpdateVet(value);
            return Ok(result);
        }

        // DELETE: api/Vet/DeleteVet/5
        [HttpDelete("[action]/{id}")]
        public async Task<IActionResult> DeleteVet(int id)
        {
            var result = await _service.DeleteVet(new Vet { Id = id });
            return Ok(result);
        }
    }
}