const companyModel = require('../../models/as_A_Company/comapnyDetails.model');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../../config/db');

class companyService {
    static registerCompany(companys) {
        console.log(companys);
        try{
            const{
                companyOwner_fullName,
                companyOwner_email,
                companyOwner_adhar,
                companyOwner_panCard,
                companyOwner_GSTN,
                companyOwner_password,
                company_Id
            } = companys;
            const registerCompany = new companyModel({
                companyOwner_fullName,
                companyOwner_email,
                companyOwner_adhar,
                companyOwner_panCard,
                companyOwner_GSTN,
                companyOwner_password,
                company_Id: Math.floor(1000 + Math.random() * 9000),
            });
            return registerCompany.save();
            }catch(err){
                throw err;
            } 
        }
    static async checkCompany(companyOwner_email){
        try{
            return await companyModel.findOne({companyOwner_email: companyOwner_email});
        }catch(err){
            throw err;
        }
    }
    static async generateToken(tokenData,secretKey,expiresIn){
        return jwt.sign(tokenData,secretKey,{expiresIn: expiresIn});
    }
    static async getCompanyData(company_Id){
        const resData = await companyModel.find({company_Id: company_Id});
        return resData;
    }
    static async getAllCompanyData(){
        const resData = await companyModel.find();
        return resData;
    }
    static async deleteCompanyData(company_Id){
        const resData = await companyModel.findOneAndDelete({company_Id: company_Id});
        return resData;
    }
    static async updateCompanyData(company_Id,updatedCompanyData){
        const resData = await companyModel.findOneAndUpdate(
            {company_Id: company_Id},
            updatedCompanyData,
            {new : true}
        );
        return resData;
    }
 }

 module.exports = companyService;
