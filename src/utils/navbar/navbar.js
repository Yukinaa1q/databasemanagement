import React from "react";
import "./navbar.css";
import heart from "../../assets/cardiogram_3004458.png";
const Navbar = () => {
  return (
    <div className="navbar">
      <img className="heart" src={heart} alt="" />
      <div className="navoptions">
        <span className="tex">Liên hệ</span>
        <span className="tex">Báo lỗi</span>
      </div>
    </div>
  );
};

export default Navbar;
