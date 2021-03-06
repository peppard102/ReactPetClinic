import React, { Component } from 'react';
import axios from 'axios';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export class AllAppointments extends Component {
    constructor(props) {
        super(props);

        this.state = {
            appointments: [],
            loading: true,
            showDeleteModal: false,
            selectedApptId: null,
            failed: false,
            error: ''
        }
    }

    componentDidMount() {
        this.populateAppointmentData();
    }

    onAppointmentDelete = () => {
        let self = this;
        axios.delete("api/Appointment/DeleteAppointment/" + this.state.selectedApptId).then(result => {
            let appointments = this.state.appointments;
            appointments = appointments.filter(function (obj) {
                return obj.id !== self.state.selectedApptId;
            });

            this.setState({
                appointments
            });

            this.toggleDeleteModal();
        })
    }

    populateAppointmentData() {
        axios.get("api/Appointment/GetAppointmentGrid").then(result => {
            const response = result.data;
            this.setState({ appointments: response, loading: false, failed: false, error: '' });
        }).catch(error => {
            this.setState({ appointments: [], loading: false, failed: true, error: 'Appointments could not be loaded' });
        })
    }

    toggleDeleteModal = (apptId) => {
        this.setState({ selectedApptId: apptId });
        this.setState(prevState => ({ showDeleteModal: !prevState.showDeleteModal }));
    }

    isPast = (startTime) => {
        return new Date(startTime) < new Date();
    }

    onClickUpdate = (apptId) => {
        this.setState({ selectedApptId: apptId });
        this.props.history.push('/editAppointment/' + apptId);
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
                        <th>Species</th>
                        <th>Allergies</th>
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
                                <td>{appointment.speciesName}</td>
                                <td>{appointment.allergies}</td>
                                <td>
                                    <div className="form-group">
                                        <button onClick={() => this.onClickUpdate(appointment.id)} className="btn btn-success mr-1" disabled={this.isPast(appointment.startTime)}>
                                            Edit
                                        </button>
                                        <button onClick={() => this.toggleDeleteModal(appointment.id)} className="btn btn-danger" disabled={this.isPast(appointment.startTime)}>
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

                <Modal isOpen={this.state.showDeleteModal}
                    toggle={this.toggleDeleteModal}>
                    <ModalHeader toggle={this.toggleDeleteModal}>Confirm</ModalHeader>
                    <ModalBody>
                        Are you sure you would like to delete this appointment?
                        </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.onAppointmentDelete}>Delete</Button>{' '}
                        <Button color="secondary" onClick={this.toggleDeleteModal}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div >
        );
    }
}