const SingleOwnerTripModel = require('../../models/singleowner/trip.model');
const axios = require('axios');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../../config/db');


class singleOwnerTripService{
    static registerTrip(trips){
        console.log(trips);
        try{
            const {
                trip_state,
                starting_point,
                ending_point,
                trip_weight,
                trip_cost,
                trip_paymentDetails,
                trip_shipperReciever
            } = trips;
            const registerTrip = new SingleOwnerTripModel({
                trip_state,
                starting_point,
                ending_point,
                trip_weight,
                trip_cost,
                trip_paymentDetails,
                trip_shipperReciever
            });
            return registerTrip.save();
        }
        catch(err){
            throw err;
        }
    }

    static async generateToken(tokenData, secretKey, expiresIn) {
            return jwt.sign(tokenData, secretKey, { expiresIn: expiresIn });
        }

    static async getTripData(trip_Id){
        const resData = await SingleOwnerTripModel.find({_id:trip_Id});
        return resData;
    }

    static getAllTripDataBySingleOwner(singleOwner_Id){
        const resData = SingleOwnerTripModel.find({singleOwner_Id:singleOwner_Id});
        return resData;
    }

    static async deleteTripData(trip_Id){
        const resData = await SingleOwnerTripModel.findOneAndDelete({_id:trip_Id});
        return resData;
    }

    static async updateTripData(trip_Id,trips){
        const resData = await SingleOwnerTripModel.findOneAndUpdate({_id:trip_Id},trips,{new:true});
        return resData;
    }

    static async updateTripStatus(trip_Id, newStatus){
        const resData = await SingleOwnerTripModel.findOneAndUpdate(
            { _id: trip_Id},
            { status: newStatus },
            { new: true}
        );  
        return resData
    }

    static async getShipperReciever(trip_Id) {
        const resData = await SingleOwnerTripModel.findById(trip_Id, 'trip_shipperReciever');
        return resData;
    }

    //this function is for the compnay which owns multiple trucks
    // const assignVehicle = async (tripId, vehicleId) => {
    //   try {
    //       return await Trip.findByIdAndUpdate(
    //           tripId, 
    //           { vehicle: vehicleId },  // Updating the vehicle field
    //           { new: true } // Return the updated trip
    //       );
    //   } catch (error) {
    //       throw new Error(`Error assigning vehicle: ${error.message}`);
    //   }
    // };

    // static async getCoordinates(starting_point,ending_point){
    //     const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${starting_point[0]},${starting_point[1]};${ending_point[0]},${ending_point[1]}?geometries=geojson&access_token=${process.env.MAPBOX_API_KEY}`; 
    // }
    

    
}

// const axios = require('axios');

// // Replace with your Google Maps Geocoding API key
// const apiKey = 'YOUR_GOOGLE_MAPS_API_KEY';

// async function getCoordinates(location) {
//     const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(location)}&key=${apiKey}`;

//     try {
//         const response = await axios.get(url);
//         if (response.data.status === 'OK') {
//             const locationData = response.data.results[0].geometry.location;
//             return {
//                 latitude: locationData.lat,
//                 longitude: locationData.lng
//             };
//         } else {
//             throw new Error('Geocoding API error: ' + response.data.status);
//         }
//     } catch (error) {
//         console.error('Error fetching coordinates:', error.message);
//         throw error;
//     }
// }

// module.exports = { getCoordinates };
