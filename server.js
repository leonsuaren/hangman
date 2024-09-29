require('dotenv').config({ path: './config.env' });
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const app = express();
const PORT = 8080;

connectDB();

app.use(express.json());
app.use(express.urlencoded({ urlencoded: false }));

app.get('/', (req, res) => {
  res.json({message: "APP running"})
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`)
});

