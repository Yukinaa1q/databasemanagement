import React from "react";
import "./navbar.css";
import heart from "../../assets/cardiogram_3004458.png";
import { NavLink } from "react-router-dom";
const Navbar = () => {
  return (
    <div className="navbar">
      <NavLink to={"/Home"}>
        <img className="heart" src={heart} alt="" />
      </NavLink>
      <div className="navoptions">
        <a href="https://www.facebook.com/tri.phuoc.395" target="blank">
          <span className="tex">Contact</span>
        </a>
        <a
          href="https://docs.google.com/forms/d/e/1FAIpQLSeL8AaCAsP4iiv0omOdBo6fnYJFfVwuu2cd8xwcApfHACC9wA/viewform"
          target="blank"
        >
          <span className="tex">Bug report</span>
        </a>
      </div>
    </div>
  );
};

export default Navbar;
