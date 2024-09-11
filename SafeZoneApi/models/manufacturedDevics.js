const mongoose = require("mongoose")


const devicesCreated = mongoose.Schema({
    serialNumber: {
        type: String,
        required: true
    },
    sn: {
        type: String,
        required: true
    },
    USED: Boolean,
}, {
    timestamps: true
})


module.exports = mongoose.model("devicesCreated", devicesCreated)