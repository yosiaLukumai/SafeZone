import { Client, Message } from "paho-mqtt";
const ClintID = "";
const client = new Client("wee56e96.ala.us-east-1.emqxsl.com", 8084, ClintID)

const connect = () => {
    client.connect({
        onSuccess: OnSuccess,
        onFailure: OnFailure,
        // userName: "yosia",
        // useSSL: true,
        // password: "lukumai"
    })
}

function OnSuccess() {
    console.log("well connected");

}


function OnFailure() {
    console.log("failed to connect ...................");
}


const SendMessage = (topic, message) => {
    const payload = new Paho.Message(message);
    payload.destination = topic;
    client.send(payload)

}


export { connect, SendMessage }