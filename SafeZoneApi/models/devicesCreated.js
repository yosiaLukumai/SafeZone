const mongoose = require("mongoose");

// Define the schema
const devicesCreatedSchema = new mongoose.Schema({
    serialNumber: {
        type: String,
        required: true
    },
    sn: {
        type: String,
        required: true
    },
    USED: {
        type: String, // Change this to Boolean since it seems to represent a used state
        required: true
    }
}, {
    timestamps: true
});

// Use an existing collection (by providing the third argument, 'devicesCreated')
const DevicesCreated = mongoose.model('DevicesCreated', devicesCreatedSchema, 'devicesCreated');

module.exports = DevicesCreated;
