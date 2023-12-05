import React, { useState, useEffect } from "react";
import "./listTestResult.css";
import Navbar from "../../utils/navbar/navbar.js";
import Button from "react-bootstrap/Button";
import Footer from "../../utils/footer/footer.js";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
const ListTestResult = () => {
  const navigate = useNavigate();
  const [patient_id, setPatient_id] = useState("");
  const [info, setInfo] = useState(null);
  const [error, setError] = useState(null);
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
  const handleOnChange = (e) => {
    setPatient_id(e.target.value);
  };
  const handleError = (err) =>
    toast.error(err, {
      position: "bottom-left",
    });
  const handleSuccess = (msg) =>
    toast.success(msg, {
      position: "bottom-left",
    });
  const fetchData = async () => {
    try {
      if (!patient_id.trim()) {
        handleError("Patient ID must have a value");
        return;
      }
      const response = await axios.get(
        `http://localhost:8000/patients/${patient_id}/tests`,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setInfo(response.data);
      console.log(response.data);
      handleSuccess("Your process is successfully completed");
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setError("Patient ID not found");
        handleError("Patient ID not found");
      } else if (error.response && error.response.status === 401) {
        setError("Unauthorized");
        handleError("Unauthorized");
      }

      console.log(error);
    }
  };
  return (
    <div className="listTestResult">
      <Navbar />
      <div className="big">
        <div className="big5">
          <span className="bigText">Patient_ID</span>
          <input
            className="bigIn"
            type="text"
            placeholder="Patient_ID"
            maxLength={10}
            value={patient_id}
            onChange={handleOnChange}
            required
          />
        </div>
      </div>
      <Button className="bigBut" onClick={fetchData}>
        List test results
      </Button>
      {info && (
        <div className="vertical-table">
          <table className="result-table">
            <tr className="rowss">
              <tr className="rowss">
                <th className="headss">Test_id</th>
                <th className="headss">Date_time</th>
                <th className="headss">Respiratory_result</th>
                <th className="headss">SPO2_result</th>
                <th className="headss">Quick_test_result</th>
                <th className="headss">Cycle_threshold_value</th>
                <th className="headss">PCR_result</th>
                <th className="headss">Cycle_threshold_value</th>
              </tr>
              {info.map((val, key) => {
                return (
                  <tr className="rowss" key={key}>
                    <td className="cells">{val[0]}</td>
                    <td className="cells">
                      {new Date(val[1]).toLocaleString()}
                    </td>
                    <td className="cells">{val[2] ? val[2] : "-"}</td>
                    <td className="cells">{val[3] ? val[3] : "-"}</td>
                    <td className="cells">{val[4] ? val[4] : "-"}</td>
                    <td className="cells">{val[5] ? val[5] : "-"}</td>
                    <td className="cells">{val[6] ? val[6] : "-"}</td>
                    <td className="cells">{val[7] ? val[7] : "-"}</td>
                  </tr>
                );
              })}
            </tr>
          </table>
        </div>
      )}
      <div className="fo2">
        <Footer />
      </div>
      <ToastContainer />
    </div>
  );
};

export default ListTestResult;
