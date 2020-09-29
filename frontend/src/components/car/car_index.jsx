import React from "react";
import { connect } from "react-redux";
import { fetchCars } from "../../actions/car_actions";
import { fetchAllImages } from "../../actions/image_actions";
import CarIndexItem from "./car_index_item";
import {
  selectImagesForCar,
  selectCarsFromUser,
  selectDeletedCars,
  selectCarsForUser,
} from "../../reducers/selectors.js";

import "./car-index.scss";

class CarIndex extends React.Component {
  componentDidMount() {
    this.props.fetchImages();
    this.props.fetchCars();
  }

  render() {
    let carTitle;
    let allCars;
    let userCars;
    let {cars, userId} = this.props

      // console.log("pathname", this.props);
    if (this.props.location.pathname === "/profile/cars") {
      carTitle = "Your cars";
      userCars = selectCarsFromUser(cars, userId);
    } else if (this.props.location.pathname === "/deleted/cars") {
      carTitle = "Deleted cars";
      userCars = selectDeletedCars(cars);
      // console.log("deleted cars", userCars)
    } else if (this.props.isAdmin) {
      carTitle = "Admin: All Cars"
      userCars = cars
    } else {
      carTitle = "Cars for Sale";
      userCars = selectCarsForUser(cars, userId);
    }

    if (userCars.length === 0) {
      return (
        <div>
          <p>There are no cars</p>
        </div>
      );
    } else {
      // console.log("user cars", userCars)
      allCars = userCars.map((car) => {
        const images = selectImagesForCar(this.props.images, car);

        return (
          <CarIndexItem
            key={car.id}
            car={car}
            images={images}
          />
        );
      });
    }

    return (
      <div>
        <div className="car-index">
        <div className="all-cars">{carTitle}</div>
          <div className="car-index-container">{allCars}</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  let isAdmin
  let userId;
    if (state.session.user) {
      isAdmin = state.session.user.isAdmin;
      userId = state.session.user.id;
    }
    return {
      cars: Object.values(state.entities.cars),
      images: state.entities.images,
      isAdmin: isAdmin,
      userId: userId,
    };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCars: () => dispatch(fetchCars()),
    fetchImages: () => dispatch(fetchAllImages()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CarIndex);
