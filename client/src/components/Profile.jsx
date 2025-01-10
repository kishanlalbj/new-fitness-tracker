import React from "react";
import Card from "../components/ui/Card";
import moment from "moment";

const Profile = ({ firstName, lastName, height, dateOfBirth }) => {
  return (
    <Card>
      <div className="flex gap-4 items-center  w-full">
        <img
          src="https://i.pravatar.cc/100"
          className="rounded-full w-16 h-16"
        ></img>

        <div className="flex flex-col gap-1">
          <div>
            <p className="text-lg">
              {firstName} {lastName}
            </p>
          </div>

          <div>
            <p className="text-sm">
              {moment(dateOfBirth).format("DD MMM, YYYY")}
            </p>
          </div>

          <div>
            <p className="text-sm">{height} cm</p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default Profile;
