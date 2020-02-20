import React, {Component} from 'react';
import axios from 'axios';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

export class AddPet extends Component {
    constructor(props) {
        super(props);

        this.onChangeName = this.onChangeName.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            name: '',
        }
    }

    onChangeName(e) {
        this.setState({
            name: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();
        const {history} = this.props;

        let pet = {
            name: this.state.name
        }

        axios.post("api/Pet/AddPet", pet).then(result => {
            history.push('/allAppointments');
        });
    }

    render() {
        return (
            <div className="trip-form">
                <h3>Add New Pet</h3>
                <Form onSubmit={this.onSubmit}>
                    <FormGroup>
                        <Label for="petName">Pet Name</Label>
                        <Input type="text" name="petName" id="petName" placeholder="Enter Pet Name" value={this.state.name} onChange={this.onChangeName} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="speciesSelect">Species</Label>
                        <Input type="select" name="speciesSelect" id="speciesSelect">
                        <option>Cat</option>
                        <option>Dog</option>
                        <option>Bird</option>
                        <option>Hamster</option>
                        <option>Other</option>
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label for="exampleText">Allergies</Label>
                        <Input type="textarea" name="text" id="exampleText" />
                    </FormGroup>
                    <FormGroup tag="fieldset">
                        <legend>Vaccinations Up to Date?</legend>
                        <FormGroup check>
                        <Label check>
                            <Input type="radio" name="radio1" />{' '}
                            Yes
                        </Label>
                        </FormGroup>
                        <FormGroup check>
                        <Label check>
                            <Input type="radio" name="radio1" />{' '}
                            No
                        </Label>
                        </FormGroup>
                        <FormGroup check>
                        <Label check>
                            <Input type="radio" name="radio1" />{' '}
                            Not Sure
                        </Label>
                        </FormGroup>
                    </FormGroup>
                    <FormGroup>
                        <Label for="exampleFile">Medical Records</Label>
                        <Input type="file" name="file" id="exampleFile" />
                    </FormGroup><br/>
                    {/* <Button >Submit</Button> */}
                    <input type="submit" value="Add Pet" className="btn btn-primary"/>
                </Form>
            </div>
        )
    }
}