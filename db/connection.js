const mongoose = require('mongoose');
require('dotenv').config();

const connect = () =>{
    mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/todoapp')
    mongoose.connection.on('successfulconnect', () =>{
        console.log('connection successful');
    })

    mongoose.connection.on('unsuccessfulconnect', (err) => {
        console.log('connection unsuccessful')
    })
}

module.exports={
    connect
}