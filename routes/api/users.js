const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const User = require("../../models/User");
const passport = require("passport");
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

router.get("/", (req, res) => {
  User.find()
    .sort({ date: -1 })
    .then((users) => res.json(users))
    .catch((err) => res.status(404).json({ noUserfound: "No users found" }));
});

router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  // Check to make sure nobody has already registered with a duplicate email
  User.findOne({
    $or: [{ email: req.body.email }, { username: req.body.username }],
  }).then((user) => {
    if (user) {
      // Throw a 400 error if the email address already exists
      return res
        .status(400)
        .json({
          registration:
            "A user has already registered with this username and/or email",
        });
    } else {
      // Otherwise create a new user
      const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then((user) => {
              const payload = { id: user.id, name: user.name };
              jwt.sign(
                payload,
                keys.secretOrKey,
                // Tell the key to expire in one hour
                { expiresIn: 3600 },
                (err, token) => {
                  res.json({
                    success: true,
                    token: "Bearer " + token,
                  });
                }
              );
            })
            .catch((err) => console.log(err));
        });
      });
    }
  });
});

router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const username = req.body.username;
  const password = req.body.password;

  User.findOne({ username }).then((user) => {
    if (!user) {
      return res.status(404).json({ username: "This user does not exist" });
    }

    bcrypt.compare(password, user.password).then((isMatch) => {
      if (isMatch) {
        const payload = {
          id: user.id,
          username: user.username,
          followedCars: user.followedCars,
          isAdmin: user.admin,
        };

        jwt.sign(
          payload,
          keys.secretOrKey,
          // Tell the key to expire in one hour
          { expiresIn: 3600 },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token,
            });
          }
        );
      } else {
        return res.status(400).json({ password: "Incorrect password" });
      }
    });
  });
});

// GET USERS FOLLOWED CARS
router.get("/:id", (req, res) => {
  User.findById(req.params.id)
    .select("followedCars")
    .populate("followedCars")
    .exec()
    .then((car) => {
      res.json(car);
    })
    .catch((err) =>
      res.status(404).json({ nocarfound: "No car found with that ID" })
    );
});

// ADD FOLLOWED CAR
router.post(
  "/:id/addFollowedCar",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const user = req.user.id;
    const carId = req.params.id;
    Car.findById(carId)
      .then((car) => {
        User.findById(user)
          .then((user) => {
            user.followedCars.push(carId);
            user.save();
            res.json(user);
          })
          .catch((err) =>
            res.status(404).json({ nouserfound: "No user found with that ID" })
          );
      })
      .catch((err) =>
        res.status(404).json({ nocarfound: "No car found with that ID" })
      );
  }
);

// REMOVE FOLLOWED CAR
// router.patch('/:id/removeFollowedCar', passport.authenticate('jwt', { session: false }), (req, res) => {
//   const user = req.user.id;
//   const carId = req.body.id
//   console.log(carId)
//   Car.findById(carId)
//   .then(car => {
//     console.log("this is the car", car)
//     User.findById(user)
//     .then(user => {
//       user.followedCars.filter((followedCar) => (followedCar.id !== car.id))
//       console.log("this is user after unfollow", user)
//       user.save()
//       res.json(user)
//     })
//     .catch(err =>
//       res.status(404).json({nouserfound: 'No user found with that ID'})
//       );
//   })
//   .catch(err =>
//     res.status(404).json({nocarfound: 'No car found with that ID'})
//     );
// })

module.exports = router;