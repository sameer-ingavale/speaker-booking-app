import React, { Component } from "react";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import AuthContext from "./context/AuthContext";
import Cookies from "js-cookie";

import MainNav from "./Components/MainNav";
import CreateAccount from "./pages/Auth/CreateAccount";
import Login from "./pages/Auth/Login";
import Profile from "./pages/PrivatePages/Profile";
import Speakers from "./pages/PublicPages/Speakers";

class App extends Component {
  state = {
    token: "",
    userId: ""
  };

  login = (token, userId, tokenExpiration) => {
    this.setState({ token: token, userId: userId });
  };

  logout = () => {
    this.setState({ token: "", userId: "" });
    document.cookie = "userId=";
    document.cookie = "token=";
  };

  componentDidMount() {
    if (Cookies.get("token")) {
      let token = Cookies.get("token");
      let userId = Cookies.get("userId");
      this.setState({ token: token, userId: userId });
    }
  }

  render() {
    return (
      <BrowserRouter>
        <AuthContext.Provider
          value={{
            token: this.state.token,
            userId: this.state.userId,
            login: this.login,
            logout: this.logout
          }}
        >
          <MainNav />
          {/*  <pre>{JSON.stringify(this.state, null, 2)}</pre> */}
          <Switch>
            {this.state.token && (
              <Redirect from="/login" to="/profile" exact></Redirect>
            )}
            <Redirect from="/" to="/create-account" exact></Redirect>
            <Route path="/create-account" component={CreateAccount}></Route>
            <Route path="/login" component={Login}></Route>
            <Route path="/speakers" component={Speakers}></Route>
            {this.state.token && (
              <Route path="/profile" component={Profile}></Route>
            )}
          </Switch>
        </AuthContext.Provider>
      </BrowserRouter>
    );
  }
}

export default App;
