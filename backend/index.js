const express = require('express');
const Connection = require('./database/Connection');


const dotenv = require('dotenv').config()
const app = express()

const port = process.env.PORT || 5000;
app.use(express.json())

Connection();

app.use("/api/user",require("./router/UserRoutes"))
app.use("/api/expense",require("./router/TransactionRoutes"))

app.listen(port,()=>{
    console.log(`server running on: ${port}` );
    
})