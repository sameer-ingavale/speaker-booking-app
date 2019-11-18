import React, { useState, useContext } from "react";
import {
  Button,
  Form,
  Card,
  Grid,
  Transition,
  Message,
  Header
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { AuthContext } from "../../context/auth";
import "./register.css";

function Register(props) {
  const context = useContext(AuthContext);
  const options = [
    { key: "1", text: "Speaker", value: "SPEAKER" },
    { key: "2", text: "Event Planner", value: "EVENT_PLANNER" }
  ];

  const genderOptions = [
    { key: "1", text: "Male", value: "Male" },
    { key: "2", text: "Female", value: "Female" },
    { key: "3", text: "Other", value: "Other" }
  ];

  const [errors, setErrors] = useState({});
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    email: "",
    password: "",
    confirmPassword: "",
    userType: "SPEAKER"
  });

  const onChange = (event, result) => {
    const { name, value } = result || event.target;
    setValues({ ...values, [name]: value });
  };

  const [registerUser, { loading }] = useMutation(REGISTER_USER, {
    update(proxy, { data: { register: userData } }) {
      context.login(userData);
      props.history.push("/");
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: values
  });

  const onSubmit = (event) => {
    event.preventDefault();
    registerUser();
  };

  return (
    <Grid className="mainBody">
      <Grid.Column className="formCardColumn">
        <Header className="loginHeader">Welcome</Header>
        <p className="loginSubheading">
          Register to start booking speakers and creating events
        </p>
        <Card fluid className="registerCard">
          <Card.Content>
            <Form
              noValidate
              onSubmit={onSubmit}
              className={loading ? "loading" : ""}
            >
              <Form.Group widths="equal">
                <Form.Input
                  label="First Name"
                  placeholder="First Name"
                  name="firstName"
                  type="text"
                  value={values.firstName}
                  onChange={onChange}
                  error={errors.firstName ? true : false}
                />
                <Form.Input
                  label="Last Name"
                  placeholder="Last Name"
                  name="lastName"
                  type="text"
                  value={values.lastName}
                  onChange={onChange}
                  error={errors.lastName ? true : false}
                />
              </Form.Group>
              <Form.Group widths="equal">
                <Form.Dropdown
                  placeholder="I am a"
                  name="userType"
                  label="I am a.."
                  selection
                  onChange={onChange}
                  options={options}
                  value={values.userType}
                />
                <Form.Dropdown
                  label="Gender"
                  placeholder="Gender"
                  name="gender"
                  selection
                  options={genderOptions}
                  value={values.gender}
                  onChange={onChange}
                />
              </Form.Group>
              <Form.Input
                label="Email"
                placeholder="Email"
                name="email"
                type="text"
                value={values.email}
                onChange={onChange}
                error={errors.email ? true : false}
              />
              <Form.Group widths="equal">
                <Form.Input
                  label="Password"
                  placeholder="Password"
                  name="password"
                  type="password"
                  value={values.password}
                  onChange={onChange}
                  error={errors.password ? true : false}
                />
                <Form.Input
                  label="Confirm Password"
                  placeholder="Confirm Password"
                  name="confirmPassword"
                  type="password"
                  value={values.confirmPassword}
                  onChange={onChange}
                  error={errors.confirmPassword ? true : false}
                />
              </Form.Group>

              <Button type="submit" primary className="formCardButton">
                Register
              </Button>
            </Form>
          </Card.Content>
        </Card>
        <p>
          Already have an account?{" "}
          <Header className="createAccountText" as={Link} to={"/login"}>
            Login instead.
          </Header>
        </p>
        <Transition.Group animation="fade up" duration={500}>
          {Object.keys(errors).length > 0 && (
            <Message
              className="registerErrorMessageBox"
              error
              list={Object.values(errors)}
            ></Message>
          )}
        </Transition.Group>
      </Grid.Column>
    </Grid>
  );
}

const REGISTER_USER = gql`
  mutation register(
    $firstName: String!
    $lastName: String!
    $gender: String!
    $userType: UserTypeEnum!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      input: {
        firstName: $firstName
        lastName: $lastName
        gender: $gender
        userType: $userType
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      userId
      token
      firstName
      userType
    }
  }
`;

export default Register;
