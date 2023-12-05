import React, { useState } from "react";
import "./logpage.css";
import Navbar from "../../utils/navbar/navbar.js";
import Button from "react-bootstrap/Button";
import Footer from "../../utils/footer/footer.js";
import Password from "../../utils/password/password.js";
import Cookies from "js-cookie";
import { useNavigate, NavLink } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
const Logpage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const handleOnChange = (e) => {
    setUsername(e.target.value);
  };
  const [password, setPassword] = useState("");
  const handleOnChange1 = (e) => {
    setPassword(e.target.value);
  };
  const handleError = (err) =>
    toast.error(err, {
      position: "bottom-left",
    });
  const handleSuccess = (msg) =>
    toast.success(msg, {
      position: "bottom-left",
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:8000/login",
        {
          username,
          password,
        },
        { withCredentials: true }
      );
      console.log(data);
      const { success, message, token } = data;

      if (success) {
        handleSuccess(message);

        Cookies.set("token", token, { expires: 1 });
        setTimeout(() => {
          navigate("/Home");
        }, 1000);
      } else {
        handleError("Invalid Account");
      }
    } catch (error) {
      console.log(error);
      handleError("Invalid Account");
    }
    /* setInputValue({
      ...inputValue,
      username: "",
      password: "",
    });*/
    setUsername("");
    setPassword("");
  };
  return (
    <div className="logInPage">
      <Navbar />
      <span className="logtex">Centralized Authentication Service</span>
      <p className="no">
        To log in, you need to use the assigned administrator account. This
        account allows access to all data and functions of the website.
      </p>
      <p className="no1">
        For security reasons, please log out of the web browser after use to
        avoid account information leakage.
      </p>
      <div className="loginframe">
        <span className="title">Enter account information</span>
        <hr />
      </div>
      <form onSubmit={handleSubmit}>
        <input
          className="username"
          type="text"
          placeholder="Username"
          onChange={handleOnChange}
          value={username}
          required
        />
        <div className="pass">
          <Password value={password} onChange={handleOnChange1} required />
        </div>
        <NavLink to={"/Helpi"}>
          <div className="help">Log in problems ?</div>
        </NavLink>
        <Button className="logbutt" type="submit">
          Log in
        </Button>
      </form>
      <div className="fo">
        <Footer />
      </div>
      <ToastContainer />
    </div>
  );
};

export default Logpage;
