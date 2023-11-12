import React from "react";
import "./addInfoPage.css";
import Navbar from "../../utils/navbar/navbar.js";
import Button from "react-bootstrap/Button";
import Footer from "../../utils/footer/footer.js";
const AddInfoPage = () => {
  return (
    <div className="addInfoPage">
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
        <div className="big2">
          <span className="bigText">Địa chỉ nhà</span>
          <input
            className="bigIn"
            type="text"
            placeholder="Địa chỉ bệnh nhân"
            required
          />
        </div>
        <div className="big3">
          <span className="bigText">Giới tính bệnh nhân </span>
          <input
            className="bigIn"
            type="text"
            placeholder="Giới tính bệnh nhân"
            required
          />
        </div>
        <div className="big4">
          <span className="bigText">Số điện thoại bệnh nhân</span>
          <input
            className="bigIn"
            type="text"
            placeholder="Số điện thoại bệnh nhân"
            maxLength={10}
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
        <div className="big6">
          <span className="bigText">Bệnh nền của bệnh nhân</span>
          <textarea
            className="bigIn1"
            type="text"
            required
            cols={9}
            rows={5}
            maxLength={100}
            placeholder="Bệnh nền của bệnh nhân"
          />
        </div>
      </div>
      <Button className="bigBut">Xác nhận thêm bệnh nhân</Button>
      <div className="fo1">
        <Footer />
      </div>
    </div>
  );
};

export default AddInfoPage;
