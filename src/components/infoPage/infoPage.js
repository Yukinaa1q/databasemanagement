import React, { useState, useEffect } from "react";
import "./infoPage.css";
import Navbar from "../../utils/navbar/navbar.js";
import Button from "react-bootstrap/Button";
import Footer from "../../utils/footer/footer.js";
import { ToastContainer, toast } from "react-toastify";
import Cookies from "js-cookie";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const InfoPage = () => {
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
        `http://localhost:8000/patients/${patient_id}`,
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
    <div className="infoPage">
      <Navbar />

      <div className="patientName">
        <span className="pn">Patient_ID: </span>
        <input
          type="text"
          className="pnIn"
          placeholder="Patient_ID"
          maxLength={10}
          value={patient_id}
          onChange={handleOnChange}
        />
      </div>
      <Button className="search" onClick={fetchData}>
        Search
      </Button>
      {info && (
        <div className="horizontal-table">
          <h2>Patient Details</h2>
          <table className="result-table">
            <tbody>
              {Object.entries(info).map(([key, value]) => (
                <tr id="table-row" key={key}>
                  <td id="table-cell">{key}:</td>
                  <td id="table-cell">
                    {Array.isArray(value) ? value.join(", ") : value}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <div className="fo1">
        <Footer />
      </div>
      <ToastContainer />
    </div>
  );
};

export default InfoPage;
