import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./mainAuth.css";

export default class CreateAccount extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password: ""
    };
  }

  handleChange = (event) => {
    const { name } = event.target;
    const { value } = event.target;

    this.setState({ [name]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const { firstName, lastName, email, password } = this.state;

    const requestBody = {
      query: `
      mutation {
        createUser(input: {firstName:"${firstName}", lastName:"${lastName}", email:"${email}", password:"${password}"}) {
          _id,
          firstName
        }
      }
      `
    };

    fetch("https://book-a-speaker.herokuapp.com/graphql", {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then((res) => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Failed!");
        }
        return res.json();
      })
      .then((resData) => {
        console.log(resData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    return (
      <div className="formWrapper">
        <h2>Create Account</h2>
        <form className="ui form" onSubmit={this.handleSubmit}>
          <input
            className="signupInput"
            type="text"
            required
            placeholder="Your First Name Here"
            name="firstName"
            onChange={this.handleChange}
            value={this.state.firstName}
          />
          <input
            className="signupInput"
            type="text"
            required
            placeholder="Your Last Name Here"
            name="lastName"
            onChange={this.handleChange}
            value={this.state.lastName}
          />
          <input
            className="signupInput"
            type="text"
            required
            placeholder="Your Email Here"
            name="email"
            onChange={this.handleChange}
            value={this.state.email}
          />
          <input
            className="signupInput"
            type="password"
            required
            placeholder="New Password"
            name="password"
            onChange={this.handleChange}
            value={this.state.password}
          />
          <input
            className="signupInput"
            type="password"
            required
            placeholder="Re-enter Password"
            name="password"
            onChange={this.handleChange}
            value={this.state.password}
          />
          <input
            className="ui green button fluid"
            type="submit"
            value="Submit"
          />
          <p>
            By creating an account, you agree to our{" "}
            <a
              href="https://www.google.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Conditions of Use
            </a>{" "}
            and{" "}
            <a
              href="https://www.google.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Privacy Notice.
            </a>
          </p>
        </form>
        <p>
          Already have an account? <Link to="/login"> Login instead.</Link>{" "}
        </p>
      </div>
    );
  }
}
