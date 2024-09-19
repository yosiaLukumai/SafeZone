const mongoose = require("mongoose")

const Logs = mongoose.Schema({
    temp: {
        type: Number,
        required: true
    },
    serialNumber: {
        type: String,
        required: true
    },
    hum: {
        type: String,
        required: true
    },
    flameValue: Number,
    critical: Boolean,
    smokeCoValue: Number,
    notification: {
        enum: ['FIRE', 'FLOOD', 'NONE'],
        type: String,
        required: true
    }
}, {
    timestamps: true
})


module.exports = mongoose.model("logs", Logs)