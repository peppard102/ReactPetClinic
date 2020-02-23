import React, {Component} from 'react';
import axios from 'axios';
import { Form, FormGroup, Label, Input } from 'reactstrap';

export class AddVet extends Component {
    constructor(props) {
        super(props);

        this.onChangeFirstName = this.onChangeFirstName.bind(this);
        this.onChangeLastName = this.onChangeLastName.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            firstName: '',
            lastName: '',
        }
    }

    onChangeFirstName(e) {
        this.setState({
            firstName: e.target.value
        });
    }

    onChangeLastName(e) {
        this.setState({
            lastName: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();
        const {history} = this.props;

        let vet = {
            firstName: this.state.firstName,
            lastName: this.state.lastName
        }

        axios.post("api/Vet/AddVet", vet).then(result => {
            history.push('/allAppointments');
        });
    }

    render() {
        return (
            <div className="trip-form">
                <h3>Add New Vet</h3>
                <Form onSubmit={this.onSubmit}>
                    <FormGroup>
                        <Label for="firstName">First Name</Label>
                        <Input type="text" name="firstName" id="firstName" placeholder="Enter First Name" value={this.state.firstName} onChange={this.onChangeFirstName} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="lastName">Last Name</Label>
                        <Input type="text" name="lastName" id="lastName" placeholder="Enter Last Name" value={this.state.lastName} onChange={this.onChangeLastName} />
                    </FormGroup><br/>
                    <input type="submit" value="Add Vet" className="btn btn-primary"/>
                </Form>
            </div>
        )
    }
}