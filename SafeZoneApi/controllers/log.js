const LogsModal = require("../models/Logs");
const createOutput = require("../utils").createOutput;


const FindSpecific = async (req, res) => {
    try {
        // mongo id
        const serialNumber = req.params.serialNumber
        const device = await LogsModal.findById(serialNumber)
        if (device) {
            return res.json(createOutput(true, device));
        } else {
            return res.json(createOutput(false, "No such logs"));
        }

    } catch (error) {
        return res.json(createOutput(false, error.message, true));
    }
}



module.exports = {
    FindSpecific,
}