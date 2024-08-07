const singleOwnerService = require('../singleOwner_controller/singleOwner.service');
const all_LoginService = require('../login_controller/all_Login.service');s
require('dotenv').config();

exports.registerSingleOwner = async (req,res,next) =>{
    try{
        const singleOwner = req.body;
        const createdSingleOwner = await singleOwnerService.registerSingleOwner(singleOwner);
        const createdLogin = await all_LoginService.registerLogin({login_email: createdSingleOwner.singleOwner_email, login_password: createdSingleOwner.singleOwner_Password, category_Id: createdSingleOwner.categorySingleOwner_Id, user_Id: createdSingleOwner._id});
        let tokenData = {singleOwnerId:createdSingleOwner._id,email:createdSingleOwner.singleOwner_email,categorySingleOwnerId:createdSingleOwner.categorySingleOwner_Id};
        const tokenSignUp = await singleOwnerService.generateToken(tokenData, process.env.SECRET_KEY, '1y');
        res.json({status: true, success: "Single Owner registered successfully", data: createdSingleOwner, token: tokenSignUp});
    }catch(err){
        next(err);
    }
}
exports.getSingleOwner = async (req,res,next) =>{
    try{
        const singleOwnerId = req.params.singleOwnerId;
        console.log(singleOwnerId);
        let singleOwnerData = await singleOwnerService.getSingleOwnerData(singleOwnerId);
        res.json({status: true, data: singleOwnerData});
    }catch(err) {
        next(err);
    }
}
exports.getAllSingleOwner = async (req,res,next) =>{
    try{
        let singleOwnerData = await singleOwnerService.getAllSingleOwnerData();
        res.json({status: true, data: singleOwnerData});
    }catch(err){
        next(err);
    }
}
exports.updateSingleOwner = async (req,res,next) =>{
    try{
        const singleOwner_Id = req.params.singleOwnerId;
        const updatedSingleOwnerData = req.body;
        console.log(updatedSingleOwnerData);
        let singleOwnerData = await singleOwnerService.updateSIngleOwnerData(singleOwner_Id, updatedSingleOwnerData);
        res.json({status: true, data: singleOwnerData});
    }catch(err){
        next(err);
    }
}
exports.deleteSingleOwner = async (req,res,next) =>{
    try{
        const singleOwnerId = req.params.singleOwnerId;
        const singleOwnerData = await singleOwnerService.deleteSingleOwnerData(singleOwnerId);
        res.json({status: true, message: "Single Owner deleted successfully"});
    } catch(err){
        console.log(err);
        res.json({status: false, message: "Single Owner not found"});
    }
}
exports.loginSingleOwner = async (req,res,next) =>{
    try{
        const { singleOwner_email,singleOwner_password } = req.body;
        const singleOwner = await singleOwnerService.checkSingleOwner(singleOwner_email);
        if(!singleOwner){
            return res.status(401).json({message: "Invalid email"});
        }
        const isMatch = await singleOwner.comparePassword(req.body.singleOwner_Password);
        console.log(req.body);
        if(!isMatch){
            return res.status(401).json({message: "Invalid password"});
        }
        let tokenData = {singleOwnerId: singleOwner._id, singleOwner_email: singleOwner.singleOwner_email};
        const token = await singleOwnerService.generateToken(tokenData, process.env.SECRET_KEY, '1y');
        res.status(200).json({status: true, token: token}); 
    }catch(err){
        res.status(500).json({status:false,message: err.message});
    }
}
module.exports = exports;