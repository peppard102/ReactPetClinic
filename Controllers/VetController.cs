using Microsoft.AspNetCore.Mvc;
using ReactPetClinic.Data;
using System.Threading.Tasks;
using System;

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
            try
            {
                var result = await _service.AddVet(vet);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // GET: api/Vet/GetAllVets
        [HttpGet("[action]")]
        public async Task<IActionResult> GetAllVets()
        {
            try
            {
                var result = await _service.GetAllVets();
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // GET: api/Vet/GetVetById/5
        [HttpGet("[action]/{id}")]
        public async Task<IActionResult> GetVetById(int id)
        {
            try
            {
                var result = await _service.GetVetById(id);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // PUT: api/Vet/UpdateVet
        [HttpPut("[action]")]
        public async Task<IActionResult> UpdateVet([FromBody]Vet value)
        {
            try
            {
                var result = await _service.UpdateVet(value);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // DELETE: api/Vet/DeleteVet/5
        [HttpDelete("[action]/{id}")]
        public async Task<IActionResult> DeleteVet(int id)
        {
            try
            {
                var result = await _service.DeleteVet(new Vet { Id = id });
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}