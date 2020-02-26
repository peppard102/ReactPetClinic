using System;
using Microsoft.AspNetCore.Mvc;
using ReactPetClinic.Data;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ReactPetClinic.Controllers
{
    [Route("api/[controller]")]
    public class AppointmentController : Controller
    {
        private IAppointmentService _service;
        public AppointmentController(IAppointmentService service)
        {
            this._service = service;
        }

        // GET: api/Appointment/GetAllAppointments
        [HttpGet("[action]")]
        public async Task<IActionResult> GetAllAppointments()
        {
            try
            {
                // throw new Exception();
                var result = await _service.GetAllAppointments();
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // GET: api/Appointment/GetAppointmentGrid
        [HttpGet("[action]")]
        public async Task<IActionResult> GetAppointmentGrid()
        {
            try
            {
                var result = await _service.GetAppointmentGrid();
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // GET: api/Appointment/GetAllAppointmentLengthOptions
        [HttpGet("[action]")]
        public async Task<IActionResult> GetAllAppointmentLengthOptions()
        {
            try
            {
                var result = await _service.GetAllAppointmentLengthOptions();
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // GET: api/Appointment/GetAppointmentById/5
        [HttpGet("[action]/{id}")]
        public async Task<IActionResult> GetAppointmentById(int id)
        {
            try
            {
                var result = await _service.GetById(id);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // POST: api/Appointment/GetAppointmentTimeOptions
        [HttpPost("[action]")]
        public async Task<IActionResult> GetAppointmentTimeOptions([FromBody]AppointmentLengthParams apptLengthParams)
        {
            try
            {
                apptLengthParams.Date = apptLengthParams.Date.ToLocalTime();
                var result = await _service.GetAppointmentTimeOptions(apptLengthParams);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // POST: api/Appointment/AddAppointment
        [HttpPost("[action]")]
        public async Task<IActionResult> AddAppointment([FromBody]Appointment value)
        {
            try
            {
                value.StartTime = value.StartTime.ToLocalTime();
                value.EndTime = value.EndTime.ToLocalTime();
                var result = await _service.AddAppointment(value);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // PUT: api/Appointment/UpdateAppointment/5
        [HttpPut("[action]/{id}")]
        public async Task<IActionResult> UpdateAppointment(int id, [FromBody]Appointment value)
        {
            try
            {
                value.StartTime = value.StartTime.ToLocalTime();
                value.EndTime = value.EndTime.ToLocalTime();
                var result = await _service.UpdateAppointment(id, value);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // DELETE: api/Appointment/DeleteAppointment/5
        [HttpDelete("[action]/{id}")]
        public async Task<IActionResult> DeleteAppointment(int id)
        {
            try
            {
                var result = await _service.DeleteAppointment(new Appointment { Id = id });

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}