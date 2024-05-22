const truckServices = require("../../services/as_a_company/truckDetails.services");
require('dotenv').config();

exports.registerTruck = async (req,res,next) => {
    try{
        const truck = req.body;
        const createdTruck = await truckServices.registerTruck(truck);
        res.json({status: true,success: "Truck registered successfully",data: createdTruck});
        
    }catch(err){
        next(err);
    }
}

exports.getTruck = async (req,res,next) => {
    try{
        const truckId = req.params.truckId;
        console.log(truckId);
        let truckData = await truckServices.getTruckData(truckId);
        res.json({status:true,data:truckData});
    }catch(err){
        next(err);
    }
}

exports.getAllTruck = async (req,res,next) => {
    try{
        let truckData = await truckServices.getAllTruckData();
        res.json({status:true,data:truckData});
    }catch(err){
        next(err);
    }
}
exports.updateTruck = async (req,res,next) => {
    try{
        const truckId = req.params.truckId;
        const updatedTruckData = req.body;
        console.log(updatedTruckData);
        let truckData = await truckServices.updateTruckData(truckId,updatedTruckData);
        res.json({status:true,data:truckData});
    }catch(err){
        next(err);
    }
}
exports.deleteTruck = async (req,res,next) => {
    try{
        const truckId = req.params.truckId;
        const truckData = await truckServices.deleteTruckData(truckId);
        res.json({status:true,message:"Truck deleted successfully"});
    }catch(err){
        console.log(err);
        res.json({status:false,message:"Truck not found"});
    }
}
module.exports = exports;