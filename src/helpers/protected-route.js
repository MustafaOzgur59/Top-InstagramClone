import PropTypes from "prop-types";
import { Route, Navigate } from "react-router-dom";
import * as ROUTES from "../constants/routes";

export default function ProtectedRoute({ user, children, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) => {
        if (user) {
          return children;
        } else {
          return <Navigate to={{ pathname: ROUTES.LOGIN }} />;
        }
      }}
    ></Route>
  );
}

ProtectedRoute.propTypes = {
  user: PropTypes.object,
  children: PropTypes.object.isRequired,
};
