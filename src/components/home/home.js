import React, { useState, useEffect } from "react";
import "./home.css";
import Navbar from "../../utils/navbar/navbar.js";
import Button from "react-bootstrap/Button";
import Footer from "../../utils/footer/footer.js";
import pic1 from "../../assets/doctor-made-out-paper 1.png";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Cookies from "js-cookie";

const Home = () => {
  const navigate = useNavigate();

  const [token, setToken] = useState("");

  useEffect(() => {
    try {
      // Retrieve the token from the cookie
      const storedToken = Cookies.get();

      // Set the token in the component state
      setToken(storedToken);

      // Redirect to the login page if no token is found
      if (!storedToken) {
        navigate("/Login");
      }
    } catch (error) {
      console.error("Error checking authentication:", error);
      // Handle error (e.g., redirect to login page)
      navigate("/Login");
    }
  }, [navigate]);
  const logout = () => {
    Cookies.remove("token", { expires: 1 });
    navigate("/Login");
  };

  return (
    <div className="homePage">
      <Navbar />
      <span className="logout" onClick={logout}>
        Log out
      </span>
      <div className="in">
        Welcome back !<br /> What do you want to do ?
      </div>
      <img className="homePic" src={pic1} alt="" />
      <div className="menu">
        <Button className="option" onClick={() => navigate("/InfoSearch")}>
          Search patient's information (PID)
        </Button>
        <Button className="option" onClick={() => navigate("/InfoSearch1")}>
          Search patient's information (Phone)
        </Button>
        <Button className="option" onClick={() => navigate("/AddInfo")}>
          Add new patient
        </Button>
        <Button className="option" onClick={() => navigate("/ListTestResult")}>
          List patient's test results
        </Button>
        <Button className="option" onClick={() => navigate("/Report")}>
          Make a detailed report about patient's information
        </Button>
      </div>
      <div className="fo">
        <Footer />
      </div>

      <ToastContainer />
    </div>
  );
};

export default Home;
