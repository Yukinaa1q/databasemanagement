DROP TABLE Test CASCADE CONSTRAINTS;
DROP TABLE DischargeDate CASCADE CONSTRAINTS;
DROP TABLE Symptom CASCADE CONSTRAINTS;
DROP TABLE Comorbidity CASCADE CONSTRAINTS;
DROP TABLE RespiratoryRate_Test CASCADE CONSTRAINTS;
DROP TABLE SPO2_Test CASCADE CONSTRAINTS;
DROP TABLE Quick_Test CASCADE CONSTRAINTS;
DROP TABLE PCR_Test CASCADE CONSTRAINTS;
DROP TABLE Admission CASCADE CONSTRAINTS;
DROP TABLE PhoneNumber CASCADE CONSTRAINTS;
DROP TABlE BelongTo CASCADE CONSTRAINTS;
DROP TABLE Treatment CASCADE CONSTRAINTS;
DROP TABLE Medication CASCADE CONSTRAINTS;
DROP TABLE Treat CASCADE CONSTRAINTS;
DROP TABLE TakeCare CASCADE CONSTRAINTS;
DROP TABLE Use CASCADE CONSTRAINTS;
DROP TABLE LocationHistory CASCADE CONSTRAINTS;
DROP TABLE Room CASCADE CONSTRAINTS;
DROP TABLE Patient CASCADE CONSTRAINTS;
DROP TABLE People CASCADE CONSTRAINTS;
DROP TABLE HeadOfCamp CASCADE CONSTRAINTS;

CREATE OR REPLACE PROCEDURE warning(
    start_time TIMESTAMP,
    end_time TIMESTAMP
)IS
BEGIN
    UPDATE Patient
    SET warning = 'Y'
    WHERE Patient.patient_id IN(
    SELECT t.patient_id
    FROM test t
    LEFT JOIN SPO2_Test sp ON sp.test_id = t.test_id
    LEFT JOIN Respiratoryrate_Test r ON r.test_id = t.test_id
    WHERE t.datetime <= end_time AND t.datetime >= start_time
    );
END warning;
/

EXEC warning(to_timestamp('17/10/2020 00:00:00', 'DD/MM/YYYY HH24:MI:SS'), to_timestamp('17/10/2020 09:54:54', 'DD/MM/YYYY HH24:MI:SS'));

SELECT * FROM PATIENT;
--patient PCR test to positive with null cycle threshold value for all 
--patients whose admission date is from 01/09/2020.
SELECT Test.patient_id, PCR_Test.test_id, pcr_result, cycle_threshold_value
FROM Test, PCR_Test, BelongTo, Admission
WHERE Test.test_id = PCR_Test.test_id
AND BelongTo.test_id = Test.test_id
AND BelongTo.admission_id = Admission.admission_id 
AND Admission.admission_date >= TO_DATE('01/09/2020', 'DD/MM/YYYY');

--a. Update patient PCR test to positive with null cycle threshold value for all 
--patients whose admission date is from 01/09/2020.
UPDATE PCR_Test
SET PCR_Result = 'Positive', cycle_threshold_value = NULL
WHERE PCR_Test.test_id IN(
SELECT Test.test_id
FROM Test, BelongTo, Admission, PCR_test
WHERE BelongTo.test_id = Test.test_id
AND BelongTo.admission_id = Admission.admission_id
AND Test.test_id = PCR_Test.test_id
AND Admission.admission_date >= TO_DATE('01/09/2020', 'DD/MM/YYYY')
);

--Test was PCR_Test updated
SELECT * FROM PCR_Test WHERE cycle_threshold_value IS NULL;

--b. Select all the patient information whose name is ‘Nguyen Van A’
SELECT *
FROM Patient
WHERE patient_full_name = 'Nguyen Van A';

--c. Write a function to calculate the testing for each patient
--Input: Patient ID
--Output: A list of testing
SET SERVEROUTPUT ON;
DROP TYPE TestResultType force;
CREATE OR REPLACE TYPE TestResultType AS OBJECT (
    test_id CHAR(10),
    test_type CHAR(100),
    datetime TIMESTAMP,
    respiratori_result  FLOAT
);
/

CREATE OR REPLACE TYPE TestResultTypeTable AS TABLE OF TestResultType;
/

CREATE OR REPLACE FUNCTION get_patient_testing(
    patient_id_input VARCHAR2
)   RETURN TestResultTypeTable AS
    test_list TestResultTypeTable := TestResultTypeTable();
BEGIN
    FOR row IN(
        SELECT t.test_id, 
               CASE
                   WHEN r.test_id IS NOT NULL THEN 'Respiratory Rate Test'
                   WHEN s.test_id IS NOT NULL THEN 'SPO2 Test'
                   WHEN q.test_id IS NOT NULL THEN 'Quick Test'
                   WHEN p.test_id IS NOT NULL THEN 'PCR Test'
                   ELSE 'No Test Found'
               END AS test_type,
               t.datetime,
               r.respiratory_result
        FROM Test t
        LEFT JOIN RespiratoryRate_Test r ON t.test_id = r.test_id
        LEFT JOIN SPO2_Test s ON t.test_id = s.test_id
        LEFT JOIN Quick_Test q ON t.test_id = q.test_id
        LEFT JOIN PCR_Test p ON t.test_id = p.test_id
        WHERE t.patient_id = patient_id_input
        ORDER BY datetime DESC
    )LOOP
        test_list.extend();
        test_list(test_list.count) := TestResultType(row.test_id, row.test_type, row.datetime, row.respiratory_result);
    END LOOP;
    RETURN test_list;
END;
/

SELECT * FROM TABLE(get_patient_testing('P000000001'));

--d. Write a procedure to sort the nurses in decreasing number of patients he/she 
--takes care in a period of time
CREATE OR REPLACE TYPE NurseRecordType IS OBJECT (
    nurse_id CHAR(10),
    first_name VARCHAR2(50),
    last_name  VARCHAR2(50),
    patient_count NUMBER
);
/

CREATE OR REPLACE TYPE NurseTable IS TABLE OF NurseRecordType;
/

CREATE OR REPLACE PROCEDURE SortNursesByPatientCount(
    start_date DATE,
    end_date DATE
) IS
BEGIN
    -- Populate the nested table with nurse information and patient count
    FOR row IN(
        SELECT
            People.person_id,
            People.first_name,
            People.last_name,
            COUNT(p.patient_id) AS patient_count
        FROM
            TakeCare n
            LEFT JOIN Patient p ON  n.start_date >= start_date
            LEFT JOIN People ON n.nurse_id = People.person_id
            WHERE n.start_date <= end_date AND n.patient_id = p.patient_id
        GROUP BY 
            People.person_id, People.first_name, People.last_name
        ORDER BY
            COUNT(p.patient_id) DESC
    )LOOP
        DBMS_OUTPUT.PUT_LINE('Nurse ID: ' || row.person_id || ', Nurse FirstName: ' || row.first_name  ||', Nurse LastName: ' || row.last_name || ', Patient Count: ' || row.patient_count);
    END LOOP;
END SortNursesByPatientCount;
/

EXEC SortNursesByPatientCount(TO_DATE('16/08/2020', 'DD/MM/YYYY'), TO_DATE('24/08/2020', 'DD/MM/YYYY'));

SELECT * FROM TakeCare ORDER BY start_date;