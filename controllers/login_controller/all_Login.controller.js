const loginService = require('../../services/login_service/allLogin.service');
const supplierService = require('../../services/supplier_service/supplier.services');
const singleOwnerService = require('../../services/singleOwner_Service/singleOwner.service');
const companyService = require('../../services/as_a_company/company.services');
const supplierController = require('../supplier_controller/supplier.controller');
const companyController = require('../company_Controller/company.controller');
const singleOwnerController = require('../singleOwner_controller/singleOwner.controller');
const { status } = require('init');
require('dotenv').config();

exports.registerLogin = async (req,res,next) => {
    try{
        const logins = req.body;
        const createdLogin = await loginService.registerLogin(logins);
        res.json({status: true, success: "login registered successfully", data: createdLogin});
    }
    catch(err){
        console.log(err);
    }
}
exports.getLogin = async (req,res,next) => {
    try{
        const loginId = req.params.id_loginType;
        console.log(loginId);
        let loginData = await loginService.getLoginData(loginId);
        res.json({status: true, data: loginData});
    }
    catch(err){
        next(err);
    }
}

exports.checkLoginAndGetCategory = async (req,res,next) => {
    try{
        const { login_email,login_password } = req.body;
        const loginData = await loginService.checkLogin(login_email);
        if(!loginData){
            return res.json({status: false, message: "login not found"});
        }
        const isMatch = await loginData.comparePassword(login_password);
        console.log('isMatch:',isMatch);
        if(!isMatch){
            return res.json({status: false, message: "password incorrect"});
        }
        let tokenData = {
            login_email: loginData.login_email,
            category_Id: loginData.category_Id,
            user_Id: loginData.user_Id
        }
        const token = await loginService.generateToken(tokenData,process.env.SECRET_KEY,'1y');
        let categoryData;
        if(loginData.category_Id == "6661accdbcc564c6dae76c7f"){
            categoryData = await supplierService.getSupplierDataById(loginData.user_Id);
            console.log('categoryData:',categoryData);
        }
        else if(loginData.category_Id == "6661adf2bcc564c6dae76c83"){
            categoryData = await singleOwnerService.getSingleOwnerData(loginData.user_Id);
            console.log('categoryData:',categoryData);
        }
        else if(loginData.category_Id == "6661ade2bcc564c6dae76c81"){
            categoryData = await companyService.getCompanyDataById(loginData.user_Id);
            console.log('categoryData:',categoryData);
        }
        return res.status(200).json({status:true,token: token,categoryData: categoryData});
        
    } catch(err){
        console.log(err);
        return res.status(500).json({status: false, message: "Internal server error"});
    }
}

// exports.checkLogin = async (req,res,next) => {
//     try{
//         const { login_email,login_password } = req.body;
//         const loginData = await loginService.checkLogin(login_email);
//         if(!loginData){
//             return res.json({status: false, message: "login not found"});
//         }
//         const isMatch = await loginData.comparePassword(login_password);
//         console.log('isMatch:',isMatch);
//         if(!isMatch){
//             return res.json({status: false, message: "password incorrect"});
//         }
//         let tokenData = {
//             login_email: loginData.login_email,
//             id_loginType: loginData.id_loginType,
//             login_type: loginData.login_type
//         }
//         const token = await loginService.generateToken(tokenData,process.env.SECRET_KEY,'1y');
//         return res.status(200).json({status:true,token: token});
        
//     } catch(err){
//         console.log(err);
//         return res.status(500).json({status: false, message: "Internal server error"});
//     }

// }

module.exports = exports;