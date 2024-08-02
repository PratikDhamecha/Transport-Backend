const mongoose = require('mongoose');
const db = require('../../config/db');
const bcrypt = require('bcrypt');

const { Schema } = mongoose;

const categorySchema = new Schema({
    category_name: {
        type: String,
        // required: true
    }
});

const categoryModel = mongoose.model('category', categorySchema);
module.exports = categoryModel;