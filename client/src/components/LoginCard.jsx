import React, { useState } from "react";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";

const LoginCard = ({ onSubmit, onToggleForm, loading, error }) => {
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    console.log(e.target.name, e.target.value);
    setLoginForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(loginForm);
  };

  return (
    <div>
      <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
        <Input
          type="email"
          placeholder="Email"
          label="Email"
          value={loginForm.email}
          name="email"
          onChange={handleChange}
          required
        ></Input>

        <Input
          type="password"
          placeholder="Password"
          label="Password"
          name="password"
          value={loginForm.password}
          onChange={handleChange}
          required
        ></Input>

        <Button className="mt-4" loading={loading}>
          Signin
        </Button>

        <p>
          Don't have an account ?{" "}
          <span
            className="text-primary text-sm underline cursor-pointer"
            role="button"
            tabIndex={1}
            onClick={onToggleForm}
          >
            Register Here
          </span>
        </p>

        {error && <p>{error}</p>}
      </form>
    </div>
  );
};

export default LoginCard;
