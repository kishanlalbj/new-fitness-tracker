import React from "react";
import useAuth from "../hooks/useAuth";
import { Navigate } from "react-router-dom";

const Protected = ({ children }) => {
  const { user } = useAuth();

  if (user?.accessToken) return children;

  return <Navigate to={"/"} />;
};

export default Protected;
