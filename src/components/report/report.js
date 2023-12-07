import React, { useState, useEffect } from "react";
import "./report.css";
import Navbar from "../../utils/navbar/navbar.js";
import Button from "react-bootstrap/Button";
import Footer from "../../utils/footer/footer.js";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import PrescriptionT from "../../utils/prescriptionT/prescriptionT.js";
const Report = () => {
  const navigate = useNavigate();
  const [patient_id, setPatient_id] = useState("");
  const [info, setInfo] = useState(null);
  const [error, setError] = useState(null);
  const [token, setToken] = useState("");
  const [prescriptionData, setPrescriptionData] = useState([]);
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
        `http://localhost:8000/patients/${patient_id}/details`,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setInfo(response.data);
      console.log(response.data);
      const extractedData = {
        medications1: response.data.medications1,
        medications2: response.data.medications2,
        medications3: response.data.medications3,
      };
      setPrescriptionData(extractedData);
      console.log(extractedData);
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
  useEffect(() => {
    console.log("Updated info state:", info);
  }, [info]);
  return (
    <div className="report">
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
        Make a report
      </Button>

      {info && info.demographicInfo && (
        <>
          <h2 className="header1">DemographicInfo </h2>
          <div className="vertical-table1">
            <table className="result-table">
              <thead>
                <tr className="rowss">
                  <th className="headss1">Patient_ID</th>
                  <th className="headss1">Patient_full_name</th>
                  <th className="headss1">ID</th>
                  <th className="headss1">Phone</th>
                  <th className="headss1">Gender</th>
                  <th className="headss1">Address</th>
                </tr>
              </thead>
              <tbody>
                <tr className="rowss">
                  <td className="cells1">{info.demographicInfo[0]}</td>
                  <td className="cells1">{info.demographicInfo[1]}</td>
                  <td className="cells1">{info.demographicInfo[2]}</td>
                  <td className="cells1">{info.demographicInfo[3]}</td>
                  <td className="cells1">{info.demographicInfo[4]}</td>
                  <td className="cells1">{info.demographicInfo[5]}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </>
      )}
      {info && info.comorbidities && (
        <>
          <h2 className="header2">Comorbidities </h2>
          <div className="vertical-table2">
            <table className="result-table">
              <tbody>
                <tr id="table-rows">
                  <td className="cells1">
                    <strong>Comorbidities</strong>
                  </td>
                  <td className="cells1">
                    {info.comorbidities.map((value, index) => (
                      <span key={index}>
                        {value.join(", ")}
                        {index < info.comorbidities.length - 1 && ", "}
                      </span>
                    ))}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </>
      )}
      {info && info.symptoms && (
        <>
          <h2 className="header3">Symptomps </h2>
          <div className="vertical-table3">
            <table className="result-table">
              <thead>
                <tr className="rowss">
                  <th className="headss1">Symptom_Name</th>
                  <th className="headss1">Start_date</th>
                  <th className="headss1">End_date</th>
                  <th className="headss1">Is_Serious</th>
                </tr>
              </thead>
              <tbody>
                {info.symptoms.map((value, index) => {
                  return (
                    <tr className="rowss" key={index}>
                      <td className="cells1">{value[0] ? value[0] : "-"}</td>
                      <td className="cells1">
                        {value[1] ? new Date(value[1]).toLocaleString() : "-"}
                      </td>
                      <td className="cells1">
                        {value[2] ? new Date(value[2]).toLocaleString() : "-"}
                      </td>
                      <td className="cells1">{value[3] ? value[3] : "-"}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
      )}
      {info && info.testResults && (
        <>
          <h2 className="header4">Test Results </h2>
          <div className="vertical-table4">
            <table className="result-table">
              <thead>
                <tr className="rowss">
                  <th className="headss1">Test_id</th>
                  <th className="headss1">Date_time</th>
                  <th className="headss1">Respiratory_result</th>
                  <th className="headss1">SPO2_result</th>
                  <th className="headss1">Quick_test_result</th>
                  <th className="headss1">Cycle_threshold_value</th>
                  <th className="headss1">PCR_result</th>
                  <th className="headss1">Cycle_threshold_value</th>
                </tr>
              </thead>
              <tbody>
                {info.testResults.map((val, index) => {
                  return (
                    <tr className="rowss" key={index}>
                      <td className="cells1">{val[0]}</td>
                      <td className="cells1">
                        {new Date(val[1]).toLocaleString()}
                      </td>
                      <td className="cells1">{val[2] ? val[2] : "-"}</td>
                      <td className="cells1">{val[3] ? val[3] : "-"}</td>
                      <td className="cells1">{val[4] ? val[4] : "-"}</td>
                      <td className="cells1">{val[5] ? val[5] : "-"}</td>
                      <td className="cells1">{val[6] ? val[6] : "-"}</td>
                      <td className="cells1">{val[7] ? val[7] : "-"}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
      )}
      {info && info.treatments && (
        <>
          <h2 className="header5">Treatment Results </h2>
          <div className="vertical-table5">
            <table className="result-table">
              <thead>
                <tr className="rowss">
                  <th className="headss1">Treatment_ID</th>
                  <th className="headss1">Start_date</th>
                  <th className="headss1">End_date</th>
                  <th className="headss1">Result</th>
                </tr>
              </thead>
              <tbody>
                {info.treatments.map((value, index) => {
                  return (
                    <tr className="rowss" key={index}>
                      <td className="cells1">{value[0]}</td>
                      <td className="cells1">
                        {value[1] ? new Date(value[1]).toLocaleString() : "-"}
                      </td>
                      <td className="cells1">
                        {value[2] ? new Date(value[2]).toLocaleString() : "-"}
                      </td>
                      <td className="cells1">{value[3] ? value[3] : "-"}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
      )}
      {info && info.admissions && (
        <>
          <h2 className="header6">Admissions </h2>
          <div className="vertical-table6">
            <table className="result-table">
              <thead>
                <tr className="rowss">
                  <th className="headss1">Admission_ID</th>
                  <th className="headss1">Admission_DATE</th>
                  <th className="headss1">From_Where</th>
                  <th className="headss1">Staff_ID</th>
                  <th className="headss1">Patient_ID</th>
                </tr>
              </thead>
              <tbody>
                {info.admissions.map((value, index) => {
                  return (
                    <tr className="rowss" key={index}>
                      <td className="cells1">{value[0]}</td>
                      <td className="cells1">
                        {value[1] ? new Date(value[1]).toLocaleString() : "-"}
                      </td>
                      <td className="cells1">{value[2]}</td>
                      <td className="cells1">{value[3]}</td>
                      <td className="cells1">{value[4]}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
      )}
      <div className="vertical-table7">
        {info && <PrescriptionT prescriptions={prescriptionData} />}
      </div>
      {/* {info && info.medications && (
        <div className="vertical-table7">
          <table className="result-table">
            <thead>
              <tr className="rowss">
                <th className="headss1">Patient_id</th>
                <th className="headss1">Doctor_id</th>
                <th className="headss1">Treatment_ID</th>
                <th className="headss1">Initiation_date</th>
                <th className="headss1">Completion_date</th>
                <th className="headss1">Unique_code</th>
                <th className="headss1">Amount</th>
                <th className="headss1">Medication_name</th>
                <th className="headss1">Price</th>
              </tr>
            </thead>
            <tbody>
              {info.medications.map((val, index) => {
                return (
                  <tr className="rowss" key={index}>
                    <td className="cells1">{val[0]}</td>
                    <td className="cells1">{val[1]}</td>
                    <td className="cells1">{val[2]}</td>
                    <td className="cells1">
                      {val[3] ? new Date(val[3]).toLocaleString() : "-"}
                    </td>
                    <td className="cells1">
                      {val[4] ? new Date(val[4]).toLocaleString() : "-"}
                    </td>
                    <td className="cells1">{val[5]}</td>
                    <td className="cells1">{val[6]}</td>
                    <td className="cells1">{val[7]}</td>
                    <td className="cells1">{val[8]}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
            )}*/}
      {info && info.discharges && (
        <>
          <h2 className="header7">Discharge </h2>
          <div className="vertical-table8">
            <table className="result-table">
              <thead>
                <tr className="rowss">
                  <th className="headss1">Patient_id</th>
                  <th className="headss1">Discharge_date</th>
                </tr>
              </thead>
              <tbody>
                {info.discharges.map((val, index) => {
                  return (
                    <tr className="rowss" key={index}>
                      <td className="cells1">{val[0]}</td>
                      <td className="cells1">
                        {new Date(val[1]).toLocaleString()}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
      )}
      <div className="fo3">
        <Footer />
      </div>
      <ToastContainer />
    </div>
  );
};

export default Report;
