const express = require('express');
const { Pool } = require('pg');
require('dotenv').config();
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
});

app.post('/api/complaints', async (req, res) => {
  const { userId, title, description } = req.body;

  try {
    const complaintRes = await pool.query(
      'INSERT INTO complaints (user_id, title, description) VALUES ($1, $2, $3) RETURNING *',
      [userId, title, description]
    );

    await pool.query(
      'INSERT INTO complaint_history (complaint_id, status) VALUES ($1, $2)',
      [complaintRes.rows[0].id, 'Pending']
    );

    res.json(complaintRes.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/complaints/history', async (req, res) => {
  const { userId } = req.query;

  try {
    const historyRes = await pool.query(
      'SELECT * FROM complaints WHERE user_id = $1 ORDER BY created_at DESC',
      [userId]
    );

    res.json(historyRes.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});