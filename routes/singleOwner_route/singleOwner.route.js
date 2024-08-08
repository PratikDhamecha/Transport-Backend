const express = require('express');
const router = express.Router();
const singleOwnerController = require('../../controllers/singleOwner_controller/singleOwner.controller');
const verifyToken = require('../../middleware/middleware');
const singleOwnerModel = require('../../models/singleowner/As_SingleOwner.model');

router.post("/register", singleOwnerController.registerSingleOwner);
router.post("/getSingleOwner", singleOwnerController.getSingleOwner);
router.put("/updateSingleOwner/:singleOwnerId",verifyToken,singleOwnerController.updateSingleOwner);
router.get("/getAllSingleOwner",singleOwnerController.getAllSingleOwner);
router.delete("/deleteSingleOwner/:singleOwnerId",verifyToken,singleOwnerController.deleteSingleOwner);
router.get("/getSingleOwnerById/:singleOwnerId",singleOwnerController.getSingleOwnerById);
// router.post("/login", async (req, res) => {
//     try{
//         const { email,password } = req.body;
//         const supplier = await supplierModel.findOne({email});
//         if(!supplier){
//             return res.status(401).json({message: "Invalid email"});
//         }
//         const isMatch = await supplier.comparePassword(password);
//         if(!isMatch){
//             return res.status(401).json({message: "Invalid password"});
//         }
//         res.status(200).json({message: "Login successful"});
//     }catch(err){
//         res.status(500).json({message: err.message});
//     }
// });

router.post("/login",singleOwnerController.loginSingleOwner);

module.exports = router;