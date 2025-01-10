import React, { useContext, useEffect, useState } from "react";
import Card from "../components/ui/Card";
import LoginCard from "../components/LoginCard";
import RegistrationCard from "../components/RegistrationCard";
import { useNavigate } from "react-router-dom";
import { API } from "../utils";
import { AuthContext } from "../contexts/AuthContext";
import { jwtDecode } from "jwt-decode";
import usePrivateApi from "../hooks/usePrivateApi";
import { Loader2Icon } from "lucide-react";

const Auth = () => {
  const navigate = useNavigate();
  const privateAPI = usePrivateApi();

  const [showRegister, setShowRegister] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [pageLoading, setPageLoading] = useState(false);

  const { setUser } = useContext(AuthContext);

  const toggleForms = () => {
    setShowRegister((prev) => !prev);
  };

  const handleRegister = async (user) => {
    try {
      setLoading(true);
      const res = await API.post("/api/v1/auth/register", user);

      if (res.data.success) {
        toggleForms();
      }
    } catch (error) {
      setError(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (creds) => {
    try {
      setLoading(true);
      const res = await API.post("/api/v1/auth/login", creds);

      if (res.data.success) {
        setUser({ accessToken: res.data.data, user: jwtDecode(res.data.data) });
        navigate("/home");
      }
    } catch (error) {
      console.log("Error", error.response.data);
      setError(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setPageLoading(true);
        const res = await privateAPI.get("/api/v1/auth/me");

        if (res.data.success) navigate("/home");
      } catch (err) {
        console.log(err);
      } finally {
        setPageLoading(false);
      }
    };

    fetchProfile();
  }, []);

  return (
    <div className="bg-primary h-screen flex items-center justify-center">
      {pageLoading ? (
        <Loader2Icon className="animate-spin text-white" size={48} />
      ) : (
        <Card style={{ width: "345px" }}>
          <div className="text-center">
            <h1 className="text-lg font-bold">Fitnes Tracker</h1>
          </div>

          {showRegister ? (
            <RegistrationCard
              onSubmit={handleRegister}
              onToggleForm={toggleForms}
              loading={loading}
              error={error}
            />
          ) : (
            <LoginCard
              onSubmit={handleLogin}
              onToggleForm={toggleForms}
              loading={loading}
              error={error}
            />
          )}
        </Card>
      )}
    </div>
  );
};

export default Auth;
