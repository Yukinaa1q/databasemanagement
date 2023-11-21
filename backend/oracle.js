// app.js

const express = require('express');
const oracledb = require('oracledb');

const app = express();
const port = 8000;

// Oracle configuration
oracledb.initOracleClient({libDir: 'D:\\instantclient_21_12'}); // This path is hard code in Thuan Computer
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
    user: 'c##btl2223',  // Put your own username, Thuan used this
    password: 'btl2223', // Put your own password, Thuan used this
    connectString: 'localhost:1521/xe'
  });

  // Test Oracle connection
  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error connecting to Oracle:', err);
    } else {
      console.log('Connected to Oracle');
      connection.release();
    }
  });

}

(async () => {
  try {
    await initialize();
  } catch (err) {
    console.error('Failed to create pool:', err);
  }
})();

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// Middleware to parse JSON in request body
app.use(express.json());



//part 3.1 API endpoint to get full name, phone, and comorbidities by patient_id
app.get('/patients/:patient_id', async (req, res) => {
  const { patient_id } = req.params;

  try {
    const connection = await pool.getConnection();

    // Query to get full name and phone
    const basicInfoQuery = 'SELECT patient_full_name, phone FROM Patient WHERE patient_id = :1';
    const basicInfoResult = await connection.execute(basicInfoQuery, [patient_id]);
    const basicInfo = basicInfoResult.rows[0];

    // Query to get comorbidities
    const comorbiditiesQuery = 'SELECT comorbidities FROM Comorbidity WHERE patient_id = :1';
    const comorbiditiesResult = await connection.execute(comorbiditiesQuery, [patient_id]);
    const comorbidities = comorbiditiesResult.rows;

    connection.close();
    if (basicInfo) {
      // Combine results and send as JSON
      console.log('basicInfo:', basicInfo);  // Add this line
      console.log('comorbidities:', comorbidities);  // Add this line
      const result = {
        patient_full_name: basicInfo[0].trim(),
        phone: basicInfo[1].trim(),
        comorbidities: comorbidities[0].map(c => c.trim()),
      };
      res.json(result);
    } else {
      res.status(404).json({ message: 'No patient found with the specified patient_id' });
    }
  } catch (error) {
    console.error('Error retrieving patient information:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// part 3.3 API endpoint to get test results by patient_id
app.get('/patients/:patient_id/tests', async (req, res) => {
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

    const testResultsResult = await connection.execute(testResultsQuery, [patient_id]);
    const testResults = testResultsResult.rows;

    if (testResults.length > 0) {
      res.json(testResults);
    } else {
      res.status(404).json({ message: 'No test results found for the specified patient_id' });
    }

    connection.close();
  } catch (error) {
    console.error('Error retrieving test results:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// part 3.4 API endpoint to get patient information by patient_id
app.get('/patients/:patient_id/details', async (req, res) => {
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
    const comorbidityQuery = 'SELECT comorbidities FROM comorbidity WHERE patient_id = :1';

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

    // Execute all queries
    const demographicResult = await connection.execute(demographicQuery, [patient_id]);
    const comorbidityResult = await connection.execute(comorbidityQuery, [patient_id]);
    const symptomResult = await connection.execute(symptomQuery, [patient_id]);
    const testResultsResult = await connection.execute(testResultsQuery, [patient_id]);
    const treatmentResult = await connection.execute(treatmentQuery, [patient_id]);

    // Extract data from results
    const demographicInfo = demographicResult.rows[0];
    const comorbidities = comorbidityResult.rows;
    const symptoms = symptomResult.rows;
    const testResults = testResultsResult.rows;
    const treatments = treatmentResult.rows;

    // Combine results and send as JSON
    const result = {
      demographicInfo,
      comorbidities: comorbidities[0].map(c => c.trim()),
      symptoms,
      testResults,
      treatments,
    };

    res.json(result);

    connection.close();
  } catch (error) {
    console.error('Error retrieving patient information:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


// part 3.2 API endpoint to add information for a new patient
app.post('/patients', async (req, res) => {
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
    
    await connection.execute('BEGIN NULL; END;');
    
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
        address
      ];
      console.log(patientValues);
      const patientResult = await connection.execute(patientInsertQuery, patientValues, { autoCommit: false });

      // Insert into the Comorbidity table (if comorbidities are provided)
      if (comorbidities && comorbidities.length > 0) {
        const comorbidityInsertQuery = `
          INSERT INTO Comorbidity (patient_id, comorbidities)
          VALUES (:1, :2)
        `;

        for (const comorbidity of comorbidities) {
          const comorbidityValues = [patient_id, comorbidity];
          await connection.execute(comorbidityInsertQuery, comorbidityValues, { autoCommit: false });
        }
      }

      // Commit the transaction
      await connection.commit();

      // Respond with the newly added patient information
      res.status(201).json(patientResult.outBinds);
    } catch (error) {
      // Rollback the transaction if an error occurs
      await connection.rollback();
      throw error;
    } finally {
      // Release the client back to the pool
      connection.close();
    }
  } catch (error) {
    console.error('Error adding new patient information:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});