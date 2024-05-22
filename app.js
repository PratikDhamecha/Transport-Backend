const express = require('express');
const bodyParser = require('body-parser');
const app = express();


app.use(bodyParser.json());


const  supplierRouter  = require('./routes/supplier.route');
const singleOwnerRouter = require('./routes/singleOwner.route');
const companyRouter = require('./routes/companyRoutes/company.route');
const truckRouter = require('./routes/companyRoutes/truckDetails.route');

app.use('/supplier', supplierRouter);
app.use('/singleOwner', singleOwnerRouter);
app.use('/company', companyRouter);
app.use('/truck', truckRouter);

module.exports = app;