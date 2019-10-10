import React, { Component } from "react";
import { Link } from "react-router-dom";

import "./login.css";
import AuthContext from "../../context/AuthContext";

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: ""
    };
  }

  static contextType = AuthContext;

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const { email, password } = this.state;

    const requestBody = {
      query: `
      query {
        login(email:"${email}", password:"${password}") {
          userId
          token
          tokenExpiration
        }
      }
      `
    };

    const loginResponse = await fetch(
      "https://book-a-speaker.herokuapp.com/graphql",
      {
        method: "POST",
        body: JSON.stringify(requestBody),
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

    const userData = await loginResponse.json();

    if (!userData.data.login.token) {
      throw new Error("No token found");
    }
    const { token, userId, tokenExpiration } = userData.data.login;
    this.context.login(token, userId, tokenExpiration);
    document.cookie = "token=" + token;
    document.cookie = "userId=" + userId;

    console.log(userData);
  };

  render() {
    return (
      <div className="formWrapper">
        <h2>Login</h2>
        <form className="ui form" onSubmit={this.handleSubmit}>
          <div className="ui left icon input loginInput">
            <input
              type="text"
              required
              placeholder="Your Email Here"
              name="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
            <i className="user icon" />
          </div>
          <div className="ui left icon input loginInput">
            <input
              type="password"
              required
              placeholder="Your Password Here"
              name="password"
              value={this.state.password}
              onChange={this.handleChange}
            />
            <i className="lock icon" />
          </div>
          <button className="ui green button" type="submit">
            Submit
          </button>
          <p>
            New to speaker booking?{" "}
            <Link to="/create-account"> Create an account.</Link>{" "}
          </p>
        </form>
      </div>
    );
  }
}
