const express = require("express");
const router = express.Router();
// const keys = require("../../config/keys");
// const mongoose = require("mongoose");
const passport = require("passport");

const Car = require("../../models/Car");
const validateCarInput = require("../../validation/cars");

const { formatCars, formatCar } = require("../../util/responseHelpers");

router.get("/", (req, res) => {
  console.log("request------------------------------------",req.body)
  Car.find()
    .sort({ date: -1 })
    .then((cars) => {
      res.json(formatCars(cars, req.isAdmin))
    })
    .catch((err) => res.status(404).json({ nocarsfound: "No cars found" }));
});

router.get("/:id", (req, res) => {
  // console.log("request------------------------------------", req.params);
  Car.findById(req.params.id)
    .then((car) => {
      // if (car.deleted) {
      //   res.status(404).json({ nocarfound: "This car has been deleted" });
      // }
      res.json(formatCar(car, req.isAdmin))
      })
    .catch((err) =>
      res.status(404).json({ nocarfound: "No car found with that ID" })
    );
});

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateCarInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    const newCar = new Car({
      user: req.body.user,
      title: req.body.title,
      make: req.body.make,
      model: req.body.model,
      year: req.body.year,
      color: req.body.color,
      seats: req.body.seats,
      doors: req.body.doors,
      transmission: req.body.transmission,
      location: req.body.location,
      price: req.body.price,
    });

    newCar.save().then((car) => res.json(formatCar(car))).catch(error => console.log(error));
  }
);

router.patch(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Car.findById(req.params.id)
      .then((car) => {
        const checkUser = (car.user === req.body.userID || req.body.admin)
        const { errors, isValid } = validateCarInput(req.body);

        if (!checkUser) {
          return res.status(403).json(errors);
        } else if (!isValid) {
          return res.status(400).json(errors);
        }
        
        car.user = req.body.user,
        car.title = req.body.title;
        car.make = req.body.make;
        car.model = req.body.model;
        car.year = req.body.year;
        car.color = req.body.color;
        car.seats = req.body.seats;
        car.doors = req.body.doors;
        car.transmission = req.body.transmission;
        car.location = req.body.location;
        car.price = req.body.price,
        car.deleted = req.body.deleted

        car.save().then((car) => res.json(formatCar(car)));
      })
      .catch((err) =>
        res.status(404).json({ nocarfound: "No car found with that ID" })
      );
  }
);

router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Car.findById(req.params.id)
      .then((car) => {
        const { errors, isValid } = validateCarInput(req.body);

        if (!isValid) {
          return res.status(400).json(errors);
        }

        // car.title = req.body.title;
        // car.make = req.body.make;
        // car.model = req.body.model;
        // car.year = req.body.year;
        // car.color = req.body.color;
        // car.seats = req.body.seats;
        // car.doors = req.body.doors;
        // car.transmission = req.body.transmission;
        // car.location = req.body.location;
        car.deleted = true;

        car.save().then((car) => res.json(formatCar(car)));
      })
      .catch((err) =>
        res.status(404).json({ nocarfound: "No car found with that ID" })
      );
  }
);

module.exports = router;
