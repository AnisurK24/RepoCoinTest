const express = require("express");
const router = express.Router();

const Car = require("../../models/Car");
const { formatCars, formatCar } = require("../../util/responseHelpers");

router.get("/makes/:make", (req, res) => {
  Car.find({ make: req.params.make })
    .then((cars) => res.json(formatCars(cars)))
    .catch((err) =>
      res.status(404).json({ nocarsfound: "No cars found in that make" })
    );
});

router.get("/models/:model", (req, res) => {
  Car.find({ model: req.params.model })
    .then((cars) => res.json(formatCars(cars)))
    .catch((err) =>
      res.status(404).json({ nocarsfound: "No cars found in that model" })
    );
});

router.get("/years/:year", (req, res) => {
  Car.find({ year: req.params.year })
    .then((cars) => res.json(formatCars(cars)))
    .catch((err) =>
      res.status(404).json({ nocarsfound: "No cars found in that year" })
    );
});

router.get("/locations/:location", (req, res) => {
  Car.find({ location: req.params.location })
    .then((cars) => res.json(formatCars(cars)))
    .catch((err) =>
      res.status(404).json({ nocarsfound: "No cars found in that location" })
    );
});

router.get("/colors/:color", (req, res) => {
  Car.find({ color: req.params.color })
    .then((cars) => res.json(formatCars(cars)))
    .catch((err) =>
      res.status(404).json({ nocarsfound: "No cars found with that name" })
    );
});


module.exports = router;
