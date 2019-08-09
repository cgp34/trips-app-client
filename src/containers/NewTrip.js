import React, { Component } from "react";
import { API } from "aws-amplify";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import { s3Upload } from "../libs/awsLib";
import config from "../config";
import "./NewTrip.css";

export default class NewTrip extends Component {
  constructor(props) {
    super(props);

    this.file = null;

    this.state = {
      isLoading: null,
      tripName: "",
      methodOfTransport: "",
      destination: "",
      departureDate: "",
      returnDate: ""
    };
  }

  createTrip(trip) {
    return API.post("trips", "/trips", {
      body: trip
    });
  }

  validateForm() {
    return this.state.content.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleFileChange = event => {
    this.file = event.target.files[0];
  }

  handleSubmit = async event => {
    event.preventDefault();

    if (this.file && this.file.size > config.MAX_ATTACHMENT_SIZE) {
      alert(`Please pick a file smaller than ${config.MAX_ATTACHMENT_SIZE/1000000} MB.`);
      return;
    }

    this.setState({ isLoading: true });

    try {
      const attachment = this.file
        ? await s3Upload(this.file)
        : null;

      await this.createTrip({
        attachment,
        tripName: this.state.tripName,
        methodOfTransport: this.state.methodOfTransport,
        destination: this.state.destination,
        departureDate: this.state.departureDate,
        returnDate: this.state.returnDate
      });
      this.props.history.push("/");
    } catch (e) {
      alert(e);
      this.setState({ isLoading: false });
    }
  }

  render() {
    return (
      <div className="NewTrip">
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="tripName">
            <FormControl
              onChange={this.handleChange}
              value={this.state.tripName}
              componentClass="textarea"
            />
          </FormGroup>
          <FormGroup controlId="methodOfTransport">
            <FormControl
              onChange={this.handleChange}
              value={this.state.methodOfTransport}
              componentClass="textarea"
            />
          </FormGroup>
          <FormGroup controlId="destination">
            <FormControl
              onChange={this.handleChange}
              value={this.state.destination}
              componentClass="textarea"
            />
          </FormGroup>
          <FormGroup controlId="departureDate">
            <FormControl
              onChange={this.handleChange}
              value={this.state.departureDate}
              componentClass="datetime"
            />
          </FormGroup>
          <FormGroup controlId="returnDate">
            <FormControl
              onChange={this.handleChange}
              value={this.state.returnDate}
              componentClass="datetime"
            />
          </FormGroup>
          <FormGroup controlId="file">
            <ControlLabel>Attachment</ControlLabel>
            <FormControl onChange={this.handleFileChange} type="file" />
          </FormGroup>
          <LoaderButton
            block
            bsStyle="primary"
            bsSize="large"
            disabled={!this.validateForm()}
            type="submit"
            isLoading={this.state.isLoading}
            text="Create"
            loadingText="Creating…"
          />
        </form>
      </div>
    );
  }
}
