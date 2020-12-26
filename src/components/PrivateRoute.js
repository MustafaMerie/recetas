import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "../StateStore/AuthProvider";
import PropTypes from "prop-types";

const PrivateRoute = ({ children, ...rest }) => {
  const { currentUser } = useContext(AuthContext);
  return (
    <Route
      {...rest}
      render={() =>
        currentUser.isAuthenticated ? (
          children
        ) : (
            <Redirect
              to={{
                pathname: "/",
              }}
            />
          )
      }
    />
  );
};

export default PrivateRoute;

PrivateRoute.propTypes = {
  children: PropTypes.object,
};
