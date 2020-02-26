using System.Collections.Generic;
using System;
using System.Threading.Tasks;

namespace ReactPetClinic.Data
{
    public interface IAppointmentService
    {
        Task<Appointment> GetById(int id);
        Task<IEnumerable<Appointment>> GetAllAppointments();
        Task<IEnumerable<AppointmentGrid>> GetAppointmentGrid();
        Task<IEnumerable<AppointmentLengthOptions>> GetAllAppointmentLengthOptions();
        Task<IEnumerable<TimeSpan>> GetAppointmentTimeOptions(AppointmentLengthParams appointment);
        Task<long> AddAppointment(Appointment appointment);
        Task<bool> UpdateAppointment(int id, Appointment appointment);
        Task<bool> DeleteAppointment(Appointment appointment);
    }
}