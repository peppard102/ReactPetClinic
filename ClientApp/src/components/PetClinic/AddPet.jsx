import React, { Component } from 'react';
import axios from 'axios';
import { Form, FormGroup, Label, Input } from 'reactstrap';
import Select from 'react-select';

export class AddPet extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            allergies: "",
            species: null,
            speciesList: [],
        }
    }

    componentDidMount() {
        let self = this;

        axios.get('/api/Pet/GetAllSpecies').then(result => {
            let species = result.data.map((item) => ({ value: item.speciesId, label: item.speciesName }));

            self.setState({
                speciesList: species,
                species: species.length !== 0 ? species[0] : null
            });
        })
      }

    onChangeName = e => {
        this.setState({
            name: e.target.value
        });
    }

    onChangeSpecies = species => {
        this.setState({ species });
      };

    onChangeAllergies = e => {
        this.setState({
            allergies: e.target.value
        });
    }

    onSubmit = e => {
        e.preventDefault();
        const { history } = this.props;

        let pet = {
            name: this.state.name,
            allergies: this.state.allergies,
            speciesId: this.state.species.value
        }

        axios.post("api/Pet/AddPet", pet).then(result => {
            history.push('/');
        });
    }

    render() {
        return (
            <div>
                <h3>Add New Pet</h3>
                <Form onSubmit={this.onSubmit}>
                    <FormGroup>
                        <Label for="petName">Pet Name:</Label>
                        <Input type="text" name="petName" id="petName" placeholder="Enter Pet Name" value={this.state.name} onChange={this.onChangeName} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="speciesSelect">Species:</Label>
                        <Select
                            type="select"
                            name="speciesSelect"
                            id="speciesSelect"
                            value={this.state.species}
                            onChange={this.onChangeSpecies}
                            options={this.state.speciesList}>
                        </Select>
                    </FormGroup>
                    <FormGroup>
                        <Label for="exampleText">Allergies:</Label>
                        <Input type="textarea" name="text" id="exampleText" value={this.state.allergies} onChange={this.onChangeAllergies}/>
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
                        <Label for="exampleFile">Medical Records:</Label>
                        <Input type="file" name="file" id="exampleFile" />
                    </FormGroup><br />
                    <input type="submit" value="Add Pet" className="btn btn-primary" />
                </Form>
            </div>
        )
    }
}