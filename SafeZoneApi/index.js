const app = require("express")();
const express = require("express");
const dbConfig = require("./db/connect");
const userRoutes = require("./routes/users");
const devicesRoutes = require("./routes/devices")
const deviceModal = require("./models/Devices")
const cors = require("cors");
const { Server } = require('socket.io')
const http = require("http");
const logModal = require("./models/Logs")
require("dotenv").config();

dbConfig.connectDb();
const mqtt = require('mqtt');
const send_sms = require("./services/beem");
const brokerUrl = 'mqtt://45.79.53.206:1883';


// limiting all the acces that comes from other hosting
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/test", (req, res) => {
  res.send("LOL EV's wooh");
});

// bringing all the routes
userRoutes.userRoutes(app);
devicesRoutes.DevicesRoutes(app)


const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
})



io.on("connect", (socket) => {
  console.log('connected')
  socket.on("disconnect", () => {
    console.log("client disconnected..");
  })
})


const client = mqtt.connect(brokerUrl);

client.on('connect', function () {
  console.log('Connected to broker');
  client.subscribe('notification/critical', function (err) {
    if (err) {
      console.error('Subscription error:', err);
    } else {
      console.log('Subscribed to topic: notification/critical');
    }
  });
  client.subscribe('notification', function (err) {
    if (err) {
      console.error('Subscription error:', err);
    } else {
      console.log('Subscribed to topic: notification');
    }
  });
});

// Handle incoming messages
client.on('message', async function (topic, message) {
  // message is a buffer, so convert it to string
  // checnk for the top
  let MyData = JSON.parse(message)
  if (topic == "notification/critical") {
    // something is not ok here ....
    console.log("  disaster alert notify the users................");
    try {
      const saved = await await logModal.create({
        temp: MyData?.temp,
        serialNumber: MyData.serialNumber,
        hum: MyData?.hum,
        flameValue: MyData?.flameValue,
        critical: true,
        smokeCoValue: MyData?.smokeCoValue,
        notification: MyData?.notif
      })
      // find the devicemodel for this thing as first as possible

      let device = await deviceModal.findOne({ serialNumber: MyData.serialNumber })

      if (device) {
        io.emit("notificationCritical", JSON.stringify({ ...device, notification: MyData?.notif }))
        const recipients = device?.listTobeNotified || [];
        const message = `There ${MyData?.notif} at this ${device?.name}. Please take response very first`;
        send_sms(message, recipients);
      } else {
        console.log(" No such device and no notifying the user");

      }
    } catch (error) {
      console.log(error);
    }
    // send message...

  }
  if (topic == "notification") {
    // there is new notification.....
    console.log(" just some log");
    // issue ya security later has to be taken into consideratopn
    try {
      const saved = await logModal.create({
        temp: MyData?.temp,
        serialNumber: MyData.serialNumber,
        hum: MyData?.hum,
        flameValue: MyData?.flameValue,
        critical: false,
        smokeCoValue: MyData?.smokeCoValue,
        notification: MyData?.notif
      })
      if (saved) {
        console.log(" just saved well...");
      }
    } catch (error) {
      console.log(error);
    }


  }
});

// Handle errors
client.on('error', function (err) {
  console.error('Connection error:', err);
});




server.listen(process.env.PORT, () => {
  console.log(`App running and connected to port ${process.env.PORT}`);
});
module.exports.Socket = io


