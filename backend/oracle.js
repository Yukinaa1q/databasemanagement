// app.js

const express = require("express");
const oracledb = require("oracledb");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const ProtectedRoutes = express.Router();
const AuthorizedRoutes = express.Router();
const app = express();
const port = 8000;

// Oracle configuration
oracledb.initOracleClient({ libDir: "D:\\instantclient_21_12" }); // This path is hard code in Thuan Computer
// You have to download
// Version 21.12.0.0.0
// https://www.oracle.com/database/technologies/instant-client/winx64-64-downloads.html
// Then put the downloaded directory to the path D:\\instantclient_21_12 (hard code in Thuan Computer)
// Then set the environment variable for the path D:\\instantclient_21_12
// Download The Visual Studio 2015, 2017, 2019, and 2022
// https://learn.microsoft.com/en-US/cpp/windows/latest-supported-vc-redist?view=msvc-170

let pool;
let connection;

async function initialize() {
  pool = await oracledb.createPool({
    user: "c##btl2223", // Put your own username, Thuan used this
    password: "btl2223", // Put your own password, Thuan used this
    connectString: "localhost:1521/xe",
  });

  // Test Oracle connection
  pool.getConnection((err, connection) => {
    if (err) {
      console.error("Error connecting to Oracle:", err);
    } else {
      console.log("Connected to Oracle");
      connection.release();
    }
  });
}

(async () => {
  try {
    await initialize();
  } catch (err) {
    console.error("Failed to create pool:", err);
  }
})();

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

