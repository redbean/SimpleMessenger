const io = require("socket.io-client");

const socketClient = io("http://localhost:3000")
const actor = require("../GlobalVariables/JWGlobalTypes");



socketClient.on("connect", () => {
    console.log("connection server");
});

socketClient.emit("first Request", {data : "1st req"});

socketClient.on("first Respond", req => {
    console.log(req);

});