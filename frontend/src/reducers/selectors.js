export const selectImagesForCar = (props, car) => {
  if (!car) return [];

  let res = [];
  if (Object.keys(props).length === 0) {
    return res;
  }

  Object.values(props).forEach((image) => {
    if (image.metadata.carId === car.id) {
      res.push(image);
    }
  });
  return res;
};

export const selectOneImagesForCar = (props, car) => {
  if (!car) return [];

  let res = [];
  if (Object.keys(props).length === 0) {
    return res;
  }

  Object.values(props).forEach((image) => {
    if (image.metadata.carId === car._id) {
      res.push(image);
    }
  });
  return res;
};

export const selectCarsFromUser = (props, user) => {
  let res = [];
  if (Object.keys(props).length === 0) {
    return res;
  }
  Object.values(props).forEach((car) => {
    if ((car.user_id === user) && (car.deleted === false)) {
      res.push(car);
    }
  });
  return res;
};

export const selectCarsForUser = (props, user) => {
  let res = [];
  if (Object.keys(props).length === 0) {
    return res;
  }
  Object.values(props).forEach((car) => {
    if (car.user_id !== user && car.deleted === false && car.forSale === true) {
      res.push(car);
    }
  });
  return res;
};

export const selectDeletedCars = (props) => {
  let res = [];
  if (Object.keys(props).length === 0) {
    return res;
  }
  Object.values(props).forEach((car) => {
    if (car.deleted === true) {
      res.push(car);
    }
  });
  return res;
};