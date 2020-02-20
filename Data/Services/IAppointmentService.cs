using System.Collections.Generic;
using System;

namespace ReactPetClinic.Data
{
    public interface IAppointmentService
    {
        Appointment GetById(int id);
        List<Appointment> GetAllAppointments();
        List<AppointmentGrid> GetAppointmentGrid();
        List<AppointmentLengthOptions> GetAllAppointmentLengthOptions();
        List<TimeSpan> GetAppointmentTimeOptions(AppointmentLengthParams appointment);
        long AddAppointment(Appointment appointment);
        void UpdateAppointment(Appointment appointment);
        void DeleteAppointment(Appointment appointment);
    }
}