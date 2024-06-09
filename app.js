const express = require('express');
const bodyParser = require('body-parser');
const app = express();


app.use(bodyParser.json());


const  supplierRouter  = require('./routes/supplier.route');
const singleOwnerRouter = require('./routes/singleOwner.route');
const companyRouter = require('./routes/companyRoutes/company.route');
const truckRouter = require('./routes/companyRoutes/truckDetails.route');
const allLoginRouter = require('./routes/all_Login.route');
const categoryRouter = require('./routes/category.route');

app.use('/supplier', supplierRouter);
app.use('/singleOwner', singleOwnerRouter);
app.use('/company', companyRouter);
app.use('/truck', truckRouter);
app.use('/allLogin',allLoginRouter);
app.use('/category',categoryRouter);


module.exports = app;