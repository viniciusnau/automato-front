import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isLoggedIn } from "./Auth";

export const ProtectedRoute: React.FC<{
  Component: React.FC<any>;
  path: any;
  colorInverted?: boolean;
}> = ({ Component, ...rest }) => {
  const isLogged = isLoggedIn();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLogged) {
      navigate("/automato/login/");
    }
  }, [isLogged, navigate]);

  return isLogged ? <Component {...rest} /> : null;
};

export default ProtectedRoute;
