import React from "react";
import "./infoPage.css";
import Navbar from "../../utils/navbar/navbar.js";
import Button from "react-bootstrap/Button";
import Footer from "../../utils/footer/footer.js";
const InfoPage = () => {
  return (
    <div className="infoPage">
      <Navbar />
      <div className="patientName">
        <span className="pn">Tên bệnh nhân: </span>
        <input
          type="text"
          className="pnIn"
          placeholder="Tên bệnh nhân"
          required
        />
      </div>
      <div className="pNumber">
        <span className="pNum">Số điện thoại bệnh nhân</span>
        <input
          type="text"
          className="pNumIn"
          placeholder="Số điện thoại bệnh nhân"
          maxLength={10}
          required
        />
      </div>
      <div className="pComo">
        <span className="pC">Bệnh nền của bệnh nhân</span>
        <textarea
          className="pCC"
          type="text"
          required
          cols={9}
          rows={5}
          maxLength={100}
          placeholder="Bệnh nền của bệnh nhân"
        />
      </div>
      <Button className="search">Tìm kiếm thông tin </Button>
      <div className="fo">
        <Footer />
      </div>
    </div>
  );
};

export default InfoPage;
