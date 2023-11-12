import React from "react";
import "./report.css";
import Navbar from "../../utils/navbar/navbar.js";
import Button from "react-bootstrap/Button";
import Footer from "../../utils/footer/footer.js";
const Report = () => {
  return (
    <div className="report">
      <Navbar />
      <div className="big">
        <div className="big1">
          <span className="bigText">Tên bệnh nhân</span>
          <input
            type="text"
            className="bigIn"
            placeholder="Tên bệnh nhân"
            required
          />
        </div>
        <div className="big5">
          <span className="bigText">Mã số định danh</span>
          <input
            className="bigIn"
            type="text"
            placeholder="Mã số định danh"
            required
          />
        </div>
      </div>
      <Button className="bigBut">Xác nhận báo cáo</Button>
      <div className="fo">
        <Footer />
      </div>
    </div>
  );
};

export default Report;
