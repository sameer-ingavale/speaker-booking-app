import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import planet from "./planet.png";
import AuthContext from "../context/AuthContext";

import "./mainNav.css";

export default class MainNav extends Component {
  static contextType = AuthContext;

  render() {
    return (
      <header className="navHeader">
        <nav className="navWrapper">
          <div>
            <NavLink to="/speakers">
              <img alt="web-app logo" src={planet} className="logo" />
            </NavLink>
          </div>
          <div className="linkWrapper">
            <ul className="navLinkWrapper">
              <li>
                <NavLink className="navLinks" to="/speakers">
                  Speakers
                </NavLink>
              </li>
              {this.context.token && (
                <li>
                  <NavLink className="navLinks" to="/profile">
                    Profile
                  </NavLink>
                </li>
              )}
              {!this.context.token && (
                <li>
                  <NavLink className="navLinks" to="/login">
                    <i className="user circle icon navIcon"></i>
                    Login
                  </NavLink>
                </li>
              )}
              {this.context.token && (
                <li>
                  <NavLink
                    onClick={this.context.logout}
                    className="navLinks"
                    to="/login"
                  >
                    <i className="sign-out icon navIcon"></i>Logout
                  </NavLink>
                </li>
              )}
            </ul>
          </div>
        </nav>
      </header>
    );
  }
}
