import React from "react";
import { Switch, Route } from "react-router-dom";
import NavBar from './navbar/navbar';
import Modal from "./modal/modal";


import MainPage from "./main/main_page";
import CarsIndex from "./car/car_index";
import Profile from "./profile/profile";
import CarShow from "./car/car_show";
import CarCreateForm from "./car/car_create";
import CarEditForm from "./car/car_edit";

import { AuthRoute, ProtectedRoute } from "../util/route_util"


const App = () => (
  <div>
    <Modal />
    <NavBar />
    <Switch>
      <Route exact path="/" component={MainPage} />
      <Route exact path="/cars" component={CarsIndex} />
      <Route exact path='/cars/:carId' component={CarShow} />
      <Route exact path="/profile" component={Profile} />
      <ProtectedRoute exact path="/profile/cars" component={CarsIndex} />
      <ProtectedRoute exact path="/deleted/cars" component={CarsIndex} />
      <ProtectedRoute exact path="/profile/cars/new" component={CarCreateForm} />
      <ProtectedRoute exact path='/cars/:carId/edit' component={CarEditForm} />
    </Switch>
  </div>
);

export default App;
