import React from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import { fetchOneCar, deleteCar } from '../../actions/car_actions';
import { fetchUsers, createFollowed } from '../../actions/user_actions';
import { fetchAllImages, createImage } from '../../actions/image_actions';
import { selectImagesForCar } from '../../reducers/selectors';
// import CarSlider from "./car_slider";

// import "./assets/car-show.scss";

class CarShow extends React.Component {
  constructor(props) {
    super();

    // this.state = {
    // };
    this.handleDelete = this.handleDelete.bind(this);
    this.uploadImage = this.uploadImage.bind(this);
  }

  componentDidMount() {
    this.props.fetchUsers();
    this.props.fetchCar(this.props.match.params.carId);
    this.props.fetchImages();
  }

  componentDidUpdate(nextProps) {

    if (this.props.images.length !== nextProps.images.length) {
      this.props.fetchImages();
    }
  }

  uploadImage(e) {
    e.preventDefault();
    const imageObj = new FormData();
    imageObj.append("image", e.target.files[0]);
    imageObj.append("carId", this.props.car.id);
    this.props.createImage(imageObj);
  }

  handleDelete(e) {
    e.preventDefault();
    this.props.deleteCar(this.props.car.id);
    this.props.history.push("/profile/cars");
  }

  render() {
    if (!this.props.car) {
      return null;
    }

    if (Object.keys(this.props.users).length === 0) {
      return null;
    }

    let owner;
    Object.values(this.props.users).forEach((user) => {
      if (user._id === this.props.car.user_id) {
        owner = user;
      }
    });

    if (!owner) {
      return "";
    }

    let followButton = "";
    if (this.props.currentUser) {
      followButton = (
        <div>
          <button
            className="car-show-follow-btn"
            onClick={() => this.props.createFollow(this.props.car.id)}
          >
            <p>Follow Car</p>
          </button>
        </div>
      );
    }

    let carLink;
    if (
      owner &&
      this.props.currentUserId &&
      owner._id === this.props.currentUserId
    ) {
      carLink = (
        <div className="car-show-edit-links">
          <div className="car-show-edit-title">
            <p>You are {this.props.car.title} owner</p>
          </div>
          <div className="car-show-edit-links-1">
            Edit this car's profile:
            <button>
              <Link to={`${this.props.car.id}/edit`}>Edit</Link>
            </button>
            <button onClick={this.handleDelete}>Delete</button>
          </div>
          <div className="car-show-edit-links-2">
            <div>Upload a photo:</div>
            <input type="file" name="image" onChange={this.uploadImage} />
          </div>
        </div>
      );
    } else {
      carLink = <div className="car-show-edit-links"></div>;
    }

    const carImgUrls = [];
    // eslint-disable-next-line
    this.props.images.map((image) => {
      const url = `/api/images/${image.filename}`;
      carImgUrls.push(url);
    });

    return (
      <div>
        <div className="car-show-container">
          <div className="car-show-slideshow-container">
            <img src={carImgUrls[0]} alt=""/>
            {/* <CarSlider imgUrls={carImgUrls} /> */}
          </div>

          <div className="car-show-details">
            <div className="car-show-details-section">
              <div className="car-show-info">
                <p id="car-show-car-title">{this.props.car.title}</p>
                {followButton}
              </div>
              <div className="car-show-details-stats">
                <p>Owner: {owner.username}</p>
                <p>Make: {this.props.car.make}</p>
                <p>Model: {this.props.car.model}</p>
                <p>Year: {this.props.car.year}</p>
                <p>Color: {this.props.car.color}</p>
              </div>
              <div className="car-show-details-stats">
                <p>Seats: {this.props.car.seats}</p>
                <p>Doors: {this.props.car.doors}</p>
                <p>Transmission: {this.props.car.transmission}</p>
                <p>Location: {this.props.car.location}</p>
                <p>Price: {this.props.car.price}</p>
              </div>
            </div>
          </div>

          <div className="car-show-edit-section">
            {carLink}
          </div>
        </div>
      </div>
    );
  }
}


const mapStateToProps = (state, ownProps) => {
  if (state.session.user) {
    const car = state.entities.cars[ownProps.match.params.carId];
    const currentUserId = state.session.user.id;
    const users = state.entities.users;
    const currentUser = state.session.user;
    const images = selectImagesForCar(state.entities.images, car);

    return {
      car: car,
      users: users,
      currentUserId: currentUserId,
      currentUser: currentUser,
      images: images,
    };
  } else {
    const car = state.entities.cars[ownProps.match.params.carId];
    const users = state.entities.users;
    const images = selectImagesForCar(state.entities.images, car);

    return {
      car: car,
      users: users,
      images: images,
    };
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCar: (id) => dispatch(fetchOneCar(id)),
    fetchUsers: () => dispatch(fetchUsers()),
    deleteCar: (id) => dispatch(deleteCar(id)),
    fetchImages: () => dispatch(fetchAllImages()),
    createImage: (imgObj) => dispatch(createImage(imgObj)),
    createFollow: (id) => dispatch(createFollowed(id)),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CarShow));