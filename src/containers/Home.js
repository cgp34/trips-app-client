import React, { Component } from "react";
import { API } from "aws-amplify";
import { Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { PageHeader, ListGroup, ListGroupItem } from "react-bootstrap";
import "./Home.css";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      notes: []
    };
  }

  async componentDidMount() {
    if (!this.props.isAuthenticated) {
      return;
    }

    try {
      const trips = await this.trips();
      this.setState({ trips });
    } catch (e) {
      alert(e);
    }

    this.setState({ isLoading: false });
  }

  trips() {
    return API.get("trips", "/trips");
  }

  renderNotesList(trips) {
    return [{}].concat(trips).map(
      (trip, i) =>
        i !== 0
          ? <LinkContainer
              key={trip.tripId}
              to={`/trips/${trip.tripId}`}
            >
              <ListGroupItem header={trip.tripName.trim().split("\n")[0]}>
                {"Created: " + new Date(trip.createdAt).toLocaleString()}
              </ListGroupItem>
            </LinkContainer>
          : <LinkContainer
              key="new"
              to="/trips/new"
            >
              <ListGroupItem>
                <h4>
                  <b>{"\uFF0B"}</b> Add a new trip
                </h4>
              </ListGroupItem>
            </LinkContainer>
    );
  }

  renderLander() {
    return (
      <div className="lander">
        <h1>Tripstytch</h1>
        <p>An app to keep track of your busy travel schedule</p>
        <div>
          <Link to="/login" className="btn btn-info btn-lg">
            Login
          </Link>
          <Link to="/signup" className="btn btn-success btn-lg">
            Signup
          </Link>
        </div>
      </div>
    );
  }

  renderTrips() {
    return (
      <div className="trips">
        <PageHeader>Your Trips</PageHeader>
        <ListGroup>
          {!this.state.isLoading && this.renderTripsList(this.state.trips)}
        </ListGroup>
      </div>
    );
  }

  render() {
    return (
      <div className="Home">
        {this.props.isAuthenticated ? this.renderTrips() : this.renderLander()}
      </div>
    );
  }
}
