const express = require("express");
const app = express(); //alternatively. const app= require(express)();
const server = require("http").createServer(app);
const cors = require("cors");
// const socket = require("socket.io-client")("http://localhost:5000", {rejectUnauthorized:false}) 
// testing the connection with this line of code because i cant connect to the back end 
const PORT =  process.env.PORT || 5000 ;

const io = require("socket.io")(server,{rejectUnauthorized:false}, {
  cors: {
    origin: "*",
    methods: [ "GET", "POST"]
  }
}); //Socket.IO enables real-time bidirectional event-based communication
// server side instance
app.use(cors()); //

app.get("/", (req, res) => {
  res.send("server is running");
});

//List all socket handlers below: (i.e. all the information that we want to receive through the socket)
io.on("connection", (socket) => { //0)what to do when connection is established
  socket.emit("me", socket.id);

  socket.on("disconnect", () => { //1) WTD when connection is established then diconnected
    socket.broadcast.emit("callEnded");
  });

  socket.on("callUser", ({ userToCall, signalData, from, name }) => { //2) WTD when connected and calling other user
    io.to(userToCall).emit("userName", { signal: signalData, from, name });
  });
  socket.on("answerCall", (data) => { //3) WTD connected and call is answered
    io.to(data.to).emit("callAccepted", data.signal);
  });
  socket.on("connect_error", (err) => {
  console.log(`connect_error due to ${err.message}`);
});
});

app.listen(PORT, () => {console.log(" you are connected to port", PORT);
});
