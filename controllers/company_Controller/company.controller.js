const companyService = require('../../services/as_a_company/company.services');
require('dotenv').config();

exports.registerCompany = async (req,res,next) => {
    try{
        const company = req.body;
        const createdCompany = await companyService.registerCompany(company);
        res.json({status: true,success: "Company registered successfully",data: createdCompany});
    }catch(err){
        next(err);
    }
}
exports.getCompany = async (req,res,next) => {
    try{
        const companyId = req.params.companyId;
        console.log(companyId);
        let comapnyData = await companyService.getCompanyData(companyId);
        res.json({status:true,data:comapnyData});
    }catch(err){
        next(err);
    }
}
exports.getAllCompany = async (req,res,next) => {
    try{
        let companyData = await companyService.getAllCompanyData();
        res.json({status:true,data:companyData});
    }catch(err){
        next(err);
    }
}
exports.getCompanyById = async (req,res,next) => {
    try{
        const companyId = req.params.companyId;
        let companyData = await companyService.getCompanyDataById(companyId);
        res.json({status:true,data:companyData});
    }catch(err){
        next(err);
    }

}
exports.updateCompany = async (req,res,next) => {
    try{
        const companyId = req.params.company_Id;
        const updatedCompanyData = req.body;
        console.log(updatedCompanyData);
        let companyData = await companyService.updateCompanyData(companyId,updatedCompanyData,);
        res.json({status:true,data:companyData});
    }catch(err){
        next(err);
    }
}
exports.deleteCompany = async (req,res,next) => {
    try{
        const companyId = req.params.companyId;
        const companyData = await companyService.deleteCompanyData(companyId);
        res.json({status:true,message:"Company deleted successfully"});
    }catch(err){
        console.log(err);
        res.json({status:false,message:"Company not found"});
    }
}
exports.loginCompany = async (req,res,next) => {
    try{
        const { companyOwner_email,companyOwner_password } = req.body;
        const company = await companyService.checkCompany(companyOwner_email);
        if(!company){
            return res.status(401).json({message:"Invalid email"});
        }   
        const isMatch = await company.comparePassword(req.body.companyOwner_password);
        console.log(isMatch);
        if(!isMatch){
            return res.status(401).json({message:"Invalid password"});
        }
        let tokenData = {
            company_email: companyOwner_email,
            company_Id: company.company_Id
        }
        const token = await companyService.generateToken(tokenData,process.env.SECRET_KEY, '1y');
        res.json({status:true,token:token});
    }catch(err){
        next(err);
    }
}
module.exports = exports;

