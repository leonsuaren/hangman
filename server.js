require('dotenv').config({ path: './config.env' });
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const app = express();
const PORT = 8080;

const auth = require('./routes/User.js');
connectDB();

app.use(express.json());
app.use(express.urlencoded({ urlencoded: false }));

app.get('/', (req, res) => {
  res.json({message: "APP running"})
});

app.use('/api/auth', auth);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`)
});

