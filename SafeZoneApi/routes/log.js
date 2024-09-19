const router = require("express").Router()
const logsController = require("../controllers/log")

const LogsRouter = (app) => {
    router.get("/find/:serialNumber", logsController.FindSpecific)
    return app.use("/logs", router)
}

module.exports = { LogsRouter }