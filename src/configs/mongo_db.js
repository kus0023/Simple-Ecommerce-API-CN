const mongoose = require('mongoose');

const URL = "mongodb://localhost:27017/ecommerce_api_dev"

mongoose.connect(URL);

const db = mongoose.connection

db.once('open', function(){

    console.log('Database connection established');
});

db.on('error', (error)=>{
    console.log("Database connecion failure. Description: ", error);
});

module.exports = db;