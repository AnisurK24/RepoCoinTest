const Validator = require('validator');
const validText = require('./valid-text');
const validNum = require('./valid-number')

module.exports = function validateCarInput(data) {
  let errors = {};

  data.make = validText(data.make) ? data.make : "";
  data.model = validText(data.model) ? data.model : "";
  data.color = validText(data.color) ? data.color : "";
  data.transmission = validText(data.transmission) ? data.transmission : "";
  data.location = validText(data.location) ? data.location : "";
  // data.price = validText(data.price) ? data.price : "";
  // data.year = validText(data.year) ? data.year : "";
  // data.seats = validText(data.seats) ? data.seats : "";
  // data.doors = validText(data.doors) ? data.doors : "";

  // CHECK FOR EMPTY FIELDS
  if (Validator.isEmpty(data.make)) {
    errors.text = "Make field is required";
  }
  if (Validator.isEmpty(data.model)) {
    errors.text = "Model field is required";
  }
  if (Validator.isEmpty(data.year)) {
      errors.text = "Year field is required";
  }
  if (Validator.isEmpty(data.color)) {
    errors.text = "Color field is required";
  }
  if (Validator.isEmpty(data.seats)) {
    errors.text = "Seats field is required";
  }
  if (Validator.isEmpty(data.doors)) {
    errors.text = "Doors field is required";
  }
  if (Validator.isEmpty(data.transmission)) {
    errors.text = "Transimission field is required";
  }
  if (Validator.isEmpty(data.price)) {
    errors.text = "Price field is required";
  }
  if (Validator.isEmpty(data.location)) {
    errors.text = "Location field is required";
  }


  return {
    errors,
    isValid: Object.keys(errors).length === 0,
  };
};