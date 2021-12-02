import React from "react";
import styled, { keyframes } from "styled-components";

const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const Spinner = styled.div`
  animation: ${rotate360} 1s linear infinite;
  transform: translateZ(0);
  border-top: 2px solid grey;
  border-right: 2px solid grey;
  border-bottom: 2px solid grey;
  border-left: 4px solid black;
  background: transparent;
  width: 80px;
  height: 80px;
  border-radius: 50%;
`;

const CustomLoader = (props) => {
  return (
    <div style={{ padding: "24px" }}>
      {props.check ? <Spinner style={{ marginLeft: "47%" }} /> : <Spinner />}
      <div>Loading...</div>
    </div>
  );
};

export default CustomLoader;
