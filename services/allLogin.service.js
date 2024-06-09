const all_LoginModel = require("../models/all_Login.model");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class all_LoginService{
    static async registerLogin(logins){
        console.log(logins);
        try{
            const {
                login_email,
                login_password,
                category_Id,
                user_Id,
            } = logins;
            const registerLogin = new all_LoginModel({
                login_email,
                login_password,
                category_Id,
                user_Id,
            });
            return await registerLogin.save();
            }
            catch(err){
                throw err;
            }
        }
   
    // static async findCategory(login_type ){
    //     try{
    //         return await all_LoginModel.findOne({login_type:login_type});
    //     }
    //     catch(err){
    //         throw err;
    //     }
    // }
    // static async checkPassword(login_email,login_password){
    //     try{
    //         const loginData = await all_LoginModel.findOne({login_email:login_email});
    //         if(loginData){
    //             const isMatch = await bcrypt.compare(login_password,loginData.login_password);
    //             if(isMatch){
    //                 return loginData;
    //             }
    //             else{
    //                 return null;
    //             }
    //         }
    //         else{
    //             return null;
    //         }
    //     }
    //     catch(err){
    //         throw err;
    //     }
    // } 
    static async generateToken(tokenData,secretKey,expiresIn){
        return jwt.sign(tokenData,secretKey,{expiresIn:expiresIn});
    }
    static async checkLogin(login_email){
        try{
            return await all_LoginModel.findOne({login_email:login_email});
        }
        catch(err){
            throw err;
        }
    }
    static async getCategoryID(category_Id){
        const resData = await all_LoginModel.find({category_Id:category_Id});
        return resData;
    }
    static async getLoginData(user_Id){
        const resData = await all_LoginModel.find({user_Id:user_Id});
        return resData;
    }
    static async getAllLoginData(){
        const resData = await all_LoginModel.find();
        return resData;
    }
    static async deleteLoginData(user_Id){
        const resData = await all_LoginModel.findOneAndDelete({user_Id:user_Id});
        return resData;
    }
    static async updateLoginData(user_Id,logins){
        const resData = await all_LoginModel.findOneAndUpdate({user_Id:user_Id},logins,{new:true});
        return resData;
    }
}
module.exports = all_LoginService;