import React from "react";
import { Navigate } from "react-router-dom";
import { isLoggedIn } from "./Auth";

export const ProtectedRoute: React.FC<{
  Component: React.FC<any>;
  path: any;
  colorInverted?: boolean;
}> = ({ Component, ...rest }) => {
  return isLoggedIn() ? (
    <Component {...rest} />
  ) : (
    <Navigate to="/automato/login/" />
  );
};

export default ProtectedRoute;
