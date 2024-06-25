const { default: axios } = require("axios");
const tripService = require("../../services/singleOwner_Service/trip.service");
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
    console.log(err);
  }
};

exports.deleteTrip = async (req, res, next) => {
  try {
    const tripId = req.params.tripId;
    const tripData = await tripService.deleteTripData(tripId);
    res.json({ status: true, message: "Trip deleted successfully" });
  } catch (err) {
    console.log(err);
    res.json({ status: false, message: "Trip not found" });
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


const express = require('express');
const { storeTripCoordinates } = require('../services/tripService');

const router = express.Router();

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
