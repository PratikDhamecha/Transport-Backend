const mongoose = require('mongoose');
const db = require('../config/db');
const bcrypt = require('bcrypt');

const { Schema } = mongoose;

const companySchema = new Schema({
    owner_fullName: {
        type: String,
        required: true
    },
    owner_adhar:{
        type: Number,
        required: true
    },
    owner_panCard:{
        type: String,
        required: true
    },
    owner_email:{
        type: String,
        required: true,
        lowercase: true  
    },
    company_GSTN:{
        type:String,
        required: true
    }
});
companySchema.pre('save', async function(){
    try{
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(this.owner_password, salt);
        this.owner_password = hashedPassword;
        this.owner_confirmPassword = hashedPassword;
    }
    catch(err){
        console.log(err);
    }
} );

const companyModel = mongoose.model('Company', companySchema);
module.exports = companyModel;
    
