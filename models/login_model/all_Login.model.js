const mongoose = require('mongoose');
const db = require('../../config/db');
const bcrypt = require('bcrypt');

const { Schema } = mongoose;

const all_LoginSchema = new Schema({
    login_type: {
        type: String,
        required : false
    },
    login_email:{
        type: String,
        required: false,
        lowercase: true
    },
    login_password:{
        type: String,
        required: false
    },
    category_Id:{
        type: String,
        required: false
    },
    user_Id:{
        type: String,
        required: false
    }
    
});

all_LoginSchema.methods.comparePassword = async function (password) {
    try {
      console.log('Recievdpassword:', password);
      console.log('storedpassword:', this.login_password);
      const isMatch = await bcrypt.compare(password, this.login_password);
      console.log('isMatch:', isMatch);
      return isMatch;
    }catch(err){
        throw err;
    }
}

const all_LoginModel = mongoose.model('loginn',all_LoginSchema);
module.exports = all_LoginModel;