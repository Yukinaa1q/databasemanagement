CREATE TABLE Patient(
    patient_id          CHAR(10)    NOT NULL    PRIMARY KEY,
    identity_number     CHAR(12)    NOT NULL,
    patient_full_name   CHAR(30)    NOT NULL,
    phone               CHAR(10)    NOT NULL,
    gender              CHAR(5)     NOT NULL,
    address             CHAR(100)   NOT NULL
);

CREATE TABLE Symptom(
    symptom_name        CHAR(50)    NOT NULL,
    start_date          DATE        NOT NULL,
    end_date            DATE,
    is_serious          BOOLEAN     NOT NULL,
    patient_id          REFERENCES Patient(patient_id)   NOT NULL,
    CONSTRAINT symtom_key   PRIMARY KEY(start_date, end_date, symptom_name, is_serious)
);

CREATE TABLE Room(
    building            CHAR(5)     NOT NULL,
    floor               INT         NOT NULL,
    room_number         CHAR(5)     NOT NULL,
    capacity            INT         NOT NULL,
    room_type           CHAR(20)    NOT NULL,
    CONSTRAINT room_key PRIMARY KEY(building, floor, room_number)
);

CREATE TABLE LocationHistory(
    building            REFERENCES Room(buiding)        NOT NULL,
    floor               REFERENCES Room(floor)          NOT NULL,
    room_number         REFERENCES Room(room_number)    NOT NULL,
    patient_id          REFERENCES Patient(patient_id)  NOT NULL,
    check_in_datetime   TIMESTAMP                       NOT NULL,
    check_out_datetime  TIMESTAMP,
    CONSTRAINT location_history_key PRIMARY KEY(building, floor, room_number, patient_id, check_in_datetime, check_out_datetime)
);

CREATE TABLE People(
    person_id           CHAR(10)        NOT NULL    PRIMARY KEY,
    first_name          CHAR(10)        NOT NULL,
    last_name           CHAR(10)        NOT NULL,
    date_of_birth       DATE            NOT NULL,
    gender              CHAR(5)         NOT NULL,
    address             CHAR(100)       NOT NULL,
    start_date_of_work  DATE            NOT NULL,
    volunteer_flag      BOOLEAN         NOT NULL,
    staff_flag          BOOLEAN         NOT NULL,
    nurse_flag          BOOLEAN         NOT NULL,
    doctor_flag         BOOLEAN         NOT NULL,
    manager_flag        BOOLEAN         NOT NULL
);

CREATE TABLE HeadOfCamp(
    head_of_camp_id REFERENCES People(person_id)    NOT NULL    PRIMARY KEY,
    first_name          CHAR(10)        NOT NULL,
    last_name           CHAR(10)        NOT NULL,
    date_of_birth       DATE            NOT NULL,
    gender              CHAR(5)         NOT NULL,
    address             CHAR(100)       NOT NULL,
    start_date_of_work  DATE            NOT NULL
);

CREATE TABLE Treatment(
    treatment_id        CHAR(10)        NOT NULL    PRIMARY KEY,
    initiation_date     DATE            NOT NULL,
    completion_date     DATE            NOT NULL,
    result              CHAR(10)        NOT NULL
);

CREATE TABLE Treat(
    patient_id      REFERENCES Patient(patient_id)      NOT NULL,
    doctor_id       REFERENCES People(person_id)        NOT NULL,
    treatment_id    REFERENCES Treatment(treatment_id)  NOT NULL,
    CONSTRAINT treat_key PRIMARY KEY(patient_id, doctor_id, treatment_id)
);

CREATE TABLE TakeCare(
    patient_id  REFERENCES Patient(patient_id)  NOT NULL,
    nurse_id    REFERENCES People(person_id)    NOT NULL,
    start_date  DATE    NOT NULL,
    CONSTRAINT take_care_key PRIMARY KEY(patient_id, nurse_id, start_date)
);

CREATE TABLE Comodity(
    patient_id  REFERENCES Patient(patient_id)  NOT NULL,
    comodities  CHAR(50)                        NOT NULL,
    CONSTRAINT comodity_key PRIMARY KEY(patient_id, comodities)
);

CREATE TABLE Addmission(
    addmission_id   CHAR(15)    NOT NULL    PRIMARY KEY,
    addmission_date DATE        NOT NULL,
    from_where      CHAR(100)   NOT NULL,
    staff_id    REFERENCES People(person_id)    NOT NULL,
    patient_id  REFERENCES Patient(patient_id)  NOT NULL
);

CREATE TABLE Medication(
    unique_code         CHAR(10)    NOT NULL    PRIMARY KEY,
    medication_name     CHAR(50)    NOT NULL,
    effects             CHAR(100)   NOT NULL,
    price               FLOAT       NOT NULL,
    expriration_date    DATE        NOT NULL    
);

CREATE TABLE Use(
    unique_code REFERENCES Medication(unique_code) NOT NULL,
    treament_id REFERENCES Treatment(treatment_id) NOT NULL,
    CONSTRAINT use_key PRIMARY KEY(unique_code, treatment_id)
);

CREATE TABLE DischargeDate(
    patient_id REFERENCES Patient(patient_id) NOT NULL,
    discharge_date  DATE    NOT NULL,
    CONSTRAINT discharge_date_key PRIMARY KEY(patient_id, discharge_date)
);

CREATE TABLE Test(
    test_id     CHAR(10)    NOT NULL    PRIMARY KEY,
    test_date   DATE        NOT NULL,
    test_time   TIME        NOT NULL,
    patient_id REFERENCES Patient(patient_id)
);

CREATE TABLE PCR_Test(
    test_id REFERENCES Test(test_id)    NOT NULL    PRIMARY KEY,
    PCR_result  FLOAT       NOT NULL,
    cycle_threshold_value   FLOAT   NOT NULL
);

CREATE TABLE SPO2_Test(
    test_id REFERENCES Test(test_id)    NOT NULL    PRIMARY KEY,
    SPO2_result     FLOAT   NOT NULL
);

CREATE TABLE RespiratoryRate_Test(
    test_id REFERENCES Test(test_id)    NOT NULL    PRIMARY KEY,
    respiratory_result  FLOAT   NOT NULL
);

CREATE TABLE Quick_Test(
    test_id REFERENCES Test(test_id)    NOT NULL    PRIMARY KEY,
    quick_test_result       FLOAT       NOT NULL,
    cycle_threshold_value   FLOAT       NOT NULL
);

CREATE TABLE Admission(
    admission_id    CHAR(10)    NOT NULL    PRIMARY KEY,
    admission_date  DATE        NOT NULL,
    from_where      CHAR(100)   NOT NULL,
    staff_id REFERENCES People(person_id)   NOT NULL,
    patient_id REFERENCES People(person_id) NOT NULL
);

CREATE TABLE BelongTO(
    test_id REFERENCES Test(test_id)    NOT NULL    PRIMARY KEY,
    admission_id REFERENCES Admission(admission_id),
    CONSTRAINT belong_to_key PRIMARY KEY(test_id, admission_id)
);

CREATE TABLE PhoneNumber(
    person_id REFERENCES People(person_id)  NOT NULL,
    phone_number    CHAR(10)    NOT NULL,
    CONSTRAINT  phone_number_key PRIMARY KEY(person_id, phone_number)
);