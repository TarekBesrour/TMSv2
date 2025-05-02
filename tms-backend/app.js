const express = require('express');
const cors = require('cors');
const app = express();
const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

app.use(cors());

app.get('/', (req, res) => res.send('Hello from backend!'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

app.get('/test-db', async (req, res) => {
    const result = await pool.query('SELECT NOW()');
    res.json(result.rows);
  });
