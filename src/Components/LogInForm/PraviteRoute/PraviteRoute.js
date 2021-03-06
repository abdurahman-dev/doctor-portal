import React, { useContext } from "react";
import { Redirect, Route } from "react-router";
import { MyContext } from "../../../App";
import jwt_decode from "../../../../node_modules/jwt-decode";

const PrivateRoute = ({ children, ...rest }) => {
  const [logInUser, setLogInUser] = useContext(MyContext);
  const isLoggedIn = () => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      return false;
    }
    const decodedToken = jwt_decode(token);
    const currentTime = new Date().getTime() / 1000;
    return decodedToken.exp > currentTime;
  };
  return (
    <Route
      {...rest}
      render={({ location }) =>
        logInUser.email || isLoggedIn() ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
