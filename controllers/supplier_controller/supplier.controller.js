const all_LoginService = require('../../services/login_service/allLogin.service');
const supplierServices = require('../../services/supplier_service/supplier.services');
require('dotenv').config();

exports.registerSupplier = async (req ,res,next) => {
    try{
        console.log("enter in register");
        const suppliers = req.body;
        const createdSupplier = await supplierServices.registerSupplier(suppliers);
        const createdLogin = await all_LoginService.registerLogin({login_email: createdSupplier.supplier_email, login_password: createdSupplier.supplier_password, category_Id: createdSupplier.categorySupplier_Id, user_Id: createdSupplier._id}); 
        let tokenData = { supplierId: createdSupplier._id, email: createdSupplier.supplier_email };
        const tokenSignUp = await supplierServices.generateToken(tokenData, process.env.SECRET_KEY, '1y');
        res.json({status: true, success: "supplier registered successfully", data: createdSupplier,token: tokenSignUp});
    }
    catch (err) {
        next(err);
    }
}
exports.getSupplier = async (req, res, next) => {
    try{
        const supplierId = req.params.supplierId;
        console.log(supplierId);
        let supplierData = await supplierServices.getSupplierData(supplierId);
        res.json({status: true, data: supplierData});
    }
    catch(err){
        next(err);
    }
}
exports.getSupplierById = async (req, res, next) => {
    try{
        const supplierId = req.params.supplierId;
        console.log(supplierId);
        let supplierData = await supplierServices.getSupplierDataById(supplierId,);
        res.json({status: true, data: supplierData});
    }
    catch(err){
        next(err);
    }

}
exports.updateSupplier = async (req,res,next) => {
    
    try{
        const supplierId = req.params.supplierId;
        const updatedSupplierData = req.body;
        console.log(updatedSupplierData);
        let supplierData = await supplierServices.updateSupplierData(supplierId, updatedSupplierData);
        res.json({status: true, data: supplierData});
    }
    catch(err){
        next(err);
    }
}
exports.getAllSupplier = async (req, res, next) => {
    try{
        let supplierData = await supplierServices.getAllSupplierData();
        res.json({status: true, data: supplierData});
    }
    catch(err){
        next(err);
    }
}
exports.deleteSupplier = async (req, res, next) => {
    try{
        const supplierId = req.params.supplierId;
        let supplierData = await supplierServices.deleteSupplierData(supplierId);
        res.json({status: true, message: "supplier deleted successfully"});
    }
    catch(err){
        console.log(err);
        res.json({status: false, message: "supplier not found"});
    }
}
exports.loginSupplier = async (req, res, next) => {
    try{
        const { supplier_email,supplier_password } = req.body;    
        const supplier = await supplierServices.checkSupplier(supplier_email);
        console.log('supplier:',supplier);
        if(!supplier){
            return res.json({status: 101, message: "supplier not found"});
        }
        const isMatch = await supplier.comparePassword(supplier_password);
        console.log('isMatch:',isMatch);
        if(!isMatch){
            return res.json({status: 101, message: "Invalid password"});
        }
        let tokenData = { supplierId: supplier._id, email: supplier.supplier_email };
        const token = await supplierServices.generateToken(tokenData, process.env.SECRET_KEY, '1y');
        res.status(200).json({status: true, token: token});
    } catch(err){
        console.log(err);
        res.status(500).json({status: false, message: "Internal Server Error"})
    }
}


module.exports = exports;