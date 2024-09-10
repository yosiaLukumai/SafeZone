const mongoose = require("mongoose")
const Logs = mongoose.Schema({
    userID: {
        type: mongoose.Types.ObjectId,
        ref: "users"
    },
    msg: {
        type: String,
        required: true
    },
    critical: Boolean,
    type: {
        type: String,
        enum: ['FIRE', 'FLOOD', 'NONE'],
        required: true
    },
    seen: Boolean
}, {
    timestamps: true
})


module.exports = mongoose.model("logs", Logs)