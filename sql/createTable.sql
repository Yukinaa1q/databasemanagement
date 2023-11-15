CREATE TABLE Patient(
    patient_id          CHAR(10)    NOT NULL    PRIMARY KEY,
    identity_number     CHAR(12)    NOT NULL,
    patient_full_name   CHAR(30)    NOT NULL,
    phone               CHAR(10)    NOT NULL,
    gender              CHAR(5)     NOT NULL,
    address             CHAR(100)   NOT NULL
);
-- select * from patient ;


CREATE TABLE Symptom (
    symptom_name CHAR(100) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NULL,
    is_serious CHAR(1) NOT NULL CHECK (is_serious IN ('Y', 'N')),
    patient_id REFERENCES Patient(patient_id) NOT NULL,
    CONSTRAINT symptom_key PRIMARY KEY(start_date, symptom_name, patient_id)
);
-- SELECT * FROM SYMPTOM;

-- DROP table symptom;
-- ALTER TABLE SYMPTOM MODIFY (symptom_name CHAR(100));
-- ALTER TABLE SYMPTOM MODIFY (END_DATE DATE DEFAULT NULL);
-- DESCRIBE SYMPTOM;
-- INSERT INTO SYMPTOM(SYMPTOM_NAME, START_DATE,END_DATE, IS_SERIOUS, PATIENT_ID)
-- VALUES('Fever', TO_DATE('14/07/2020', 'DD/MM/YYYY'), null, 'N', 'P000000001');
-- Where symptom_name = 'Fever';
-- TRUNCATE Table symptom;
-- INSERT INTO SYMPTOM (PATIENT_ID, SYMPTOM_NAME, START_DATE, END_DATE, IS_SERIOUS) 
-- VALUES ('P000000100', 'Difficulty breathing or shortness of breath', to_date('09/02/2021', 'DD/MM/YYYY'), null, 'Y');

CREATE TABLE DischargeDate(
    patient_id REFERENCES Patient(patient_id) NOT NULL,
    discharge_date  DATE    NOT NULL,
    CONSTRAINT discharge_date_key PRIMARY KEY(patient_id, discharge_date)
);
-- SELECT * FROM dischargeDate;


CREATE TABLE Test(
    test_id     CHAR(10)    NOT NULL    PRIMARY KEY,
    test_date   DATE        NOT NULL,
    test_time   TIMESTAMP        NOT NULL,
    patient_id REFERENCES Patient(patient_id)
);
-- select * from test;

-- -- Step 1: Create a new column 'datetime' with TIMESTAMP data type
-- ALTER TABLE Test
-- ADD (datetime TIMESTAMP NOT NULL);

-- -- Step 2: Update the 'datetime' column with the combination of 'test_date' and 'test_time'
-- UPDATE Test
-- SET datetime = TO_TIMESTAMP(test_date || ' ' || TO_CHAR(test_time, 'HH24:MI:SS'), 'DD/MM/YYYY HH24:MI:SS');

-- -- Drop the 'test_date' column
-- ALTER TABLE Test
-- DROP COLUMN test_date;

-- -- Drop the 'test_time' column
-- ALTER TABLE Test
-- DROP COLUMN test_time;
-- truncate table test;
-- describe test;
-- SELECT * FROM test;
-- TRUNCATE TABLE test;

CREATE TABLE Room(
    building            CHAR(10)     NOT NULL,
    floor               INT         NOT NULL,
    room_number         CHAR(10)     NOT NULL,
    capacity            INT         NOT NULL,
    room_type           CHAR(20)    NOT NULL,
    CONSTRAINT room_key PRIMARY KEY(building, floor, room_number)
);
-- select * from room;

CREATE TABLE Comorbidity(
    patient_id  REFERENCES Patient(patient_id)  NOT NULL,
    comorbidities  CHAR(50)                        NOT NULL,
    CONSTRAINT comodity_key PRIMARY KEY(patient_id, comorbidities)
);
-- select * from comorbidity;

CREATE TABLE RespiratoryRate_Test(
    test_id REFERENCES Test(test_id)    NOT NULL    PRIMARY KEY,
    respiratory_result  FLOAT   NOT NULL
);
-- select * from respiratoryRate_test;

CREATE TABLE SPO2_Test(
    test_id REFERENCES Test(test_id)    NOT NULL    PRIMARY KEY,
    SPO2_result     FLOAT   NOT NULL
);
-- select * from spo2_test;

CREATE TABLE Quick_Test(
    test_id REFERENCES Test(test_id)    NOT NULL    PRIMARY KEY,
    quick_test_result       char(10)       NOT NULL,
    cycle_threshold_value   FLOAT        NULL
);
-- select * from quick_test;

