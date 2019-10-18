import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";

import { AuthContext } from "../context/auth";

function PrivateRoute({ component: Component, ...rest }) {
  const {
    authData: { user }
  } = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={(props) =>
        !user ? <Redirect to="/login" /> : <Component {...props} />
      }
    />
  );
}

export default PrivateRoute;
