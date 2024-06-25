const mongoose = require('mongoose');
const db = require('../../config/db');
const bcrypt = require('bcrypt');

const { Schema } = mongoose;

const tripSchema = new Schema({
    trip_state: {
        type: String,
        required : false
    },
    starting_point: {
        type: {type: String,enum:['Point']},
        coordinates: {type: [Number],required: false},
        required : false
    },
    ending_point:{
        type: {type: String,enum:['Point']},
        coordinates: {type: [Number],required: false},
        required: false
    },
    trip_weight:{
        type: String,
        required: false
    },
    trip_cost:{
        type: String,
        required: false
    },
    trip_paymentDetails:{
        type: String,
        required: false
    },
});
tripSchema.index({starting_point:'2dsphere'});
tripSchema.index({ending_point:'2dsphere'});

const tripModel = mongoose.model('trip',tripSchema);
module.exports = tripModel;

