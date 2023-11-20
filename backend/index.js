// app.js

const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = 8000;

// PostgreSQL configuration
const pool = new Pool({
  user: 'root',
  host: 'localhost',
  database: 'ny_taxi',
  password: 'root',
  port: 5432, // Default PostgreSQL port
});

// Test PostgreSQL connection
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Error connecting to PostgreSQL:', err);
  } else {
    console.log('Connected to PostgreSQL at:', res.rows[0].now);
  }
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/patients/:patient_id', async (req, res) => {
    const { patient_id } = req.params;
  
    try {
      const result = await pool.query('SELECT * FROM Patient WHERE patient_id = $1', [patient_id]);
      const patients = result.rows;
  
      if (patients.length > 0) {
        res.json(patients);
      } else {
        res.status(404).json({ message: 'No patient found with the specified patient_id' });
      }
    } catch (error) {
      console.error('Error retrieving patients:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});


