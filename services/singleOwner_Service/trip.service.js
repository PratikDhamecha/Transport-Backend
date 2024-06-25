const SingleOwnerTripModel = require('../../models/singleOwnerTrip.model');
const axios = require('axios');
const mongoose = require('mongoose');
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
            } = trips;
            const registerTrip = new SingleOwnerTripModel({
                trip_state,
                starting_point,
                ending_point,
                trip_weight,
                trip_cost,
                trip_paymentDetails,
            });
            return registerTrip.save();
        }
        catch(err){
            throw err;
        }
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

    static async getCoordinates(starting_point,ending_point){
        const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${starting_point[0]},${starting_point[1]};${ending_point[0]},${ending_point[1]}?geometries=geojson&access_token=${process.env.MAPBOX_API_KEY}`; 
        
    }

    
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
