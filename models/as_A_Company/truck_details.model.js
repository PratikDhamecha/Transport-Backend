const mongoose = require('mongoose');
const db = require('../../config/db');
const bcrypt = require('bcrypt');

const{ Schema } = mongoose;

const truckSchema = new Schema({
    truck_Category:{
        type: String,
        required: true
    },
    truck_MaxWeight:{
        type: Number,
        required: true
    },
    truck_RcBook:{
        type: String,
        required: true
    },
    truck_Insurance:{
        type: String,
        required: true
    },
    truck_NumberPlate:{
        type: String,
        required: true
    },
    company_Id:{
        type: Number,
        required: true
    },
    truck_Id:{
        type: Number,
        required: true
    }
});

truckSchema.methods.compareCompany_Id = async function (company_Id){
    try{
        console.log('Recieved Id:',company_Id);
        console.log('Current Id:',this.company_Id);
        const isMATCH = await bcrypt.compare(company_Id,this.company_Id);
        return isMATCH;
    }catch(err){
        console.log(err);
    }
}

const truckModel = mongoose.model('truck_details',truckSchema);
module.exports = truckModel;

