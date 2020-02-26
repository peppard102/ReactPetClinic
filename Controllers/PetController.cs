using Microsoft.AspNetCore.Mvc;
using ReactPetClinic.Data;
using System.Threading.Tasks;
using System;

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
            try
            {
                var result = await _service.AddPet(pet);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // GET: api/Pet/GetAllPets
        [HttpGet("[action]")]
        public async Task<IActionResult> GetAllPets()
        {
            try
            {
                var result = await _service.GetAllPets();
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // GET: api/Pet/GetAllSpecies
        [HttpGet("[action]")]
        public async Task<IActionResult> GetAllSpecies()
        {
            try
            {
                var result = await _service.GetAllSpecies();
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // GET: api/Pet/GetPetById/5
        [HttpGet("[action]/{id}")]
        public async Task<IActionResult> GetPetById(int id)
        {
            try
            {
                var result = await _service.GetPetById(id);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // PUT: api/Pet/UpdatePet
        [HttpPut("[action]")]
        public async Task<IActionResult> UpdatePet([FromBody]Pet value)
        {
            try
            {
                var result = await _service.UpdatePet(value);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // DELETE: api/Pet/DeletePet/5
        [HttpDelete("[action]/{id}")]
        public async Task<IActionResult> DeletePet(int id)
        {
            try
            {
                var result = await _service.DeletePet(new Pet { Id = id });
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}