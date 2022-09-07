import PropTypes from "prop-types";
import { Route, Navigate } from "react-router-dom";
import * as ROUTES from "../constants/routes";

export default function isUserLoggedIn({
  user,
  loggedInPath,
  children,
  ...rest
}) {
  return (
    <Route
      {...rest}
      render={({ location }) => {
        if (!user) {
          return children;
        } else {
          return (
            <Navigate
              to={{ pathname: loggedInPath, state: { from: location } }}
            />
          );
        }
      }}
    ></Route>
  );
}

isUserLoggedIn.propTypes = {
  user: PropTypes.object,
  children: PropTypes.object.isRequired,
};
