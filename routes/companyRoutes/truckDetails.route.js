const express = require('express');
const router = express.Router();
const trucksController = require('../../controllers/company_Controller/truckDetails.controller');

router.post("/register", trucksController.registerTruck );
router.get("/getTruck", trucksController.getTruck);
router.put("/updateTruck/:truckId", trucksController.updateTruck);
router.get("/getAllTruck", trucksController.getAllTruck);
router.delete("/deleteTruck/:truckId", trucksController.deleteTruck);

module.exports = router;