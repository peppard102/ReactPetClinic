using System;
using Microsoft.AspNetCore.Mvc;
using ReactPetClinic.Data;
using System.Collections.Generic;

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

        [HttpGet("[action]")]
        public IActionResult GetAllAppointments()
        {
            try
            {
                // throw new Exception();
                return Ok(_service.GetAllAppointments());
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("[action]")]
        public List<AppointmentGrid> GetAppointmentGrid()
        {
            return _service.GetAppointmentGrid();
        }

        [HttpGet("[action]")]
        public List<AppointmentLengthOptions> GetAllAppointmentLengthOptions()
        {
            return _service.GetAllAppointmentLengthOptions();
        }

        // GET: api/Appointment/GetAppointmentById/5
        [HttpGet("[action]/{id}")]
        public Appointment GetAppointmentById(int id)
        {
            return _service.GetById(id);
        }

        // POST: api/Appointment/GetAppointmentTimeOptions
        [HttpPost("[action]")]
        public List<TimeSpan> GetAppointmentTimeOptions([FromBody]AppointmentLengthParams apptLengthParams)
        {
            apptLengthParams.Date = apptLengthParams.Date.ToLocalTime();
            return _service.GetAppointmentTimeOptions(apptLengthParams);
        }

        // POST: api/Appointment/AddAppointment
        [HttpPost("[action]")]
        public Appointment AddAppointment([FromBody]Appointment value)
        {
            value.StartTime = value.StartTime.ToLocalTime();
            value.EndTime = value.EndTime.ToLocalTime();
            _service.AddAppointment(value);
            return value;
        }

        [HttpPut("UpdateAppointment/{id}")]
        public IActionResult UpdateAppointment(int id, [FromBody]Appointment value)
        {
            if (value != null)
            {
                value.StartTime = value.StartTime.ToLocalTime();
                value.EndTime = value.EndTime.ToLocalTime();
                _service.UpdateAppointment(id, value);
            }
            return Ok(value);
        }

        // DELETE: api/Appointment/DeleteAppointment/5
        [HttpDelete("[action]/{id}")]
        public int DeleteAppointment(int id)
        {
            _service.DeleteAppointment(new Appointment { Id = id });
            return id;
        }
    }
}