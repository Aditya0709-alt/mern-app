import React from "react";

//make an a reusable pageHeader component for any kind of use
export const PageHeader = ({ titleText, description }) => {
  return (
    <div className="container pageHeader">
      <div className="row pt-3">
        <div className="col-lg-12 ">
          <h1 >{titleText}</h1>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-12 mt-3">
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
};
