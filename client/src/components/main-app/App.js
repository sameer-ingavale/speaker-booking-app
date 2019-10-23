import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
import "./App.css";

import { AuthProvider } from "../../context/auth";
import AuthRoute from "../../utilities/AuthRoute";
import PrivateRoute from "../../utilities/PrivateRoute";

import MenuBar from "../menu-bar/MenuBar";
import Register from "../../pages/register/Register";
import Home from "../../pages/home/Home";
import Login from "../../pages/login/Login";
import Speakers from "../../pages/speakers/Speakers";
import Events from "../../pages/events/Events";
import UserProfile from "../../pages/private-pages/user-profile/UserProfile";
import CreateCompany from "../../pages/private-pages/create-company/CreateCompany";
import UserCompany from "../../pages/private-pages/user-company/UserCompany";
import CreateEvent from "../../pages/private-pages/create-event/CreateEvent";
import SingleEvent from "../../pages/single-event/SingleEvent";
import UserBookings from "../../pages/private-pages/user-bookings/UserBookings";

function App() {
  return (
    <AuthProvider>
      <Router>
        <MenuBar />
        {/*  <pre>{JSON.stringify(this.state, null, 2)}</pre> */}
        <Switch>
          <Route exact path="/" component={Home}></Route>
          <AuthRoute exact path="/register" component={Register}></AuthRoute>
          <AuthRoute exact path="/login" component={Login}></AuthRoute>
          <Route exact path="/events/:eventId" component={SingleEvent}></Route>
          <Route exact path="/events" component={Events}></Route>
          <Route exact path="/speakers" component={Speakers}></Route>
          <PrivateRoute
            exact
            path="/account/create-company"
            component={CreateCompany}
          />
          <PrivateRoute exact path="/account/company" component={UserCompany} />
          <PrivateRoute
            exact
            path="/account/create-event"
            component={CreateEvent}
          />
          <PrivateRoute
            exact
            path="/profile/bookings"
            component={UserBookings}
          />
          <PrivateRoute exact path="/profile/:userId" component={UserProfile} />
        </Switch>
      </Router>
    </AuthProvider>
  );
}

export default App;
