const mongoose = require("mongoose")



const Logs = mongoose.Schema({
    temp: {
        type: Number,
        required: true
    },
    deviceID: {
        type: String,
        required: true
    },
    hum: {
        type: String,
        required: true
    },
    critical: Boolean,
    smokeCoValue: Number,
    notification: {
        type: ['FIRE', 'FLOOD', 'NONE'],
        required: true
    }
}, {
    timestamps: true
})


module.exports = mongoose.model("logs", Logs)