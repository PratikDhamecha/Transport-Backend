const express = require('express');
const bodyParser = require('body-parser');
const app = express();


app.use(bodyParser.json());


const  supplierRouter  = require('./routes/supplier.route');

app.use('/supplier', supplierRouter);

module.exports = app;