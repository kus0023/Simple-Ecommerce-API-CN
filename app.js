const express = require('express');

//Database connection
const db = require('./src/configs/mongo_db')

const PORT = process.env.PORT || 3000;
const app = express();

//use json
app.use(express.json());
//routes
app.use(require('./src/routers'));

app.listen(PORT, ()=>{
    console.log('Server started at localhost port ', PORT);
})