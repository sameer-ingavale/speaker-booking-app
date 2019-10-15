import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
import "./App.css";

import MenuBar from "./Components/MenuBar";
import Register from "./pages/Auth/Register";
import Home from "./pages/PublicPages/Home";
import Login from "./pages/Auth/Login";
import Speakers from "./pages/PublicPages/Speakers";
import Events from "./pages/PublicPages/Events";

function App() {
  return (
    <Router>
      <MenuBar />
      {/*  <pre>{JSON.stringify(this.state, null, 2)}</pre> */}
      <Route exact path="/" component={Home}></Route>
      <Route exact path="/register" component={Register}></Route>
      <Route exact path="/login" component={Login}></Route>
      <Route exact path="/events" component={Events}></Route>
      <Route exact path="/speakers" component={Speakers}></Route>
    </Router>
  );
}

export default App;
