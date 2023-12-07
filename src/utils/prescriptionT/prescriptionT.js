import React from "react";
import "./prescriptionT.css";
const PrescriptionT = ({ prescriptions }) => {
  return (
    <div id="PTemp">
      <h2>Prescription </h2>
      {prescriptions.medications1.map((prescription, index) => (
        <div key={index}>
          <p>Patient_ID: {prescription[0]}</p>
          <p>Doctor_ID: {prescription[1]}</p>
          <p>Treatment_ID: {prescription[2]}</p>
          <table id="medicineTable">
            <tr className="rowss">
              <th className="headss01">Unique_code</th>
              <th className="headss01">Medication_name</th>
              <th className="headss01">Amount</th>
              <th className="headss01">Price</th>
            </tr>
            {prescriptions.medications2.map((val, index1) => {
              const checkTreat = val[0] === prescription[2];

              return checkTreat ? (
                <tr className="rowss" key={index1}>
                  <td className="cells1">{val[1]}</td>
                  <td className="cells1">{val[3]}</td>
                  <td className="cells1">{val[2]}</td>
                  <td className="cells1">{val[4]}</td>
                </tr>
              ) : null;
            })}
          </table>
          {prescriptions.medications3.map((val1, index2) => {
            const checkTreat1 = val1[0] === prescription[2];
            return checkTreat1 ? (
              <p key={index2}>Total_amount: {val1[1]}</p>
            ) : null;
          })}
          <hr />
        </div>
      ))}
    </div>
  );
};

export default PrescriptionT;
