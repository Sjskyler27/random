const http = require("http");
const websocketServer = require("websocket").server
const httpServer = http.createServer();
httpServer.listen(5500, () => console.log("Listening at 5500"))
//hashmap
const clients = {};

const wsServer = new websocketServer({
    "httpServer": httpServer
})
wsServer.on("request", request => {
    //connect
    const connection = request.accept(null, request.origin);
    connection.on("open", () => console.log("opened!"))
    connection.on("close", () => console.log("close!"))
    connection.on("message", () => {
        //I have recieved a message from a client
        console.log("message!")
    })

    //generate new client ID
    const clientID = generateGUID();
    clients[clientID] = {
        "connection": connection
    }
})


function generateGUID() {
    return (S4() + S4() + '-' + S4() + '-' + S4() + '-' + S4() + '-' + S4() + S4() + S4());
  }
  
  function S4() {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  }

  const guid = generateGUID();
  