const express = require('express');
const router = express.Router();
const companyController = require('../../controllers/company_Controller/company.controller');
const verifyToken = require('../../middleware/middleware');
const companyModel = require('../../models/as_A_Company/comapnyDetails.model');

router.post("/register", companyController.registerCompany);
router.post("/getCompany", companyController.getCompany);
router.put("/updateCompany/:company_Id",verifyToken,companyController.updateCompany);
router.get("/getAllCompany",companyController.getAllCompany);
router.delete("/deleteCompany/:company_Id",verifyToken,companyController.deleteCompany);

router.post("/login",companyController.loginCompany);

module.exports = router;
