const express = require("express");
const app = express(); //alternatively. const app= require(express)();
const server = require("http").createServer(app);
const cors = require("cors");
const PORT = 5000 || process.env.PORT;
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
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
    socket.broadcast.emit("callended");
  });

  socket.on("calluser", ({ userToCall, signalData, from, name }) => { //2) WTD when connected and calling other user
    io.to(userToCall).emit("username", { signal: signalData, from, name });
  });
  socket.on("answercall", (data) => { //3) WTD connected and call is answered
    io.to(data.to).emit("callAnswered", data.signal);
  });
});

app.listen(PORT, () => {
  console.log(" you are connected to port", PORT);
});
