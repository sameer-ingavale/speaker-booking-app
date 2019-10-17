import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
import "./App.css";
import { AuthProvider } from "./context/auth";
import AuthRoute from "./util/AuthRoute";
import PrivateRoute from "./util/PrivateRoute";

import MenuBar from "./Components/MenuBar/MenuBar";
import Register from "./pages/Auth/register/Register";
import Home from "./pages/PublicPages/Home";
import Login from "./pages/Auth/login/Login";
import Speakers from "./pages/PublicPages/Speakers";
import Events from "./pages/PublicPages/events/Events";
import Profile from "./pages/PrivatePages/Profile";
import CreateCompany from "./pages/PrivatePages/CreateCompany";
import Company from "./pages/PrivatePages/Company";
import CreateEvent from "./pages/PrivatePages/createEvent/CreateEvent";

function App() {
  return (
    <AuthProvider>
      <Router>
        <MenuBar />
        {/*  <pre>{JSON.stringify(this.state, null, 2)}</pre> */}
        <Route exact path="/" component={Home}></Route>
        <AuthRoute exact path="/register" component={Register}></AuthRoute>
        <AuthRoute exact path="/login" component={Login}></AuthRoute>
        <Route exact path="/events" component={Events}></Route>
        <Route exact path="/speakers" component={Speakers}></Route>
        <PrivateRoute
          exact
          path="/account/create-company"
          component={CreateCompany}
        />
        <PrivateRoute exact path="/account/company" component={Company} />
        <PrivateRoute
          exact
          path="/account/create-event"
          component={CreateEvent}
        />
        <PrivateRoute exact path="/profile" component={Profile} />
      </Router>
    </AuthProvider>
  );
}

export default App;