CREATE TABLE PCR_Test(
    test_id REFERENCES Test(test_id)    NOT NULL    PRIMARY KEY,
    PCR_result  char(10)       NOT NULL,
    cycle_threshold_value   FLOAT    NULL
);
-- select * from pcr_test;

CREATE TABLE People(
    person_id           CHAR(10)        NOT NULL    PRIMARY KEY,
    first_name          CHAR(20)        NOT NULL,
    last_name           CHAR(20)        NOT NULL,
    date_of_birth       DATE            NOT NULL,
    gender              CHAR(5)         NOT NULL,
    address             CHAR(100)       NOT NULL,
    start_date_of_work  DATE            NOT NULL,
    volunteer_flag      char(1)        NULL,
    staff_flag          char(1)        NULL,
    nurse_flag          char(1)        NULL,
    doctor_flag         char(1)        NULL,
    manager_flag        char(1)        NULL
);
-- select * from people;

CREATE TABLE HeadOfCamp(
    head_of_camp_id REFERENCES People(person_id)    NOT NULL    PRIMARY KEY,
    first_name          CHAR(20)        NOT NULL,
    last_name           CHAR(20)        NOT NULL,
    date_of_birth       DATE            NOT NULL,
    gender              CHAR(5)         NOT NULL,
    address             CHAR(100)       NOT NULL,
    start_date_of_work  DATE            NOT NULL
);
-- select * from headOfcamp;


CREATE TABLE Admission(
    admission_id   CHAR(15)    NOT NULL    PRIMARY KEY,
    admission_date DATE        NOT NULL,
    from_where      CHAR(100)   NOT NULL,
    staff_id    REFERENCES People(person_id)    NOT NULL,
    patient_id  REFERENCES Patient(patient_id)  NOT NULL
);
-- select * from admission;

CREATE TABLE PhoneNumber(
    person_id REFERENCES People(person_id)  NOT NULL,
    phone_number    CHAR(10)    NOT NULL,
    CONSTRAINT  phone_number_key PRIMARY KEY(person_id, phone_number)
);
-- select * from phonenumber;

CREATE TABLE Medication(
    unique_code         CHAR(10)    NOT NULL    PRIMARY KEY,
    medication_name     CHAR(50)    NOT NULL,
    effects             CHAR(100)   NOT NULL,
    price               FLOAT       NOT NULL,
    expriration_date    DATE        NOT NULL    
);
-- select * from medication;

CREATE TABLE BelongTO(
    test_id REFERENCES Test(test_id)    NOT NULL ,
    admission_id REFERENCES Admission(admission_id),
    CONSTRAINT belong_to_key PRIMARY KEY(test_id, admission_id)
);
-- select * from belongto;

CREATE TABLE Treatment(
    treatment_id        CHAR(20)        NOT NULL    PRIMARY KEY,
    initiation_date     DATE            NOT NULL,
    completion_date     DATE             NULL,
    overall_result              CHAR(100)         NULL
);
-- select * from treatment;
CREATE TABLE Treat(
    patient_id      REFERENCES Patient(patient_id)      NOT NULL,
    doctor_id       REFERENCES People(person_id)        NOT NULL,
    treatment_id    REFERENCES Treatment(treatment_id)  NOT NULL,
    CONSTRAINT treat_key PRIMARY KEY(patient_id, doctor_id, treatment_id)
);
-- select * from treat;

CREATE TABLE TakeCare(
    patient_id  REFERENCES Patient(patient_id)  NOT NULL,
    nurse_id    REFERENCES People(person_id)    NOT NULL,
    start_date  DATE    NOT NULL,
    CONSTRAINT take_care_key PRIMARY KEY(patient_id, nurse_id, start_date)
);
-- select * from takecare;

CREATE TABLE Use(
    unique_code REFERENCES Medication(unique_code) NOT NULL,
    treatment_id REFERENCES Treatment(treatment_id) NOT NULL,
    CONSTRAINT use_key PRIMARY KEY(unique_code, treatment_id)
);
-- select * from use;

CREATE TABLE LocationHistory (
    building            CHAR(10)     NOT NULL,
    floor               INT         NOT NULL,
    room_number         CHAR(10)     NOT NULL,
    patient_id          CHAR(10)    NOT NULL,
    checkin_datetime    TIMESTAMP   NOT NULL,
    check_out_datetime  TIMESTAMP    ,
    CONSTRAINT location_history_key PRIMARY KEY(building, floor, room_number, patient_id, checkin_datetime),
    CONSTRAINT fk_location_history_room FOREIGN KEY (building, floor, room_number) REFERENCES Room(building, floor, room_number)
);
-- select * from locationhistory;
