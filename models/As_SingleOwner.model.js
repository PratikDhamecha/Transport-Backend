const mongoose = require('mongoose');
const db = require('../config/db');
const bcrypt = require('bcrypt');

const { Schema } = mongoose;

const singleOwnerSchema = new Schema({
    singleOwner_fullName: {
        type: String,
        required: true
    },
    singleOwner_email: {
        type: String,
        required: true,
        lowercase: true
    },
    singleOwner_AdharNumber: {
        type: Number,
        required: true
    },
    singleOwner_PanCard: {
        type: String,
        required: true,
        uppercase: true
    },
    singleOwner_DriverLicense: {
        type: String,
        required: true
    },
    singleOwner_RC_Book: {
        type: String,
        required: true
    },
    singleOwner_Insurance: {
        type: Number,
        required: true
    },
    singleOwner_Password: {
        type: String,
        required: true
    },
    singleOwner_NumberPlate:{
        type: String,
        required: true
    },
    singleOwner_Id: {
        type: Number,
        required: true
    }
});
singleOwnerSchema.pre('save', async function () {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(this.singleOwner_Password, salt);
        this.singleOwner_Password = hashedPassword;
    } catch (err) {
        console.log(err);
    }
});
singleOwnerSchema.methods.comparePassword = async function (password){
    try{
        console.log('Recievdpassword:', password);
        console.log('storedpassword:', this.singleOwner_Password);
        const isMatch = await bcrypt.compare(password, this.singleOwner_Password);
        console.log('isMatch:', isMatch);
        return isMatch;
    }
    catch(err){
        console.log(err);
    }
}

const singleOwnerModel = mongoose.model('SingleOwner', singleOwnerSchema);
module.exports = singleOwnerModel;