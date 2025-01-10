import React from "react";
import Header from "../components/Header";
import { Outlet, useNavigate } from "react-router-dom";
import usePrivateApi from "../hooks/usePrivateApi";
import useAuth from "../hooks/useAuth";

const Root = () => {
  const privateAPI = usePrivateApi();
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    const res = await privateAPI.post("/api/v1/auth/logout");

    if (res.data.success) {
      setUser(null);
      navigate("/");
    }
  };

  return (
    <>
      <Header onSignOut={handleSignOut} />

      <div className="container mt-6">
        <Outlet />
      </div>
    </>
  );
};

export default Root;
