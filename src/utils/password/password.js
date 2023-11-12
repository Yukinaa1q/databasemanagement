import React from "react";
import { useState } from "react";
import "./password.css";
import logo from "../../assets/invisible 1.png";
const Password = () => {
  const [PasswordShown, setPasswordShown] = useState(false);
  const togglePassword = () => {
    setPasswordShown(!PasswordShown);
  };
  return (
    <div className="pav">
      <input
        className="pav1"
        type={PasswordShown ? "text" : "password"}
        placeholder="Mật khẩu"
        maxLength={16}
        minLength={4}
      />
      <img className="invi" onClick={togglePassword} src={logo} alt="" />
    </div>
  );
};

export default Password;
