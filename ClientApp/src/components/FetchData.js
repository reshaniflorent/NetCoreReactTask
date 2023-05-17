import React, { Component } from 'react';

import { Button, Modal } from 'react-bootstrap'

export class FetchData extends Component {
  static displayName = FetchData.name;

  constructor(props) {
    super(props);
    this.state = { spaceXLaunches: [], spaceXLaunchDetail: [], loading: true, show: false, openModal: false, };
    this.openLaunchDetails = this.openLaunchDetails.bind(this);

  }
  openLaunchDetails(flight_number) {
    this.setState({
      openModal: !this.state.openModal
    });

    if (this.state.openModal != true) {
      this.populateSpaceXLaunchDetailsData(flight_number);
    }


  }
  componentDidMount() {
    this.populateSpaceXLaunchesData();
  }

  renderLaunchesTable(spaceXLaunches) {
    return (
      <div>
        <table className="table table-striped" aria-labelledby="tableLabel">
          <thead>
            <tr>
              <th>LaunchYear</th>
              <th>FlightNumber</th>
              <th>MissionName</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {spaceXLaunches.map(spaceXLaunch =>
              <tr key={spaceXLaunch.flight_number}>
                <td>{spaceXLaunch.launch_year}</td>
                <td>{spaceXLaunch.flight_number}</td>
                <td>{spaceXLaunch.mission_name}</td>
                <td>
                  {/* <button className="btn btn-primary" onClick={this.openLaunchDetails}>Open Details</button> */}
                  <button value={spaceXLaunch.flight_number}
                    className="btn btn-primary"
                    onClick={e => this.openLaunchDetails(spaceXLaunch.flight_number)}>Open Details</button>

                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

    );
  }

  render() {
    let contents = this.state.loading
      ? <p><em>Loading...</em></p>
      : this.renderLaunchesTable(this.state.spaceXLaunches);

    return (
      <div>
        <div>
          <div className="modalClass">
            <Modal show={this.state.openModal} onHide={() => this.openLaunchDetails()}>
              <Modal.Header closeButton>SpaceX Launch Flight Number: {this.state.spaceXLaunchDetail.flight_number}</Modal.Header>
              <Modal.Body>
                <p>
                  Details <br/>
                {this.state.spaceXLaunchDetail.details}
                </p>
              </Modal.Body>
              <Modal.Footer>
                <Button onClick={() => this.openLaunchDetails()}>Close</Button>
                <Button onClick={() => this.openLaunchDetails()}>Save</Button>
              </Modal.Footer>
            </Modal>
          </div>
        </div>
        <h1 id="tableLabel">Space X launch data</h1>
        {contents}
      </div>
    );
  }

  async populateSpaceXLaunchesData() {
    const response = await fetch('spacex');
    const data = await response.json();
    this.setState({ spaceXLaunches: data, loading: false });
  }
  async populateSpaceXLaunchDetailsData(flight_number) {
    console.log("calling api spacex launch details");
    const settings = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }
    };
    const response = await fetch('spacex?flight_number=' + flight_number, settings);
    const data = await response.json();
    this.setState({ spaceXLaunchDetail: JSON.parse(data), loading: false });
  }
}
