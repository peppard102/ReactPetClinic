import React, { Component } from 'react';
import axios from 'axios';

export class AllAppointments extends Component {
    constructor(props) {
        super(props);

        this.onTripUpdate = this.onTripUpdate.bind(this);
        this.onTripDelete = this.onTripDelete.bind(this);

        this.state = {
            appointments: [],
            loading: true,
            failed: false,
            error: ''
        }
    }

    componentDidMount() {
        this.populateTripsData();
    }

    onTripUpdate(id) {
        const { history } = this.props;
        history.push('/update/' + id);
    }

    onTripDelete(id) {
        const { history } = this.props;
        history.push('/delete/' + id);
    }

    populateTripsData() {
        axios.get("api/Appointment/GetAppointmentGrid").then(result => {
            const response = result.data;
            this.setState({ appointments: response, loading: false, failed: false, error: '' });
        }).catch(error => {
            this.setState({ appointments: [], loading: false, failed: true, error: 'Appointments could not be loaded' });
        })
    }

    renderAllAppointmentsTable(appointments) {
        return (
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Vet First Name</th>
                        <th>Vet Last Name</th>
                        <th>Pet Name</th>
                        <th>Start Time</th>
                        <th>End Time</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        appointments.map(appointment => (
                            <tr key={appointment.id}>
                                <td>{appointment.vetFirstName}</td>
                                <td>{appointment.vetLastName}</td>
                                <td>{appointment.petName}</td>
                                <td>{new Date(appointment.startTime).toLocaleString()}</td>
                                <td>{new Date(appointment.endTime).toLocaleString()}</td>
                                <td>
                                    <div className="form-group">
                                        <button onClick={() => this.onTripUpdate(appointment.id)} className="btn btn-success">
                                            Update
                                        </button>
                                        <button onClick={() => this.onTripDelete(appointment.id)} className="btn btn-danger">
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        );
    }

    render() {
        let content = this.state.loading ? (
            <p>
                <em>
                    Loading...
                </em>
            </p>
        ) : (this.state.failed ? (
            <div className="text-danger">
                <em>
                    {this.state.error}
                </em>
            </div>
        ) : (
                this.renderAllAppointmentsTable(this.state.appointments))
            )

        return (
            <div>
                <h1>
                    All Appointments
                </h1>
                <p>
                    Here are all of the appointments scheduled at this clinic.
                </p>
                {content}
            </div>
        );
    }
}