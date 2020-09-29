const formatCars = (carsArr) => {
  const cars = {};
  carsArr.forEach((car) => {
    const carData = {
      deleted: car.deleted,
      forSale: car.forSale,
      id: car._id,
      user_id: car.user,
      title: car.title,
      make: car.make,
      model: car.model,
      year: car.year,
      color: car.color,
      seats: car.seats,
      doors: car.doors,
      transmission: car.transmission,
      location: car.location,
      price: car.price,
      date: car.date,
    };
      cars[car.id] = carData;
  });

  return cars;
};

const formatCar = (car) => {
  const carData = {
    deleted: car.deleted,
    forSale: car.forSale,
    id: car._id,
    user_id: car.user,
    title: car.title,
    make: car.make,
    model: car.model,
    year: car.year,
    color: car.color,
    seats: car.seats,
    doors: car.doors,
    transmission: car.transmission,
    location: car.location,
    price: car.price,
    date: car.date,
  };
    // console.log("this is the data", carData);
    return carData;
};

module.exports = { formatCars, formatCar };
