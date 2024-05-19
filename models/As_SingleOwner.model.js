const mongoose = require('mongoose');
const db = require('../config/db');
const bcrypt = require('bcrypt');

const { Schema } = mongoose;

const singleOwnerSchema = new Schema({
    sOwner_fullName: {
        type: String,
        required: true
    },
    sOwner_email: {
        type: String,
        required: true,
        lowercase: true
    },
    sOwner_AdharNumber: {
        type: Number,
        required: true
    },
    sOwner_PanCard: {
        type: String,
        required: true
    },
    sOwner_DriverLicense: {
        type: String,
        required: true
    },
    sOwner_RC_Book: {
        type: String,
        required: true
    },
    sOwner_Insurance: {
        type: Number,
        required: true
    },
    sOwner_Password: {
        type: String,
        required: true
    },
    sOwner_ConfirmPassword: {
        type: String,
        required: true
    },
});
singleOwnerSchema.pre('save', async function(){
    try{
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(this.sOwner_Password, salt);
        this.sOwner_Password = hashedPassword;
        this.sOwner_ConfirmPassword = hashedPassword;
    }
    catch(err){
        console.log(err);
    }
} );

const singleOwnerModel = mongoose.model('SingleOwner', singleOwnerSchema);
module.exports = singleOwnerModel;