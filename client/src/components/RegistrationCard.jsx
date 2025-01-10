import React, { useState } from "react";
import Input from "./ui/Input";
import Button from "./ui/Button";

const RegistrationCard = ({ onToggleForm, onSubmit, error }) => {
  const [registerForm, setRegisterForm] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    height: 0,
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });

  const handleChange = ({ target: { name, value } }) => {
    const updatedValue = name === "height" ? Number(value) : value;

    setRegisterForm((prev) => ({
      ...prev,
      [name]: updatedValue,
    }));
  };

  const handleRegister = (e) => {
    e.preventDefault();

    delete registerForm.confirmPassword;

    onSubmit(registerForm);
  };

  return (
    <>
      <div className="mt-4">
        <form className="flex flex-col gap-3" onSubmit={handleRegister}>
          <div className="flex gap-3">
            <Input
              type="text"
              placeholder="First Name"
              label="First Name"
              name="firstName"
              value={registerForm.firstName}
              onChange={handleChange}
              required
            ></Input>

            <Input
              type="text"
              placeholder="Last Name"
              label="Last Name"
              name="lastName"
              value={registerForm.lastName}
              onChange={handleChange}
              required
            ></Input>
          </div>

          <div className="flex items-center gap-3">
            <Input
              type="date"
              label="Date Of Birth"
              name="dateOfBirth"
              value={registerForm.dateOfBirth}
              onChange={handleChange}
              required
            />

            <div className="w-full h-full">
              <label htmlFor="gender" className="block text-sm font-medium">
                Gender
              </label>
              <select
                className="w-full border border-zinc-400 h-"
                id="gender"
                name="gender"
                value={registerForm.gender}
                onChange={handleChange}
                required
              >
                <option value={""}>Select</option>
                <option value={"Male"}>Male</option>
                <option value={"Female"}>Female</option>
              </select>
            </div>
          </div>

          <Input
            type="number"
            placeholder="Height"
            label="Height"
            name="height"
            value={registerForm.height}
            min={100}
            onChange={handleChange}
            required
          ></Input>

          <Input
            type="email"
            placeholder="Email"
            label="Email"
            name="email"
            value={registerForm.email}
            onChange={handleChange}
            required
          ></Input>

          <Input
            type="password"
            placeholder="Password"
            label="Password"
            name="password"
            value={registerForm.password}
            onChange={handleChange}
            required
          ></Input>

          <Input
            type="password"
            placeholder="Confirm Password"
            label="Confirm Password"
            name="confirmPassword"
            value={registerForm.confirmPassword}
            onChange={handleChange}
            required
          ></Input>

          <Button className="mt-4">Register</Button>

          <p>
            Already have an account ?{" "}
            <span
              className="text-primary text-sm underline cursor-pointer"
              onClick={onToggleForm}
            >
              Login Here
            </span>
          </p>

          {error && <p className="text-red-500 text-sm">{error}</p>}
        </form>
      </div>
    </>
  );
};

export default RegistrationCard;
