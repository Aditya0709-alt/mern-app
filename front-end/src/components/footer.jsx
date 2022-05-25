import React from "react";
import "../styles/header.css";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="p-2 text-center mt-5 footer">
      <Link className="navbar-brand" to="/">
      FoodTrip <i className="fas fa-utensils"></i>
      </Link>
      <b>{new Date().getFullYear()}</b>
    </div>
  );
};
export default Footer;
