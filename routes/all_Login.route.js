const express = require('express');
const router = express.Router();
const all_LoginController = require('../controllers/all_Login.controller');
const verifyToken = require('../middleware/middleware');
const all_LoginModel = require('../models/all_Login.model');

router.post("/register", all_LoginController.registerLogin);
router.post("/getLogin", all_LoginController.getLogin);
router.post("/checkLogin",verifyToken,all_LoginController.checkLogin);

module.exports = router;
