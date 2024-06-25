const express = require('express');
const router = express.Router();
const supplierController = require('../../controllers/supplier_controller/supplier.controller');
const verifyToken = require('../../middleware/middleware');
const supplierModel = require('../../models/supplier_model/supplier.model');
//const Excel = require('exceljs');

router.post("/register", supplierController.registerSupplier);
//router.post("/login",supplierController.loginSupplier);
router.get("/getSupplier", supplierController.getSupplier);
router.get("/getSupplierById/:supplierId", supplierController.getSupplierById);
router.put("/updateSupplier/:supplierId",verifyToken,supplierController.updateSupplier);
router.get("/getAllSupplier",supplierController.getAllSupplier);
router.delete("/deleteSupplier/:supplierId",verifyToken,supplierController.deleteSupplier);

// router.post("/login", async (req, res) => {
//     try{
//         const { email,password } = req.body;
//         const supplier = await supplierModel.findOne({email});
//         if(!supplier){
//             return res.status(401).json({message: "Invalid email"});
//         }
//         const isMatch = await supplier.comparePassword(password);
//         if(!isMatch){
//             return res.status(401).json({message: "Invalid password"});
//         }
//         res.status(200).json({message: "Login successful"});
//     }catch(err){
//         res.status(500).json({message: err.message});
//     }
// });

router.post("/login",supplierController.loginSupplier);

module.exports = router;
