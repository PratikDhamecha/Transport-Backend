const express = require("express");
const router = express.Router();
const verifyToken = require('../../middleware/middleware');
const tripController = require('../../controllers/singleOwner_controller/trip.controller');

router.post("/createTrip",tripController.registerTrip);
router.post("/getTripById",tripController.getTripById);
router.put("/updateTripData/:tripId",tripController.updateTrip);
router.get("/getAllTrip",tripController.getAllTrip);
router.delete("deleteTripById/:tripId",tripController.deleteTrip);


module.exports = router;
