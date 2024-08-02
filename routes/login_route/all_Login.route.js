const express = require('express');
const router = express.Router();
const all_LoginController = require('../../controllers/login_controller/all_Login.controller');
const verifyToken = require('../../middleware/middleware');
const all_LoginModel = require('../../models/login_model/all_Login.model');

router.post("/register", all_LoginController.registerLogin);
router.post("/getLogin", all_LoginController.getLogin);
router.post("/checkLoginAndGetCategory",all_LoginController.checlLoginAndGetCategory);

module.exports = router;
