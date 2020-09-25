const express = require("express");
const app = express();
const mongoose = require("mongoose");
const db = require("./config/keys").mongoURI;
const passport = require("passport");
// const http = require("http");

// const path = require("path");
const users = require("./routes/api/users");
// const posts = require("./routes/api/posts");
const cars = require("./routes/api/cars");
const images = require("./routes/api/images");
const search = require("./routes/api/search");

const bodyParser = require("body-parser");

// this is middleware for body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch((err) => console.log(err));

app.use(passport.initialize());
//config for passport:
require("./config/passport")(passport);

// this is where we import the routes
app.use("/api/users", users);
app.use("/api/cars", cars);
app.use("/api/images", images)
app.use("/api/search", search)

const port = process.env.PORT || 3080;

app.listen(port, () => console.log(`Server is running on port ${port}`));

if (process.env.NODE_ENV === "production") {
  app.use(express.static("repo-coin/build"));
//   app.get("/", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "repo-coin", "build", "index.html"));
//   });
} else {
    app.use(express.static("repo-coin/public"));
}