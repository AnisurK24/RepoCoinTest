import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import {
  fetchCarsByMake,
  fetchCarsByModel,
  fetchCarsByYear,
  fetchCarsByLocation,
  fetchCarsByColor,
} from "../../actions/car_actions";
import { capitalize } from "../../util/car_api_util";

import "./search.scss";

class Search extends React.Component {
  constructor(props) {
    super();
    this.state = {
      searchType: "make",
      searchValue: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSearchType = this.handleSearchType.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.searchType === "make") {
      this.props.searchByMake(capitalize(this.state.searchValue));
    } else if (this.state.searchType === "model") {
      this.props.searchByModel(capitalize(this.state.searchValue));
    } else if (this.state.searchType === "year") {
      this.props.searchByYear(this.state.searchValue);
    } else if (this.state.searchType === "location") {
      this.props.searchByLocation(capitalize(this.state.searchValue));
    } else if (this.state.searchType === "color") {
      this.props.searchByColor(capitalize(this.state.searchValue));
    }
    
    this.props.history.push("/cars");
  }

  handleChange(e) {
    this.setState({
      searchValue: e.target.value,
    });
  }

  handleSearchType(e) {
    this.setState({
      searchType: e.target.value,
    });
  }

  render() {
    return (
      <div className="search-container">
        <form className="search-form" onSubmit={this.handleSubmit}>
          <input
            className="search-form-textbox"
            type="text"
            value={this.state.searchValue}
            placeholder="Search all cars..."
            onChange={this.handleChange}
          ></input>

          <select
            className="search-form-dropdown"
            value={this.state.searchType}
            onChange={this.handleSearchType}
          >
            <option value="make">Make</option>
            <option value="model">Model</option>
            <option value="year">Year</option>
            <option value="location">Location</option>
            <option value="color">Color</option>
          </select>
          <input className="search-form-submit" type="submit" value="" />
        </form>
      </div>
    );
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    searchByMake: (make) => dispatch(fetchCarsByMake(make)),
    searchByModel: (model) => dispatch(fetchCarsByModel(model)),
    searchByYear: (year) => dispatch(fetchCarsByYear(year)),
    searchByLocation: (location) => dispatch(fetchCarsByLocation(location)),
    searchByColor: (color) => dispatch(fetchCarsByColor(color)),
  };
};

export default withRouter(connect(null, mapDispatchToProps)(Search));