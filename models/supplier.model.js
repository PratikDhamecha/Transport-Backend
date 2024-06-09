const mongoose = require('mongoose');
const db = require('../config/db');
const bcrypt = require('bcrypt');

const { Schema } = mongoose;


const supplierSchema = new Schema({
    supplier_fullName: {
        type: String,
        required: false
    },
    supplier_email: {
        type: String,
        required: false,
        lowercase: true
    }, 
    supplier_adharNumber: {
        type: Number,
        required: false
    },
    supplier_panCard: {
        type: String,
        required: false,
        uppercase: true
    },
    supplier_companyName: {
        type: String,
        required: false
    },
    supplier_GSTIN: {
        type: String,
        required: false
    },
    supplier_password: {
        type: String,
        required: false
    },
    categorySupplier_Id:{
        type: String,
        required: false
    
    }
});

supplierSchema.pre('save', async function(){
    try{
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(this.supplier_password, salt);
        this.supplier_password = hashedPassword;
    }
    catch(err){
        console.log(err);
    }
} )

supplierSchema.methods.comparePassword = async function (password) {
	try {
	  console.log('Recievdpassword:', password);
      console.log('storedpassword:', this.supplier_password)
      const isMatch = await bcrypt.compare(password, this.supplier_password);
	  console.log('isMatch:', isMatch);
	  return isMatch;
	} catch (error) {
	  throw error;
	}
  };

const supplierModel = mongoose.model('Supplier', supplierSchema);
module.exports = supplierModel; 