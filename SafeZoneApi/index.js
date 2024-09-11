const app = require("express")();
const express = require("express");
const dbConfig = require("./db/connect");
const multer = require("multer")
const path = require("path")
const userRoutes = require("./routes/users");
const devicesRoutes = require("./routes/devices")
const cors = require("cors");
const { Server } = require('socket.io')
const http = require("http");
require("dotenv").config();
dbConfig.connectDb();


const aedes = require('aedes')();
const net = require('net');


const mqttPort = 1883;
const mqttServer = net.createServer(aedes.handle);


mqttServer.listen(mqttPort, () => {
  console.log(`MQTT broker started and listening on port ${mqttPort}`);
});


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


// Handle MQTT connections and events
aedes.on('client', (client) => {
  console.log(`MQTT Client connected: ${client.id}`);
});

aedes.on('publish', (packet, client) => {
  console.log(`Message published: ${packet.payload.toString()}`);
});

aedes.on('subscribe', (subscriptions, client) => {
  console.log(`Client subscribed to topics: ${subscriptions.map(s => s.topic).join(', ')}`);
});
server.listen(process.env.PORT, () => {
  console.log(`App running and connected to port ${process.env.PORT}`);
});
module.exports.Socket = io



