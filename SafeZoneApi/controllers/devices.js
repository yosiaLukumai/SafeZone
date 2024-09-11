const devicesModel = require("../models/Devices");
const createOutput = require("../utils").createOutput;

const register = async (req, res) => {
    try {
        const { idNumber, phone, data, cordinates, owner, listTobeNotified } = req.body;
        const saved = await devicesModel.create({
            cordinates,
            listTobeNotified,
            idNumber,
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