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
                categoryComapny_Id,
                truck_Details
            } = companys;
            const registerCompany = new companyModel({
                companyOwner_fullName,
                companyOwner_email,
                companyOwner_adhar,
                companyOwner_panCard,
                companyOwner_GSTN,
                companyOwner_password,
                categoryComapny_Id,
                truck_Details
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
        const resData = await companyModel.find({_id: company_Id});
        return resData;
    }
    static async getCompanyDataById(company_Id){
        const resData = await companyModel.find({_id: company_Id});
        return resData;
    }
    static async getAllCompanyData(){
        const resData = await companyModel.find();
        return resData;
    }
    static async deleteCompanyData(company_Id){
        const resData = await companyModel.findOneAndDelete({_id: company_Id});
        return resData;
    }
    static async updateCompanyData(company_Id,updatedCompanyData){
        const resData = await companyModel.findOneAndUpdate(
            {_id: company_Id},
            updatedCompanyData,
            {new : true}
        );
        return resData;
    }

    static async checkCompanyEmail(companyOwner_email){
        try{
            const resData = await companyModel.findOne({companyOwner_email: companyOwner_email});
            return resData;
        }
        catch(err){
            throw err;
        }
    }
 }

 module.exports = companyService;
