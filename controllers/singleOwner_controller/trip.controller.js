const { default: axios } = require("axios");
const tripService = require("../../services/singleOwner_Service/trip.service");
const supplierService =require("../../services/supplier_service/supplier.services");
require("dotenv").config();

exports.registerTrip = async (req, res, next) => {
  try {
    const trips = req.body;
    const createdTrip = await tripService.registerTrip(trips);
    res.json({
      status: true,
      success: "Trip registered successfully",
      data: createdTrip,
    });
  } catch (err) {
    next(err);
  }
};

exports.getTrip = async (req, res, next) => {
  try {
    const tripId = req.params.tripId;
    let tripData = await tripService.getTripData(tripId);
    res.json({ status: true, data: tripData });
  } catch (err) {
    next(err);
  }
};

exports.getAllTrip = async (req, res, next) => {
  try {
    let tripData = await tripService.getAllTripData();
    res.json({ status: true, data: tripData });
  } catch (err) {
    next(err);
  }
};

exports.getTripById = async (req, res, next) => {
  try {
    const tripId = req.params.tripId;
    let tripData = await tripService.getTripDataById(tripId);
    res.json({ status: true, data: tripData });
  } catch (err) {
    next(err);
  }
};

exports.updateTrip = async (req, res, next) => {
  try {
    const trip_Id = req.params.tripId;
    const updatedTripData = req.body;
    let tripData = await tripService.updateTripData(trip_Id, updatedTripData);
    res.json({ status: true, data: tripData });
  } catch (err) {
    console.error("Error updating trip:", err);
    res.status(500).json({ status: false, message: "Failed to update trip" });
  }
};


exports.deleteTrip = async (req, res, next) => {
  try {
    const tripId = req.params.tripId;
    const tripData = await tripService.deleteTripData(tripId);

    if (!tripData) {
      return res.status(404).json({ status: false, message: "Trip not found" });
    }

    res.json({ status: true, message: "Trip deleted successfully" });
  } catch (err) {
    console.error("Error deleting trip:", err);
    res.status(500).json({ status: false, message: "Internal Server Error" });
  }
};


exports.getShipperReciever_Id = async(req,res) => {
  try{
    const getShipperReciever = req.params.trip_shipperReciever;
    let shipperRecieverData = await supplierService.getSupplierData(getShipperReciever);
    res.json({ status: true, data: shipperRecieverData });
  } catch (err) {
    console.log(err);
    res.json({status: false, message: "shipper not found "});
  }
}

exports.updateTrip_status = async (req, res, next) => {
  try {
    const tripid = req.params.tripId;
    const newStatus = req.body.status;

    if (!newStatus) {
      return res.status(400).json({ status: false, message: "Status is required" });
    }

    const updatedTrip = await tripService.updateTrip_status(tripid, newStatus);

    if (!updatedTrip) {
      return res.status(404).json({ status: false, message: "Trip not found or status update failed" });
    }
    res.json({ status: true, message: "Trip status updated" });
  } catch (err) {
    console.error("Error updating trip status:", err);
    res.status(500).json({ status: false, message: "Failed to update trip status" });
  }
};





exports.getCoordinates = async (req, res, next) => {
  const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(place)}&format=json&limit=1`;
  try {
    const response = await axios.get(url);
    if(response.data.length === 0){
      res.json({status:false,message:"No data found"});
    }
    return{
      name:response.data[0].display_name,
      coordinates:[response.data[0].lat,response.data[0].lon]
    }
  }
  catch(err){
    console.log(err);
  }
}

module.exports = exports;

// const express = require('express');
// const { storeTripCoordinates } = require('../services/tripService');
// const { status } = require("init");
// const router = express.Router();

// router.post('/trips', async (req, res) => {
//     const { startLocation, endLocation } = req.body;

//     if (!startLocation || !endLocation) {
//         return res.status(400).json({ error: 'Missing startLocation or endLocation' });
//     }

//     try {
//         const trip = await storeTripCoordinates(startLocation, endLocation);
//         res.status(201).json(trip);
//     } catch (error) {
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });

// module.exports = router;
