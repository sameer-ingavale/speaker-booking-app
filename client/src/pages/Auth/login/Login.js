import React, { useState, useContext } from "react";
import {
  Button,
  Form,
  Segment,
  Grid,
  Responsive,
  Transition,
  Message
} from "semantic-ui-react";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { AuthContext } from "../../../context/auth";

function Login(props) {
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState({});
  const [values, setValues] = useState({
    email: "",
    password: ""
  });

  const onChange = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    update(
      proxy,
      {
        data: { login: userData }
      }
    ) {
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
    loginUser();
  };

  return (
    <div className="mainWrapper">
      <Grid centered columns={2} doubling padded={"horizontally"}>
        <Grid.Column>
          {/* <pre>{JSON.stringify(context.authData, null, 2)}</pre> */}
          <Responsive as={Segment}>
            <Form
              noValidate
              onSubmit={onSubmit}
              className={loading ? "loading" : ""}
            >
              <Form.Input
                label="Email"
                placeholder="Email"
                name="email"
                type="text"
                value={values.email}
                onChange={onChange}
                error={errors.email ? true : false}
              />
              <Form.Input
                label="Password"
                placeholder="Password"
                name="password"
                type="password"
                value={values.password}
                onChange={onChange}
                error={errors.password ? true : false}
              />
              <Button type="submit" primary>
                Login
              </Button>
            </Form>
          </Responsive>
          <Transition.Group animation="fade up" duration={500}>
            {Object.keys(errors).length > 0 && (
              <Message error list={Object.values(errors)}></Message>
            )}
          </Transition.Group>
        </Grid.Column>
      </Grid>
    </div>
  );
}

const LOGIN_USER = gql`
  mutation register($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      userId
      token
      firstName
      userType
    }
  }
`;

export default Login;
