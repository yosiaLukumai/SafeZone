const devicesModel = require("../models/Devices");
const createOutput = require("../utils").createOutput;

const register = async (req, res) => {
    try {
        const { serialNumber, phone, data, cordinates, owner, name, listTobeNotified } = req.body;
        const existingDevice = await devicesModel.findOne({
            $or: [{ name }, { idNumber }]
        });

        if (existingDevice) {
            return res.json(createOutput(false, "idNumber or name taken"));
        }
        
        const saved = await devicesModel.create({
            cordinates,
            listTobeNotified,
            name,
            serialNumber,
            owner,
            setting: {
                PhoneNumber: phone,
                updateRate: 3,
                Change: false,
                AmountRecharged: data
            }
        });
        if (saved) {
            return res.json(createOutput(true, saved));
        } else {
            return res.json(createOutput(false, saved));
        }
    } catch (error) {
        return res.json(createOutput(false, error.message, true));
    }
};


const FindSpecific = async (req, res) => {
    try {
        // mongo id 
        const id = req.params.id
        const device = await devicesModel.findById(id)
        if (device) {
            return res.json(createOutput(true, device));
        } else {
            return res.json(createOutput(false, "No such device"));
        }

    } catch (error) {
        return res.json(createOutput(false, error.message, true));
    }
}

const FindAllDevicesRelatedUser = async (req, res) => {
    try {
        const ownerID = req.params.ownerID
        const devices = await devicesModel.find({ owner: ownerID })
        if (devices) {
            return res.json(createOutput(true, devices));
        } else {
            return res.json(createOutput(false, "No such devices"));
        }

    } catch (error) {
        return res.json(createOutput(false, error.message, true));
    }
}



module.exports = {
    FindAllDevicesRelatedUser,
    FindSpecific,
    register
}