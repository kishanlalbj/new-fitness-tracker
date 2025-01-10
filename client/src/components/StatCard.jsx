import React from "react";
import Card from "./ui/Card";

const StatCard = ({ title, value }) => {
  return (
    <div className="text-center">
      <Card>
        <h3 className="text-lg text-primary">{title}</h3>

        <p className="text-4xl font-medium mt-4">{value}</p>
      </Card>
    </div>
  );
};

export default StatCard;
