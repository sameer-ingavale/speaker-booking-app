import React, { Component } from "react";
import { BrowserRouter, Route, Redirect } from "react-router-dom";

import CreateAccount from "./pages/Auth/CreateAccount";
import Login from "./pages/Auth/Login";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Redirect from="/" to="/create-account"></Redirect>
        <Route path="/create-account" component={CreateAccount}></Route>
        <Route path="/login" component={Login}></Route>
      </BrowserRouter>
    );
  }
}

export default App;
