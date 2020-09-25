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

export const selectCarsForUser = (props, user) => {
  let res = [];
  if (Object.keys(props).length === 0) {
    return res;
  }
  Object.values(props).forEach((car) => {
    if (car.user_id === user) {
      res.push(car);
    }
  });
  return res;
};
