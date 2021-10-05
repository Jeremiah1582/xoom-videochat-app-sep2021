// const app = require("express")();
// const server = require("http").createServer(app);
// const cors = require("cors");
// // const socket = require("socket.io-client")("http://localhost:5000", {rejectUnauthorized:false}) 
// // testing the connection with this line of code because i cant connect to the back end 


// const io = require("socket.io")(server,{
//   cors: {
//     origin: "*",
//     methods: [ "GET", "POST"]
//   }
// }); //Socket.IO enables real-time bidirectional event-based communication
// // server side instance
// app.use(cors()); //

// const PORT =  process.env.PORT || 5000 ;

// app.get("/", (req, res) => {
//   res.send("server is running");
// });

// //List all socket handlers below: (i.e. all the information that we want to receive through the socket)
// io.on("connection", (socket) => { //0)what to do when connection is established
//   socket.emit("me", socket.id);
// console.log(socket);

//   socket.on("disconnect", () => { //1) WTD when connection is established then disconnected
//     socket.broadcast.emit("callEnded");
//   });

//   socket.on("callUser", ({ userToCall, signalData, from, name }) => { //2) WTD when connected and calling other user
//     io.to(userToCall).emit("callUser", { signal: signalData, from, name });
//   });
//   socket.on("answerCall", (data) => { //3) WTD connected and call is answered
//     io.to(data.to).emit("callAccepted", data.signal);
//   });
//   socket.on("connect_error", (err) => {
//   console.log(`connect_error due to ${err.message}`);
// });
// });

// app.listen(PORT, () => {console.log(" you are connected to port", PORT);
// });

const app = require("express")();
const server = require("http").createServer(app);
const cors = require("cors");

const io = require("socket.io")(server, {
	cors: {
		origin: "*",
		methods: [ "GET", "POST" ]
	}
});

app.use(cors());

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
	res.send('Running');
});

io.on("connection", (socket) => {
	socket.emit("me", socket.id);

	socket.on("disconnect", () => {
		socket.broadcast.emit("callEnded")
	});

	socket.on("callUser", ({ userToCall, signalData, from, name }) => {
		io.to(userToCall).emit("callUser", { signal: signalData, from, name });
	});

	socket.on("answerCall", (data) => {
		io.to(data.to).emit("callAccepted", data.signal)
	});
});

server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));





