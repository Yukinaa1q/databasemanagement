import React from "react";
import "./home.css";
import Navbar from "../../utils/navbar/navbar.js";
import Button from "react-bootstrap/Button";
import Footer from "../../utils/footer/footer.js";
import pic1 from "../../assets/doctor-made-out-paper 1.png";
import { useNavigate, Outlet } from "react-router-dom";
const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="homePage">
      <Navbar />
      <div className="in">
        Chào mừng bạn quay trở lại ! Hôm nay bạn muốn làm gì ?
      </div>
      <img className="homePic" src={pic1} alt="" />
      <div className="menu">
        <Button className="option" onClick={() => navigate("/InfoSearch")}>
          Tìm kiếm thông tin bệnh nhân
        </Button>
        <Button className="option" onClick={() => navigate("/AddInfo")}>
          Thêm mới bệnh nhân
        </Button>
        <Button className="option" onClick={() => navigate("/ListTestResult")}>
          Liệt kê các kết quả test của bệnh nhân
        </Button>
        <Button className="option" onClick={() => navigate("/Report")}>
          Viết báo cáo tổng thể của bệnh nhân
        </Button>
      </div>
      <div className="fo">
        <Footer />
      </div>
      <Outlet />
    </div>
  );
};

export default Home;
