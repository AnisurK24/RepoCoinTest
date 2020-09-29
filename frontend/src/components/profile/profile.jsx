import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchUser } from "../../actions/user_actions";
import { fetchCars } from "../../actions/car_actions";
import { fetchAllImages } from "../../actions/image_actions";

import {
  selectImagesForCar,
  selectOneImagesForCar,
  selectCarsFromUser,
} from "../../reducers/selectors.js";

import "./profile.scss";
import noImage from "../../assets/no-image.png";

class Profile extends React.Component {
  constructor(props) {
    super();
    this.state = {
      addCar: false,
      addFollowed: true,
    };

    this.toggleCar = this.toggleCar.bind(this);
    this.toggleFollowed = this.toggleFollowed.bind(this);
  }

  toggleCar() {
    this.setState({ addCar: !this.state.addCar, addFollowed: !this.state.addFollowed });
  }

  toggleFollowed() {
    this.setState({ addFollowed: !this.state.addFollowed, addCar: !this.state.addCar });
  }

  componentDidMount() {
    this.props.fetchUser(this.props.currentUser.id);
    this.props.fetchImages();
    this.props.fetchCars();
  }

  render() {
    const followedCars = this.props.followedCars.map((car) => {
      const carImage = selectOneImagesForCar(this.props.images, car);
      if (carImage[0]) {
        return (
          <li className="user-car-li" key={car._id}>
            <Link to={`/cars/${car._id}`}>
              <p className="user-car-title">{car.title}</p>
            </Link>
            <br />
            <Link to={`/cars/${car._id}`}>
              <img
                className="user-car-img"
                src={`/api/images/${carImage[0].filename}`}
                alt={car.name}
              />
            </Link>
          </li>
        );
      } else {
        return "You have not followed any cars yet!";
      }
    });

    const userCars = selectCarsFromUser(this.props.cars, this.props.currentUser.id);
    // const userCars = this.props.cars.filter((car) => {
    //   return this.props.currentUser.id === car.user_id;
    // });
    
    const userCarsDisplay = userCars.map((car) => {
      const carImage = selectImagesForCar(this.props.images, car);
      let carLinks = noImage
      if (carImage.length) {
        carLinks = (
          `/api/images/${carImage[0].filename}`
        );
      }

      // if (carLinks) {
        return (
          <li className="user-car-li" key={car.id}>
            <Link to={`/cars/${car.id}`}>
              <p className="user-car-title">{car.title}</p>
            </Link>
            <br />
            <Link to={`/cars/${car.id}`}>
              <img
                className="user-car-img"
                src={carLinks}
                alt={car.name}
              />
            </Link>
          </li>
        );
      // } else {
      //   return "were in the else";
      // }
    });

    let myCar = ["profile-my-cars"];
    let carbtn = ["my-cars"];
    if (this.state.addCar) {
      myCar.push("active");
      carbtn.push("active");
    }

    let myFollowed = ["profile-followed-cars"];
    let followbtn = ["my-followed"];
    if (this.state.addFollowed) {
      myFollowed.push("active");
      followbtn.push("active");
    }


    return (
      <div>
        <div className="profile-container">
          <div className="profile-left-container">
            <div className="profile-left">
              {/* <div className="default-image">
                <img src={noImage} alt="default-profile-pic" />
              </div> */}
              <div className="profile-btn-container">
                <div className="profile-buttons">
                  <div className="profile-btn-top">
                    {/* <button className="all-cars">
                      <Link to="/cars">All cars!</Link>
                    </button> */}
                  </div>
                  <br />
                  <div className="profile-btn-upper">
                    <button className="new-car">
                      <Link to="/profile/cars/new">Create a new car</Link>
                    </button>
                    <br />
                    <button className="car-details">
                      <Link to="/profile/cars">My Cars Details</Link>
                    </button>
                  </div>
                  <div className="profile-btn-lower">
                    <button
                      className={carbtn.join(" ")}
                      onClick={this.toggleCar}
                    >
                      My Cars
                    </button>
                    <br />
                    <button
                      className={followbtn.join(" ")}
                      onClick={this.toggleFollowed}
                    >
                      My Followed Cars
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="profile-right-container">
            <div className="profile-right">
              <div className={myCar.join(" ")}>
                <div className="profile-right-header">
                  <h2>Your Cars:</h2>
                </div>
                <ul>{userCarsDisplay}</ul>
              </div>
              <div className={myFollowed.join(" ")}>
                <div className="profile-right-header">
                  <h2>Your Followed Cars:</h2>
                </div>
                <ul>{followedCars}</ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  let favs;
  const followedCars = state.entities.users.followedCars;
  if (followedCars) {
    favs = Object.values(followedCars);
  } else {
    favs = [];
  }

  return {
    currentUser: state.session.user,
    followedCars: favs,
    images: state.entities.images,
    cars: Object.values(state.entities.cars),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUser: (id) => dispatch(fetchUser(id)),
    fetchImages: () => dispatch(fetchAllImages()),
    fetchCars: () => dispatch(fetchCars()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
