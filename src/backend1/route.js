import React from "react";
import { Routes, Route } from "react-router-dom";
import Prepage from "../components/Prepage/prePage";
import Logpage from "../components/login/logpage";
import Home from "../components/home/home";
import Help from "../components/help/help";
import AddInfoPage from "../components/addInfo/addInfoPage";
import InfoPage from "../components/infoPage/infoPage";
import ListTestResult from "../components/listTestResult/listTestResult";
import Report from "../components/report/report";
const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<Prepage />} />
      <Route path="Login" element={<Logpage />} />
      <Route path="Home" element={<Home />} />
      <Route path="AddInfo" element={<AddInfoPage />} />
      <Route path="InfoSearch" element={<InfoPage />} />
      <Route path="ListTestResult" element={<ListTestResult />} />
      <Route path="Report" element={<Report />} />
      <Route path="Helpi" element={<Help />} />
    </Routes>
  );
};

export default Routing;
