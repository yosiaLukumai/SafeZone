const router = require("express").Router()
const devicesController = require("../controllers/devices")

const DevicesRoutes = (app) => {
    router.get("/find/:id", devicesController.FindSpecific)
    router.post("/register", devicesController.register)
    router.get("/find/all/:ownerID", devicesController.FindAllDevicesRelatedUser)
    return app.use("/devices", router)
}

module.exports = { DevicesRoutes }