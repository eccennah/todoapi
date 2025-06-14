const mongoose = require('mongoose');
const express = require ('express');
const {connect} = require('./db/connection')
require('dotenv').config();

const app = express()
const PORT = process.env.PORT || 3000

app.use (express.json())

connect();

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});



