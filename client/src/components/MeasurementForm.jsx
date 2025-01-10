import React, { useState } from "react";
import Card from "./ui/Card";
import Input from "./ui/Input";
import Button from "./ui/Button";

const MeasurementForm = ({ onSubmit, loading, error }) => {
  const [stats, setStats] = useState({
    weight: "",
    waist: "",
    neck: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    onSubmit(stats);
  };

  const handleChange = (e) => {
    let value;
    if (
      e.target.name === "weight" ||
      e.target.name === "neck" ||
      e.target.name === "waist"
    ) {
      value = Number(e.target.value);
    } else {
      value = e.target.value;
    }

    setStats((prev) => ({
      ...prev,
      [e.target.name]: value,
    }));
  };

  return (
    <div>
      <Card>
        {/* <div className="mb-4">
              <h2 className="text-xl font-semibold">Measurement Form</h2>
            </div> */}

        <form
          className="flex flex-col items-start justify-stretch gap-4"
          onSubmit={handleSubmit}
        >
          {/* <Input
            type="date"
            max={Date.now().toString()}
            name="date"
            label={"Date"}
            onChange={handleChange}
            value={stats.date}
            required
          ></Input> */}
          <Input
            type="number"
            min={0}
            max={100}
            step={"any"}
            name="weight"
            placeholder="Weight"
            label="Weight"
            onChange={handleChange}
            value={stats.weight}
            required
          ></Input>

          <Input
            type="number"
            min={0}
            max={100}
            step={"any"}
            name="neck"
            placeholder="Neck"
            label="Neck"
            onChange={handleChange}
            value={stats.neck}
            required
          ></Input>

          <Input
            type="number"
            min={0}
            max={150}
            step={"any"}
            name="waist"
            placeholder="Waist"
            label="Waist"
            onChange={handleChange}
            value={stats.waist}
            required
          ></Input>

          <Button type="submit" className="w-full" loading={loading}>
            Add
          </Button>

          {error && <p>{error}</p>}
        </form>
      </Card>
    </div>
  );
};

export default MeasurementForm;
