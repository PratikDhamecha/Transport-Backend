const express = require('express');
const bodyParser = require('body-parser');
const app = express();


app.use(bodyParser.json());


const  supplierRouter  = require('./routes/supplier_route/supplier.route');
const singleOwnerRouter = require('./routes/supplier_route/supplier.route')
const companyRouter = require('./routes/companyRoutes/company.route');
const truckRouter = require('./routes/companyRoutes/truckDetails.route');
const allLoginRouter = require('./routes/login_route/all_Login.route');
const categoryRouter = require('./routes/category_route/category.route');

app.use('/6661accdbcc564c6dae76c7f', supplierRouter);
app.use('/6661adf2bcc564c6dae76c83', singleOwnerRouter);
app.use('/6661ade2bcc564c6dae76c81', companyRouter);
app.use('/truck', truckRouter);
app.use('/allLogin',allLoginRouter);
app.use('/category',categoryRouter);


module.exports = app;