const supplierModel = require("../../models/supplier_model/supplier.model");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../../config/db");

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
        categorySupplier_Id
      } = suppliers;
      const registerSupplier = new supplierModel({
        supplier_fullName,
        supplier_email,
        supplier_adharNumber,
        supplier_panCard,
        supplier_companyName,
        supplier_GSTIN,
        supplier_password,
        categorySupplier_Id
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

  static async checkSupplierById(supplier_Id) {
    try {
      return await supplierModel.findOne({ _id: supplier_Id });
    } catch (err) {
      throw err;
    }
  }

  static async generateToken(tokenData, secretKey, expiresIn) {
    return jwt.sign(tokenData, secretKey, { expiresIn: expiresIn });
  }

  static async getSupplierData(supplier_Id) {
    const resData = await supplierModel.find({ _id: supplier_Id });
    return resData;
  }
  static async getSupplierDataById(supplier_Id) {
    const resData = await supplierModel.findById({ _id: supplier_Id });
    console.log(resData);
    return resData;  
  }
  static async getAllSupplierData() {
    const resData = await supplierModel.find();
    return resData;
  }
  static async deleteSupplierData(supplier_Id){
    const resData = await supplierModel.findOneAndDelete({_id:supplier_Id});
    return resData;
  }
  static async checkSupplierLogin(supplier_email) {
    try {
      return await supplierModel.findOne({ supplier_email: supplier_email });
    } catch (err) {
      throw err;
    }
  }
  static async updateSupplierData(supplierId, updatedSupplierData) {
    const id = await this.getSupplierDataById(supplierId);
    console.log(id);
    try{
    const resData = await supplierModel.findOneAndUpdate(
      { _id: supplierId },
      updatedSupplierData,
      { new: true }
    );
    console.log(resData);
    return resData;
  }
  catch(err){
    console.log(err);
  }
  }
}
  
module.exports = supplierService;
