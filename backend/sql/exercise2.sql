--part 2.1
UPDATE PCR_Test
SET PCR_result = 'Positive', cycle_threshold_value = NULL
WHERE test_id IN (
    SELECT t.test_id
    FROM PCR_Test t
    JOIN Test tt ON t.test_id = tt.test_id
    JOIN Admission a ON tt.patient_id = a.patient_id
    WHERE a.admission_date >= '2020-09-01'
);

--part 2.2
SELECT * FROM patient
WHERE patient_full_name LIKE 'Nguyen Van A %';

--part 2.3
-- DROP FUNCTION get_patient_testing(character);

CREATE OR REPLACE FUNCTION get_patient_testing(patient_id_input CHAR)
RETURN SYS_REFCURSOR
AS
  v_cursor SYS_REFCURSOR;
BEGIN
  OPEN v_cursor FOR
    SELECT t.test_id,
           CASE
               WHEN r.test_id IS NOT NULL THEN 'Respiratory Rate Test'
               WHEN s.test_id IS NOT NULL THEN 'SPO2 Test'
               WHEN q.test_id IS NOT NULL THEN 'Quick Test'
               WHEN p.test_id IS NOT NULL THEN 'PCR Test'
               ELSE 'No Test Found'
           END AS test_type,
           t.datetime
    FROM Test t
    LEFT JOIN RespiratoryRate_Test r ON t.test_id = r.test_id
    LEFT JOIN SPO2_Test s ON t.test_id = s.test_id
    LEFT JOIN Quick_Test q ON t.test_id = q.test_id
    LEFT JOIN PCR_Test p ON t.test_id = p.test_id
    WHERE t.patient_id = patient_id_input
    ORDER BY datetime DESC;

  RETURN v_cursor;
END;
/

VAR my_cursor REFCURSOR;
EXEC :my_cursor := get_patient_testing('P000000001');
PRINT my_cursor;


--part 2.4
CREATE OR REPLACE PROCEDURE sort_nurses_by_patients(
    start_date_input IN DATE,
    end_date_input IN DATE
)
AS
BEGIN
    FOR nurse_record IN (
        SELECT n.person_id, n.first_name, n.last_name, COUNT(tc.patient_id) AS patient_count
        FROM People n
        JOIN TakeCare tc ON n.person_id = tc.nurse_id
        WHERE tc.start_date >= start_date_input AND tc.start_date <= end_date_input
        GROUP BY n.person_id, n.first_name, n.last_name
        ORDER BY patient_count DESC
    )
    LOOP
        DBMS_OUTPUT.PUT_LINE('Nurse ID: ' || nurse_record.person_id || ', Name: ' || nurse_record.first_name || ' ' || nurse_record.last_name || ', Patient Count: ' || nurse_record.patient_count);
    END LOOP;
END;
/

SET SERVEROUTPUT ON;
EXEC sort_nurses_by_patients(DATE '2020-08-16', DATE '2020-08-24');



