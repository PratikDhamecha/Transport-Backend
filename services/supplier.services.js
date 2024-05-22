const supplierModel = require("../models/supplier.model");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../config/db");
const { deleteSupplier } = require("../controllers/supplier.controller");

class supplierService {
  static async registerSupplier(suppliers) {
    console.log(suppliers);
    try {
      const {
        supplier_fullName,
        supplier_email,
        supplier_adharNumber,
        supplier_panCard,
        supplier_companyName,
        supplier_GSTIN,
        supplier_password,
        supplier_Id,
      } = suppliers;
      const registerSupplier = new supplierModel({
        supplier_fullName,
        supplier_email,
        supplier_adharNumber,
        supplier_panCard,
        supplier_companyName,
        supplier_GSTIN,
        supplier_password,
        supplier_Id: Math.floor(1000 + Math.random() * 9000),
      });
      return await registerSupplier.save();
    } catch (err) {
      throw err;
      //console.log(err);
    }
  }

  static async checkSupplier(supplier_email) {
    try {
      return await supplierModel.findOne({ supplier_email: supplier_email });
    } catch (err) {
      throw err;
    }
  }

  static async generateToken(tokenData, secretKey, expiresIn) {
    return jwt.sign(tokenData, secretKey, { expiresIn: expiresIn });
  }

  static async getSupplierData(supplierId) {
    const resData = await supplierModel.find({ supplier_id: supplierId });
    return resData;
  }
  static async getAllSupplierData() {
    const resData = await supplierModel.find();
    return resData;
  }
  static async deleteSupplierData(supplier_Id){
    const resData = await supplierModel.findOneAndDelete({supplier_Id:supplier_Id});
    return resData;
  }
  static async updateSupplierData(supplierId, updatedSupplierData) {
    const resData = await supplierModel.findOneAndUpdate(
      { supplier_Id: supplierId },
      updatedSupplierData,
      { new: true }
    );
    return resData;
  }
}
  
module.exports = supplierService;
