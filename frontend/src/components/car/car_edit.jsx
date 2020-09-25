import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { updateCar, fetchOneCar } from "../../actions/car_actions";

// import "./assets/car-form.scss";

class CarEditForm extends React.Component {
  constructor(props) {
    super();
    this.state = this.props.car;

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.fetchCar(this.props.match.params.carId);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.updateCar(this.state);
    this.props.history.push("/profile/cars");
  }

  update(field) {
    return (e) => {
      this.setState({
        [field]: e.target.value,
      });
    };
  }

  render() {
    return (
      <div>
        <div className="car-form-container">
          <div className="car-form">
            <div className="car-form-title">Add a new car:</div>
            <form onSubmit={this.handleSubmit} className="car-form-fields">
              <div>
                Make:
                <input
                  type="text"
                  value={this.state.make}
                  onChange={this.update("make")}
                />
              </div>
              <br />
              <div>
                Model:
                <input
                  type="text"
                  value={this.state.model}
                  onChange={this.update("model")}
                />
              </div>
              <br />
              <div>
                Year:
                <input
                  type="number"
                  value={this.state.year}
                  onChange={this.update("year")}
                />
              </div>
              <br />
              <div>
                Color:
                <input
                  type="text"
                  value={this.state.color}
                  onChange={this.update("color")}
                />
              </div>
              <br />
              <div>
                Seats:
                <input
                  type="number"
                  value={this.state.seats}
                  onChange={this.update("seats")}
                />
              </div>
              <br />
              <div>
                Doors:
                <input
                  type="number"
                  value={this.state.doors}
                  onChange={this.update("doors")}
                />
              </div>
              <br />
              <div>
                Transmission:
                <select
                  value={this.state.transmision}
                  onChange={this.update("transmission")}
                >
                  <option value="Automatic">Automatic</option>
                  <option value="Manual">Manual</option>
                  <option value="Electric">Electric</option>
                </select>
              </div>
              <br />
              <div>
                Location:
                <select
                  value={this.state.location}
                  onChange={this.update("location")}
                >
                  <option value="Chicago">Chicago</option>
                  <option value="New York">New York</option>
                  <option value="San Francisco">San Francisco</option>
                  <option value="Seattle">Seattle</option>
                  <option value="Washington D.C.">Washington D.C.</option>
                </select>
              </div>
              <br />
              <div>
                Price:
                <input
                  type="number"
                  value={this.state.price}
                  onChange={this.update("price")}
                />
              </div>
              <br />
              <input type="submit" value="Submit" />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    car: state.entities.cars[ownProps.match.params.carId],
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateCar: (car) => dispatch(updateCar(car)),
    fetchCar: (id) => dispatch(fetchOneCar(id)),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CarEditForm));
