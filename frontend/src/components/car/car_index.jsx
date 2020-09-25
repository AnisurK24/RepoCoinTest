import React from "react";
import { connect } from "react-redux";
import { fetchCars } from "../../actions/car_actions";
import { fetchAllImages } from "../../actions/image_actions";
import CarIndexItem from "./car_index_item";
import {
  selectImagesForCar,
  selectOneImagesForCar,
  selectCarsForUser,
} from "../../reducers/selectors.js";

// import "./car-index.scss";

class CarIndex extends React.Component {
  componentDidMount() {
    const {isAdmin} = this.props
    this.props.fetchImages();
    this.props.fetchCars(isAdmin);
  }

  render() {
    let Allcars;
    let {cars, userId} = this.props

    if (this.props.location.pathname === "profile/cars") {
      cars = selectCarsForUser(cars, userId);
      console.log("profile cars", cars)
    }

    if (this.props.cars.length === 0) {
      return (
        <div>
          <p>There are no cars</p>
        </div>
      );
    } else {
      Allcars = cars.map((car) => {
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
          <div className="all-cars">All Cars</div>
          <div className="car-index-container">{Allcars}</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  let isAdmin = undefined
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
    fetchCars: (isAdmin) => dispatch(fetchCars(isAdmin)),
    fetchImages: () => dispatch(fetchAllImages()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CarIndex);
