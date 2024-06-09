const truckModel = require("../../models/as_A_Company/truck_details.model");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../../config/db");

class truckServices {
  static registerTruck(trucks) {
    console.log(trucks);
    try {
      const {
        truck_Category,
        truck_MaxWeight,
        truck_RcBook,
        truck_Insurance,
        truck_NumberPlate,
        company_Id,
      } = trucks;
      const registerTruck = new truckModel({
        truck_Category,
        truck_MaxWeight,
        truck_RcBook,
        truck_Insurance,
        truck_NumberPlate,
        company_Id
      });
      return registerTruck.save();
    } catch (err) {
      throw err;
    }
  }
  static async checkTruck(truck_NumberPlate) {
    try {
      return await truckModel.findOne({ truck_NumberPlate: truck_NumberPlate });
    } catch (err) {
      throw err;
    }
  }
  static async getTruckData(truckId) {
    const resData = await truckModel.find({ _id: truckId });
    return resData;
  }
  static async getAllTruckData() {
    const resData = await truckModel.find();
    return resData;
  }
  static async deleteTruckData(truckId) {
    const resData = await truckModel.findOneAndDelete({ _id: truckId });
    return resData;
  }
  static async updateTruckData(truckId, updatedTruckData) {
    const resData = await truckModel.findOne(
      { _id: truckId },
        updatedTruckData,
        { new: true }
    );
    return resData;
  }
}
module.exports = truckServices;