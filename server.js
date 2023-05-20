const express = require('express');
const dotenv = require('dotenv').config();
const connectDB = require('./config/db');
const cors = require('cors');
 
const app = express();

connectDB();

const UserRegistration = require('./router/user');

const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200
}
app.use(cors(corsOptions));

app.options('*', cors()); 
app.use(express.json());

app.use('/api/user', UserRegistration);

const PORT = process.env.PORT || 3000;


const server = app.listen(PORT, () => {
  console.log(`Server is running on port:http://localhost:${PORT}.`);
});