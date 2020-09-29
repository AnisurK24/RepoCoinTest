import React from "react";
import { Link } from "react-router-dom";

import noImage from "../../assets/no-image.png";


class CarIndexItem extends React.Component {

  render() {

    let imageUrl;

    if (this.props.images.length === 0) {
      imageUrl = noImage;
    } else {
      imageUrl = `/api/images/${this.props.images[0].filename}`;
    }
    return (
      <div className="car-index-item">
        <div className="car-index-item-container">
          <Link to={`/cars/${this.props.car.id}`}>
            <img src={imageUrl} alt="" />
          </Link>
          <div className="car-index-item-details">
            <div className="details">
              <div className="info">
                <li>
                  <Link to={`/cars/${this.props.car.id}`}>
                    {this.props.car.title}
                  </Link>
                </li>
                <li>Make: {this.props.car.make}</li>
                <li>Model: {this.props.car.model}</li>
                <li>Year: {this.props.car.year}</li>
                <li>Color: {this.props.car.color}</li>
                <li>Seats: {this.props.car.seats}</li>
                <li>Doors: {this.props.car.doors}</li>
                <li>Transmission: {this.props.car.transmission}</li>
                <li>Location: {this.props.car.location}</li>
                <li>Price: ${this.props.car.price}</li>
              </div>
              <div className="buy-container">
                {/* <button></button> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CarIndexItem;
