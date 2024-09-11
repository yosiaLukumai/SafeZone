const mongoose = require("mongoose")
const LocationSchema = new mongoose.Schema({
    latitude: {
        type: Number,
        required: true
    },
    longitude: {
        type: Number,
        required: true
    }
});


const Devices = mongoose.Schema({
    serialNumber: {
        type: String,
    },
    name: {
        required: true,
        type: String
    },
    cordinates: {
        type: LocationSchema,
        required: true
    },
    owner: {
        type: mongoose.Types.ObjectId,
        ref: "users"
    },
    listTobeNotified: [{ phone: String, MNO: String, name: String, Organization: Boolean }],
    setting: {
        updateRate: Number,
        Change: Boolean,
        PhoneNumber: String,
        PingToAvoidDeletion: Number,
        LastReacharge: Date,
        AmountRecharged: Number // Mbs
    }
}, {
    timestamps: true
})


module.exports = mongoose.model("devices", Devices)