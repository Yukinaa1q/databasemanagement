import React from "react";
import "./logpage.css";
import Navbar from "../../utils/navbar/navbar.js";
import Button from "react-bootstrap/Button";
import Footer from "../../utils/footer/footer.js";
import Password from "../../utils/password/password.js";
import { useNavigate } from "react-router-dom";

const Logpage = () => {
  const navigate = useNavigate();
  return (
    <div className="logInPage">
      <Navbar />
      <span className="logtex">Dịch vụ xác thực tập trung</span>
      <p className="no">
        Để đăng nhập, bạn cần sử dụng tài khoản quản trị viên được cấp phát. Tài
        khoản này cho phép truy cập toàn bộ dữ liệu và các chức năng của web.
      </p>
      <p className="no1">
        Vì lý do an toàn, bạn hãy đăng xuất khỏi trình duyệt web sau khi sử dụng
        xong để tránh việc rò rỉ thông tin tài khoản.
      </p>
      <div className="loginframe">
        <span className="title">Nhập thông tin tài khoản</span>
        <hr />
      </div>
      <input className="username" type="text" placeholder="Tên đăng nhập" />
      <div className="pass">
        <Password />
      </div>
      <div className="help">Trợ giúp đăng nhập?</div>
      <Button className="logbutt" onClick={() => navigate("/Home")}>
        Đăng nhập
      </Button>
      <div className="fo">
        <Footer />
      </div>
    </div>
  );
};

export default Logpage;
