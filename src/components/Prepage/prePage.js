import React from "react";
import "./prePage.css";
import Navbar from "../../utils/navbar/navbar.js";
import Button from "react-bootstrap/Button";
import pic from "../../assets/10613398_10130 1.png";
import Footer from "../../utils/footer/footer.js";
import { useNavigate } from "react-router-dom";
const Prepage = () => {
  const navigate = useNavigate();
  return (
    <div className="prePage">
      <Navbar />
      <div className="introText">
        Welcome to the Quarantine Management system
      </div>
      <Button className="logInButton" onClick={() => navigate("Login")}>
        Log in
      </Button>
      <img className="introPic" src={pic} alt="" />
      <div className="fo">
        <Footer />
      </div>
    </div>
  );
};

export default Prepage;
