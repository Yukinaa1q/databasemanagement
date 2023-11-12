import React from "react";
import "./help.css";
import Navbar from "../../utils/navbar/navbar";
import Footer from "../../utils/footer/footer";
import bigPic from "../../assets/3293465 1.png";
const Help = () => {
  return (
    <div className="helpi">
      <Navbar />
      <img className="helpiImg" src={bigPic} alt="" />
      <div className="helpiTex">
        Bạn muốn biết thêm thông tin hoặc muốn được trợ giúp?
      </div>
      <div className="helpiTex2">
        Hãy gửi email về địa chỉ support@hcmut.edu.vn trình bày về vấn đề mình
        gặp phải (bao gồm cả trường hợp quên mật khẩu) để được hỗ trợ tận tình
        nhất.
      </div>
      <Footer />
    </div>
  );
};

export default Help;
