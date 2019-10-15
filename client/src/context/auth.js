import React, { createContext, useState } from "react";
import jwtDecode from "jwt-decode";

const AuthContext = createContext({
  authData: null,
  login: () => {},
  logout: () => {}
});

const AuthProvider = (props) => {
  const initialState = { user: null };

  const [user, setUser] = useState(initialState);

  if (localStorage.getItem("jwtToken")) {
    const decodedToken = jwtDecode(localStorage.getItem("jwtToken"));

    if (decodedToken.exp * 1000 < Date.now()) {
      localStorage.removeItem("jwtToken");
      setUser({ user: null });
    } else {
      initialState.user = decodedToken;
    }
  }

  const login = (userData) => {
    setUser({ user: userData });
    localStorage.setItem("jwtToken", userData.token);
  };

  const logout = () => {
    setUser({ user: null });
    localStorage.removeItem("jwtToken");
  };

  return (
    <AuthContext.Provider
      value={{ authData: user, login, logout }}
      {...props}
    />
  );
};

export { AuthContext, AuthProvider };
