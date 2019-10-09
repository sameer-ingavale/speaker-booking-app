import React, { Component } from "react";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";

import CreateAccount from "./pages/Auth/CreateAccount";
import Login from "./pages/Auth/Login";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Redirect from="/" to="/create-account" exact></Redirect>
          <Route path="/create-account" component={CreateAccount}></Route>
          <Route path="/login" component={Login}></Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
