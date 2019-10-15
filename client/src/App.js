import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
import "./App.css";
import { AuthProvider } from "./context/auth";
import AuthRoute from "./util/AuthRoute";
import PrivateRoute from "./util/PrivateRoute";

import MenuBar from "./Components/MenuBar";
import Register from "./pages/Auth/Register";
import Home from "./pages/PublicPages/Home";
import Login from "./pages/Auth/Login";
import Speakers from "./pages/PublicPages/Speakers";
import Events from "./pages/PublicPages/Events";
import Profile from "./pages/PrivatePages/Profile";

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
        <PrivateRoute exact path="/profile" component={Profile} />
      </Router>
    </AuthProvider>
  );
}

export default App;