app.use(
  cors({
    origin: ["http://localhost:8000", "http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  })
);

app.use(cookieParser());

app.use(bodyParser.json());
// Middleware to parse JSON in request body
app.use(express.json());

// Login api
app.post("/login", async (req, res, next) => {
  const { username, password } = req.body;

  // Perform authentication against the Oracle database
  try {
    const connection = await pool.getConnection();
    let result; // Define result outside the try block

    try {
      result = await connection.execute(
        `SELECT user_id, username,role FROM user_account WHERE username = :username AND user_password = :password`,
        { username, password }
      );
      console.log(result);
    } catch (error) {
      console.error("Error executing query:", error);
      throw error; // Re-throw the error to propagate it to the outer catch block
    } finally {
      // Close the connection in the finally block
      connection.close();
    }

    if (result && result.rows.length === 1) {
      const user = {
        user_id: result.rows[0][0],
        username: result.rows[0][1],
        role: result.rows[0][2],
      };
      console.log(user);
      // Generate JWT token
      const token = jwt.sign(user, "THISISMYAREABABE", { expiresIn: 1440 });

      res.cookie("token", token, {
        withCredentials: true,
        httpOnly: true,
        secure: false,
        domain: "localhost",
        path: "/",
        sameSite: "none",
      });
      res
        .status(201)
        .json({ message: "User logged in successfully", success: true, token });
    } else {
      res.status(401).json({ message: "Invalid account", success: false });
    }
    next();
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
ProtectedRoutes.use((req, res, next) => {
  console.log("Headers:", req.headers);
  const token = req.cookies.token;
  console.log("Received Token:", token);
  if (!token) return res.status(401).json({ error: "Unauthorized" });

  jwt.verify(token, "THISISMYAREABABE", (err, user) => {
    if (err) return res.status(403).json({ error: "Forbidden" });
    console.log(user);
    req.user = user;
    next();
  });
});
AuthorizedRoutes.use((req, res, next) => {
  console.log("Headers:", req.headers);
  const token = req.cookies.token; // Assuming the token is stored in a cookie

  console.log("Received Token:", token);

  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  jwt.verify(token, "THISISMYAREABABE", (err, user) => {
    if (err) {
      return res.status(403).json({ error: "Forbidden" });
    }
    console.log(user);
    // Check if the user has the required role or permissions
    // Modify this part based on your user roles and permissions logic
    if (user.role != "admin") {
      return res
        .status(403)
        .json({ error: "Forbidden - Insufficient permissions" });
    }

    req.user = user;
    next();
  });
});
//Home&verification api
//app.post("/", verifyToken);
//part 3.1 API endpoint to get full name, phone, and comorbidities by patient_id
ProtectedRoutes.get("/patients/:patient_id", async (req, res) => {
  const { patient_id } = req.params;

  try {
    const connection = await pool.getConnection();

    // Query to get full name and phone
    const basicInfoQuery =
      "SELECT patient_full_name, phone FROM Patient WHERE patient_id = :1";
    const basicInfoResult = await connection.execute(basicInfoQuery, [
      patient_id,
    ]);
    const basicInfo = basicInfoResult.rows[0];

    // Query to get comorbidities
    const comorbiditiesQuery =
      "SELECT comorbidities FROM Comorbidity WHERE patient_id = :1";
    const comorbiditiesResult = await connection.execute(comorbiditiesQuery, [
      patient_id,
    ]);
    const comorbidities = comorbiditiesResult.rows;

    connection.close();
    if (basicInfo) {
      // Combine results and send as JSON
      console.log("basicInfo:", basicInfo); // Add this line
      console.log("comorbidities:", comorbidities); // Add this line
      const result = {
        Patient_full_name: basicInfo[0].trim(),
        Phone: basicInfo[1].trim(),
        Comorbidities: comorbidities, //[0].map((c) => c.trim()),
      };
      res.json(result);
    } else {
      res
        .status(404)
        .json({ message: "No patient found with the specified patient_id" });
    }
  } catch (error) {
    console.error("Error retrieving patient information:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
//part 3.1.1 API endpoint to get full name, phone, and comorbidities by phone
ProtectedRoutes.get("/patients1/:phone", async (req, res) => {
  const { phone } = req.params;

  try {
    const connection = await pool.getConnection();

    // Query to get full name and phone
    const basicInfoQuery =
      "SELECT patient_full_name, phone FROM Patient WHERE phone = :1";
    const basicInfoResult = await connection.execute(basicInfoQuery, [phone]);
    const basicInfo = basicInfoResult.rows;
    //Query to get patient_id by phone
    const PQuery = "SELECT patient_id FROM Patient WHERE phone = :1";
    const PResult = await connection.execute(PQuery, [phone]);
    const PFResult = PResult.rows;
    console.log(PFResult);
    //Query to get comorbidities
    let CResult = [];
    const comorbiditiesQuery =
      "SELECT comorbidities FROM Comorbidity WHERE patient_id = :1";
    for (const PIDe of PFResult) {
      const comorbiditiesResult = await connection.execute(
        comorbiditiesQuery,
        PIDe
      );
      const comorbidities = comorbiditiesResult.rows;
      CResult.push(comorbidities);
    }
    console.log(CResult);
    connection.close();
    if (basicInfo && basicInfo.length > 0) {
      // Combine results and send as JSON
      console.log("basicInfo:", basicInfo); // Add this line
      //console.log("comorbidities:", comorbidities); // Add this line
      let resultArray = [];
      for (const basicI of basicInfo) {
        const result = {
          Patient_full_name: basicI[0],
          Phone: basicI[1],
          //Comorbidities: CResult, //[0].map((c) => c.trim()),
        };
        resultArray.push(result);
      }
      for (const element of resultArray) {
        for (const Celement of CResult) {
          element.Comorbidities = Celement;
          CResult.shift();
          break;
        }
      }
      res.json(resultArray);
    } else {
      res
        .status(404)
        .json({ message: "No patient found with the specified phone" });
    }
  } catch (error) {
    console.error("Error retrieving patient information:", error);
    res.status(500).json({ message: error.message || "Internal Server Error" });
  }
});
// part 3.3 API endpoint to get test results by patient_id
ProtectedRoutes.get("/patients/:patient_id/tests", async (req, res) => {
  const { patient_id } = req.params;

  try {
    const connection = await pool.getConnection();

    const testResultsQuery = `
      SELECT 
        Test.test_id,
        Test.datetime, 
        RespiratoryRate_Test.respiratory_result,
        SPO2_Test.SPO2_result,
        Quick_Test.quick_test_result, Quick_Test.cycle_threshold_value,
        PCR_Test.PCR_result, PCR_Test.cycle_threshold_value
      FROM Test
      LEFT JOIN RespiratoryRate_Test ON Test.test_id = RespiratoryRate_Test.test_id
      LEFT JOIN SPO2_Test ON Test.test_id = SPO2_Test.test_id
      LEFT JOIN Quick_Test ON Test.test_id = Quick_Test.test_id
      LEFT JOIN PCR_Test ON Test.test_id = PCR_Test.test_id
      WHERE Test.patient_id = :1
      ORDER BY Test.datetime DESC
    `;

    const testResultsResult = await connection.execute(testResultsQuery, [
      patient_id,
    ]);
    const testResults = testResultsResult.rows;

    if (testResults.length > 0) {
      res.json(testResults);
    } else {
      res.status(404).json({
        message: "No test results found for the specified patient_id",
      });
    }

    connection.close();
  } catch (error) {
    console.error("Error retrieving test results:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// part 3.4 API endpoint to get patient information by patient_id
ProtectedRoutes.get("/patients/:patient_id/details", async (req, res) => {
  const { patient_id } = req.params;

  try {
    const connection = await pool.getConnection();

    // Query to get demographic info
    const demographicQuery = `
      SELECT patient_id, patient_full_name, identity_number, phone, gender, address
      FROM patient 
      WHERE patient_id = :1
    `;

    // Query to get comorbidities
    const comorbidityQuery =
      "SELECT comorbidities FROM comorbidity WHERE patient_id = :1";

    // Query to get symptoms
    const symptomQuery = `
      SELECT symptom_name, start_date, end_date, is_serious
      FROM symptom
      WHERE patient_id = :1
    `;

    // Query to get test results
    const testResultsQuery = `
      SELECT 
        Test.test_id,
        Test.datetime, 
        RespiratoryRate_Test.respiratory_result,
        SPO2_Test.SPO2_result,
        Quick_Test.quick_test_result, Quick_Test.cycle_threshold_value,
        PCR_Test.PCR_result, PCR_Test.cycle_threshold_value
      FROM Test
      LEFT JOIN RespiratoryRate_Test ON Test.test_id = RespiratoryRate_Test.test_id
      LEFT JOIN SPO2_Test ON Test.test_id = SPO2_Test.test_id
      LEFT JOIN Quick_Test ON Test.test_id = Quick_Test.test_id
      LEFT JOIN PCR_Test ON Test.test_id = PCR_Test.test_id
      WHERE Test.patient_id = :1
      ORDER BY Test.datetime DESC
    `;

    // Query to get treatment information
    const treatmentQuery = `
      SELECT t.treatment_id, tm.initiation_date, tm.completion_date, tm.overall_result
      FROM TREAT t
      JOIN TREATMENT tm ON t.treatment_id = tm.treatment_id
      WHERE t.patient_id = :1
    `;
    //Query to get admission information
    const admissionQuery = `SELECT * FROM ADMISSION WHERE patient_id = :1`;
    //Query to get medication
    const medicationQuery = `SELECT 
    t.patient_id, t.doctor_id, t.treatment_id,
    tm.initiation_date, tm.completion_date,
    u.unique_code,u.amount, 
    m.medication_name,m. price
    FROM TREAT t
    JOIN  treatment tm ON t.TREATMENT_id = tm.treatment_id
    JOIN use u ON u.treatment_id = t.treatment_id
    JOIN medication m ON m.unique_code = u.unique_code
    WHERE t.Patient_ID  = :1`;
    //Query to get discharge date
    const dischargeQuery = `SELECT * FROM dischargedate WHERE patient_id=:1`;
    // Execute all queries
    const demographicResult = await connection.execute(demographicQuery, [
      patient_id,
    ]);
    const comorbidityResult = await connection.execute(comorbidityQuery, [
      patient_id,
    ]);
    const symptomResult = await connection.execute(symptomQuery, [patient_id]);
    const testResultsResult = await connection.execute(testResultsQuery, [
      patient_id,
    ]);
    const treatmentResult = await connection.execute(treatmentQuery, [
      patient_id,
    ]);
    const admissionResult = await connection.execute(admissionQuery, [
      patient_id,
    ]);
    const medicationResult = await connection.execute(medicationQuery, [
      patient_id,
    ]);
    const dischargeResult = await connection.execute(dischargeQuery, [
      patient_id,
    ]);
    // Extract data from results
    const demographicInfo = demographicResult.rows[0];
    const comorbidities = comorbidityResult.rows;
    const symptoms = symptomResult.rows;
    const testResults = testResultsResult.rows;
    const treatments = treatmentResult.rows;
    const admissions = admissionResult.rows;
    const medications = medicationResult.rows;
    const discharges = dischargeResult.rows;
    // Combine results and send as JSON
    const result = {
      demographicInfo,
      comorbidities, //: comorbidities[0].map((c) => c.trim()),
      symptoms,
      testResults,
      treatments,
      admissions,
      medications,
      discharges,
    };
    if (testResults.length > 0) {
      res.json(result);
    } else {
      res.status(404).json({
        message: "No test results found for the specified patient_id",
      });
    }

    connection.close();
  } catch (error) {
    console.error("Error retrieving patient information:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// part 3.2 API endpoint to add information for a new patient
AuthorizedRoutes.post("/patients", async (req, res) => {
  const {
    patient_id,
    patient_full_name,
    identity_number,
    phone,
    gender,
    address,
    comorbidities, // Assuming comorbidities is an array in the request body
  } = req.body;

  try {
    // Begin a transaction
    const connection = await pool.getConnection();

    await connection.execute("BEGIN NULL; END;");

    try {
      // Insert into the Patient table
      const patientInsertQuery = `
        INSERT INTO Patient (patient_id, identity_number, patient_full_name, phone, gender, address)
        VALUES (:1, :2, :3, :4, :5, :6)
      `;

      const patientValues = [
        patient_id,
        identity_number,
        patient_full_name,
        phone,
        gender,
        address,
      ];
      console.log(patientValues);
      console.log(Array.isArray(comorbidities));
      console.log(comorbidities.length);
      console.log(comorbidities);
      console.log(comorbidities.at(0));
      const patientResult = await connection.execute(
        patientInsertQuery,
        patientValues,
        { autoCommit: false }
      );

      // Insert into the Comorbidity table (if comorbidities are provided)
      if (
        Array.isArray(comorbidities) &&
        comorbidities.length > 0 &&
        comorbidities.at(0) != ""
      ) {
        const comorbidityInsertQuery = `
          INSERT INTO Comorbidity (patient_id, comorbidities)
          VALUES (:1, :2)
        `;

        for (const comorbidity of comorbidities) {
          const comorbidityValues = [patient_id, comorbidity];
          await connection.execute(comorbidityInsertQuery, comorbidityValues, {
            autoCommit: false,
          });
        }
      }

      // Commit the transaction
      await connection.commit();

      // Respond with the newly added patient information
      res.status(201).json(patientResult);
    } catch (error) {
      // Rollback the transaction if an error occurs
      await connection.rollback();
      throw error;
    } finally {
      // Release the client back to the pool
      connection.close();
    }
  } catch (error) {
    console.error("Error adding new patient information:", error);
    res.status(500).json({ message: error.message || "Internal Server Error" });
  }
});
app.use("/", ProtectedRoutes);
app.use("/", AuthorizedRoutes);
