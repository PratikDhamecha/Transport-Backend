const loginService = require('../../services/login_service/allLogin.service');
const supplierService = require('../../services/supplier_service/supplier.services');
const singleOwnerService = require('../../services/singleOwner_Service/singleOwner.service');
const companyService = require('../../services/as_a_company/company.services');
const supplierController = require('../supplier_controller/supplier.controller');
const companyController = require('../company_Controller/company.controller');
const singleOwnerController = require('../singleOwner_controller/singleOwner.controller');
require('dotenv').config();

exports.registerLogin = async (req ,res,next) => {
    try{
        const logins = req.body;
        const createdLogin = await loginService.registerLogin(logins);
        res.json({status: true, success: "login registered successfully", data: createdLogin});
    }
    catch(err){
        next(err);
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

exports.checlLoginAndGetCategory = async (req,res,next) => {
    try{
        const loginId = req.params.id_loginType;
        console.log(loginId);
        let loginData = await loginService.getLoginData(loginId);
        if(loginData.login_type == 'supplier'){
            let resData = await supplierController.loginSupplier(loginData.id_loginType);
            res.json({status: true, data: supplierData});
        }
        else if(loginData.login_type == 'singleOwner'){
            let resData = await singleOwnerController.loginSingleOwner(loginData.id_loginType);
            res.json({status: true, data: singleOwnerData});
        }
        else if(loginData.login_type == 'company'){
            let resData = await companyController.loginCompany(loginData.id_loginType);
            res.json({status: true, data: companyData});
        }
    }
    catch(err){
        next(err);
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