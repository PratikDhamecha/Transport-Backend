const categoryService = require('../../services/category_service/category.services');
require('dotenv').config();

exports.registerCategory = async (req ,res,next) => {
    try{
        const categories = req.body;
        const createdCategory = await categoryService.registerCategory(categories);
        res.json({status: true, success: "category registered successfully", data: createdCategory});
    }
    catch (err) {
        next(err);
    }
}

exports.getCategory = async (req, res, next) => {
    try{
        const categoryId = req.params.categoryId;
        console.log(categoryId);
        let categoryData = await categoryService.getCategoryData(categoryId);
        res.json({status: true, data: categoryData});
    }
    catch(err){
        next(err);
    }
}
exports.getCategoryById = async (req, res, next) => {
    try{
        const categoryId = req.params.categoryId;
        console.log(categoryId);
        let categoryData = await categoryService.getCategoryDataById(categoryId,);
        res.json({status: true, data: categoryData});
    }
    catch(err){
        next(err);
    }

}
module.exports = exports;