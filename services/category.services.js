const categoryModel = require('../models/category.model');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../config/db');

class categoryService {
    static registerCategory(categories) {
        console.log(categories);
        try {
            const {
                category_name
            } = categories;
            const registerCategory = new categoryModel({
                category_name
            });
            return registerCategory.save();
        } catch (err) {
            throw err;
        }
    }

    static getCategoryData(category_Id) {
        const resData = categoryModel.find({ _id: category_Id });
        return resData;
    }
    static getCategoryDataById(category_Id) {
        const resData = categoryModel.findOne({ _id: category_Id });
        return resData;
    
    }
}
module.exports = categoryService;
// Path: models/category.model.js