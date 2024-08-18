require('dotenv').config();
const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'TestDB',
    password: '123w123w',
    port: 5432,
});

app.get('/test', async (req, res) => {
    const user = await pool.query('SELECT * FROM users');
    res.json(user.rows[0])
});

app.get('/employees', async (req, res) => {
    const user = await pool.query('SELECT * FROM employees');
    res.json(user.rows);
});

app.post('/signup', async (req, res) => {
    const { firebaseUID } = req.body;
  
    try {
      const userExists = await pool.query(
        'SELECT id FROM users WHERE firebase_uid = $1',
        [firebaseUID]
      );
  
      if (userExists.rows.length > 0) {
        return res.status(400).json({ error: 'User already exists' });
      }
  
      await pool.query(
        'INSERT INTO users (firebase_uid) VALUES ($1)',
        [firebaseUID]
      );
  
      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

app.post('/api/complaints', async (req, res) => {
  const { user_id, main_type, sub_type, description} = req.body.data;
  console.log(req.body);
  try {
    const complaintRes = await pool.query(
      'INSERT INTO complaints (user_id, main_type, sub_type, description) VALUES ($1, $2, $3, $4) RETURNING *',
      [user_id, main_type, sub_type, description]
    );

    res.json(complaintRes.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/complaints/history', async (req, res) => {
    const { user_id, main_type, sub_type } = req.query;
  
    try {
      let query = ("SELECT * FROM complaints WHERE user_id = $1");
      const queryParams = [user_id];
  
      if (main_type) {
        query += ' AND main_type = $2';
        queryParams.push(main_type);
      }
  
      if (sub_type) {
        query += ` AND sub_type = $${queryParams.length + 1}`;
        queryParams.push(sub_type);
      }
  
      query += ' ORDER BY created_at DESC';
      
      const historyRes = await pool.query(query, queryParams);
      res.json(historyRes.rows);

      console.log(query, queryParams);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  app.get('/api/complaints/employee/history', async (req, res) => {
    const { user_id, main_type, sub_type } = req.query;
  
    try {
      let query = 'SELECT * FROM complaints';
      const queryParams = [];
      
      if (main_type != null || sub_type != null){
        query += ' WHERE';
      }
      if (main_type) {
        query += ' main_type = $1';
        queryParams.push(main_type);
      }
  
      if (sub_type) {
        if (main_type){
            query += ' AND';
        }
        query += ` sub_type = $${queryParams.length + 1}`;
        queryParams.push(sub_type);
      }
  
      query += ' ORDER BY created_at DESC';
      console.log(main_type, sub_type, user_id, queryParams.length);
      if (queryParams.length != 0) {
        const historyRes = await pool.query(query, queryParams);
        res.json(historyRes.rows);
      }
      else {
        const historyRes = await pool.query(query);
        res.json(historyRes.rows);
      }
      
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});