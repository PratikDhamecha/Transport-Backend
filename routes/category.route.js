const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/category.controller');
const verifyToken = require('../middleware/middleware');
const categoryModel = require('../models/category.model');

router.post("/register", categoryController.registerCategory);
router.get("/getCategory", categoryController.getCategory);
router.get("/getCategoryById/:categoryId", categoryController.getCategoryById);

module.exports = router;