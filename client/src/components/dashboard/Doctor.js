import React from "react";

const Doctor = (props) => {
  return (
    <div>
      Doctor {props.user.name} {props.token}
    </div>
  );
};

export default Doctor;
