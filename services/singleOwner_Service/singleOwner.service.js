const singleOwnerModel = require('../../models/singleowner/As_SingleOwner.model');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../../config/db');

class singleOwnerService {
    static registerSingleOwner(singleOwners) {
        console.log(singleOwners);
        try {
            const {
                singleOwner_fullName,
                singleOwner_email,
                singleOwner_AdharNumber,
                singleOwner_PanCard,
                singleOwner_DriverLicense,
                singleOwner_RC_Book,
                singleOwner_Insurance,
                singleOwner_Password,
                singleOwner_NumberPlate,
                categorySingleOwner_Id
            } = singleOwners;
            const registerSingleOwner = new singleOwnerModel({
                singleOwner_fullName,
                singleOwner_email,
                singleOwner_AdharNumber,
                singleOwner_PanCard,
                singleOwner_DriverLicense,
                singleOwner_NumberPlate,
                singleOwner_RC_Book,
                singleOwner_Insurance,
                singleOwner_Password,
                categorySingleOwner_Id
            });
            return registerSingleOwner.save();
        } catch (err) {
            throw err;
        }
    }

    static async checkSingleOwner(singleOwner_email) {
        try {
            return await singleOwnerModel.findOne({ singleOwner_email: singleOwner_email });
        } catch (err) {
            throw err;
        }
    }
    static async generateToken(tokenData, secretKey, expiresIn) {
        return jwt.sign(tokenData, secretKey, { expiresIn: expiresIn });
    }
    static async getSingleOwnerData(singleOwner_Id) {
        const resData = await singleOwnerModel.find({ _id: singleOwner_Id });
        return resData;
    }
    static getAllSingleOwnerData() {
        const resData = singleOwnerModel.find();
        return resData;
    }
    static async deleteSingleOwnerData(singleOwner_Id) {
        const resData = await singleOwnerModel.findOneAndDelete({ _id: singleOwner_Id });
        return resData;
    }
    static async updateSIngleOwnerData(singleOwner_Id, updateSingleOwnerData) {
        const resData = await singleOwnerModel.findOneAndUpdate(
            { _id: singleOwner_Id }, 
            updateSingleOwnerData, 
            { new: true });
        return resData;
    }

    static async checkSingleOwnerLogin(singleOwner_email) {
        try {
            return await singleOwnerModel.findOne({ singleOwner_email: singleOwner_email });
        } catch (err) {
            throw err;
        }
    }
}

module.exports = singleOwnerService;
