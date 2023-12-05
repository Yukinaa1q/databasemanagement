--EXPLAIN PLAN FOR -- uncomment this for exec plan
SELECT
    Patient.patient_full_name,
    Patient.phone,
   -- Symptom.symptom_name,
    Admission.admission_date,
    Treatment.initiation_date,
    People.first_name AS doctor_first_name,
    People.last_name AS doctor_last_name,
    LocationHistory.building,
    LocationHistory.floor,
    LocationHistory.room_number
FROM Patient
--JOIN Symptom ON Patient.patient_id = Symptom.patient_id
JOIN Admission ON Patient.patient_id = Admission.patient_id
JOIN Treat ON Patient.patient_id = Treat.patient_id
JOIN Treatment ON Treat.treatment_id = Treatment.treatment_id
JOIN People ON Treat.doctor_id = People.person_id
LEFT JOIN LocationHistory ON Patient.patient_id = LocationHistory.patient_id
WHERE Patient.patient_id = 'P000000069';

--run this to print exec plan
--SELECT * FROM TABLE(DBMS_XPLAN.DISPLAY(format => 'ALL'));

-- Enable indexing on the phone column of the Patient table
CREATE INDEX patient_idx ON Patient(patient_id);
--try again the complex query to test
DROP INDEX patient_idx;