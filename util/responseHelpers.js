const formatCars = (carsArr) => {
  const cars = {};
  carsArr.forEach((car) => {
    const carData = {
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
      deleted: car.deleted,
      forSale: car.forSale,
    };
      cars[car.id] = carData;
  });

  return cars;
};

const formatCar = (car) => {
  const carData = {
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
    deleted: car.deleted,
    forSale: car.forSale,
  };
    return carData;
};

module.exports = { formatCars, formatCar };
