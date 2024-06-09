const loginService = require('../services/allLogin.service');
const supplierService = require('../services/supplier.service');
const singleOwnerService = require('../services/singleOwner.service');
const companyService = require('../services/company.service');
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

exports.getCategory = async (req,res,next) => {
    try{
        const category_Id = req.params.category_Id;
        console.log(category_Id);
        if(category_Id == "6661accdbcc564c6dae76c7f"){
            let loginData = await supplierService.getSupplierDataById(user_Id);
            res.json({status: true, data: loginData});
        }
        else if(category_Id == "6661ade2bcc564c6dae76c81"){
            let loginData = await singleOwnerService.getSingleOwnerDataById(user_Id);
            res.json({status: true, data: loginData});
        }
        else if(category_Id == "6661adf2bcc564c6dae76c83"){
            let loginData = await companyService.getCompanyDataById(user_Id);
            res.json({status: true, data: loginData});
        }
    }
    catch(err){
        next(err);
    }
}

exports.checkLogin = async (req,res,next) => {
    try{
        const { login_email,login_password } = req.body;
        const loginData = await loginService.checkLogin(login_email);
        if(!loginData){
            res.json({status: false, message: "login not found"});
        }
        const isMatch = await loginData.comparePassword(login_password);
        console.log('isMatch:',isMatch);
        if(!isMatch){
            res.json({status: false, message: "password incorrect"});
        }
        let tokenData = {
            login_email: loginData.login_email,
            id_loginType: loginData.id_loginType,
            login_type: loginData.login_type
        }
        const token = await loginService.generateToken(tokenData,process.env.SECRET_KEY,'1y');
        res.status(200).json({status:true,token: token});
        
    } catch(err){
        console.log(err);
        res.status(500).json({status: false, message: "Internal server error"});
    }

}

module.exports = exports;