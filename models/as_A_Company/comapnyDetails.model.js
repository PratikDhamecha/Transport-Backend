const mongoose = require('mongoose');
const db = require('../../config/db');
const bcrypt = require('bcrypt');

const { Schema } = mongoose;

const companySchema = new Schema({
    companyOwner_fullName: {
        type: String,
        required: false
    },
    companyOwner_adhar:{
        type: Number,
        required: false
    },
    companyOwner_panCard:{
        type: String,
        required: false,
        uppercase: true
    },
    companyOwner_email:{
        type: String,
        required: false,
        lowercase: true  
    },
    companyOwner_password:{
        type: String,
        required: false
    },
    company_GSTN:{
        type:String,
        required: false
    },
    categoryComapny_Id:{
        type: String,
        required: false
    },
    truck_Details:{
        type: [String],
        required: false
    }
});
companySchema.pre('save', async function(){
    try{
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(this.companyOwner_password, salt);
        this.companyOwner_password = hashedPassword;
    }
    catch(err){
        console.log(err);
    }
} );
companySchema.methods.comparePassword = async function(password){
    try{
        console.log('Recieved Password:',password);
        console.log('Stored Password:',this.companyOwner_password);
        const isMatch = await bcrypt.compare(password,this.companyOwner_password);
        console.log('IsMatch:',isMatch);
        return isMatch;
    }catch(err){
        console.log("Error in comparePassword:",err);
    }
}

const companyModel = mongoose.model('Company', companySchema);
module.exports = companyModel;
    
