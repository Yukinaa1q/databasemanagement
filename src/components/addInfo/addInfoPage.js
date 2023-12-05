import React, { useState, useEffect } from "react";
import "./addInfoPage.css";
import Navbar from "../../utils/navbar/navbar.js";
import Button from "react-bootstrap/Button";
import Footer from "../../utils/footer/footer.js";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
const AddInfoPage = () => {
  const navigate = useNavigate();
  const [patientID, setPatientID] = useState("");
  const [patientName, setPatientName] = useState("");
  const [ID, setID] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAdress] = useState("");
  const [comorbidities, setComorbidities] = useState([]);
  const [comorbidity, setComorbidity] = useState("");
  const [gender, setGender] = useState("");
  const [token, setToken] = useState("");

  useEffect(() => {
    try {
      // Retrieve the token from the cookie
      const storedToken = Cookies.get();
      console.log(storedToken);
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

  const handleChange1 = (e) => {
    setPatientID(e.target.value);
  };
  const handleChange2 = (e) => {
    setPatientName(e.target.value);
  };
  const handleChange3 = (e) => {
    setID(e.target.value);
  };
  const handleChange4 = (e) => {
    setPhone(e.target.value);
  };
  const handleChange5 = (e) => {
    setAdress(e.target.value);
  };
  const handleChange6 = (e) => {
    setComorbidity(e.target.value);
  };
  const handleChange7 = (e) => {
    setGender(e.target.value);
  };
  const handleError = (err) =>
    toast.error(err, {
      position: "bottom-left",
    });
  const handleSuccess = (msg) =>
    toast.success(msg, {
      position: "bottom-left",
    });
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setComorbidities((prevComorbidities) => {
        const newComorbidities = prevComorbidities.concat(
          comorbidity.split(",").map((value) => value.trim())
        );
        // Check for duplicates before updating the state
        const uniqueComorbidities = Array.from(new Set(newComorbidities));
        // Move the API call into the callback of setComorbidities
        axios
          .post(
            "http://localhost:8000/patients",
            {
              patient_id: patientID,
              patient_full_name: patientName,
              identity_number: ID,
              phone: phone,
              gender: gender,
              address: address,
              comorbidities: uniqueComorbidities, // Use the updated state directly
            },
            {
              withCredentials: true,
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .then((response) => {
            console.log(response.data);
            handleSuccess(
              "The patient information has been successfully added "
            );
          })
          .catch((error) => {
            if (error.response && error.response.status === 401) {
              handleError("Unauthorized");
            } else if (error.response && error.response.status === 403) {
              handleError("Forbidden-Insufficient Authorization");
            } else {
              handleError("Patient ID is not unique");
            }

            console.log(error);
          });

        return uniqueComorbidities; // Return the new state
      });
    } catch (error) {
      console.error(error);
      handleError("Patient_ID is not unique");
    }
    setPatientID("");
    setPatientName("");
    setID("");
    setPhone("");
    setAdress("");
    setGender("");
    setComorbidities([]);
    setComorbidity("");
  };
  return (
    <div className="addInfoPage">
      <Navbar />
      <form onSubmit={handleSubmit}>
        <div className="big">
          <div className="big1">
            <span className="bigText">Patient_ID</span>
            <input
              type="text"
              className="bigIn"
              placeholder="Patient ID"
              maxLength={10}
              value={patientID}
              onChange={handleChange1}
              required
            />
          </div>
          <div className="big2">
            <span className="bigText">Patient Name</span>
            <input
              className="bigIn"
              type="text"
              placeholder="Patient Name"
              value={patientName}
              onChange={handleChange2}
              required
            />
          </div>
          <div className="big3">
            <span className="bigText">ID </span>
            <input
              className="bigIn"
              type="text"
              placeholder="ID"
              maxLength={12}
              value={ID}
              onChange={handleChange3}
              required
            />
          </div>
          <div className="big7">
            <span className="bigText">Gender </span>
            <input
              className="bigIn"
              type="text"
              placeholder="Gender"
              maxLength={1}
              value={gender}
              onChange={handleChange7}
              required
            />
          </div>
          <div className="big4">
            <span className="bigText">Phone number</span>
            <input
              className="bigIn"
              type="text"
              placeholder="Phone number"
              value={phone}
              onChange={handleChange4}
              maxLength={10}
              required
            />
          </div>
          <div className="big5">
            <span className="bigText">Address</span>
            <input
              className="bigIn"
              type="text"
              placeholder="Address"
              maxLength={100}
              value={address}
              onChange={handleChange5}
              required
            />
          </div>
          <div className="big6">
            <span className="bigText">Comorbidities</span>
            <input
              className="bigIn"
              type="text"
              maxLength={100}
              placeholder="Comorbidities"
              value={comorbidity}
              onChange={handleChange6}
            />
          </div>
        </div>
        <Button className="bigBut" type="submit">
          Add new patient
        </Button>
      </form>
      <div className="fo1">
        <Footer />
      </div>
      <ToastContainer />
    </div>
  );
};

export default AddInfoPage;
