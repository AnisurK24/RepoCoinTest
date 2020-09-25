const formatCars = (carsArr, isAdmin) => {
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
    };
    if (isAdmin || !car.deleted) {
      cars[car.id] = carData;
    }
  });

  return cars;
};

const formatCar = (car, isAdmin) => {
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
  };
  if (isAdmin || !car.deleted) {
    return carData;
  }
};

module.exports = { formatCars, formatCar };
