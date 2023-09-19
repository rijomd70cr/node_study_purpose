const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
const socket = require('socket.io');

const { connectDB } = require('./Src/Config/db');
const routes = require('./Src/Routes');
const { notFound, errorHandler } = require("./Src/Middlewares/errorHandler");

dotenv.config();
const corsOptions = {
  origin: 'http://localhost:5555',
  methods: '*'
}
app.use(cors(corsOptions));
app.use(express.json());

// connect MongoDB Using Mongoose
connectDB();

app.get("/", (req, res) => {
  res.status(200).send("Server Running");
});
app.use('/api', routes);
app.use(notFound);
app.use(errorHandler);

const Server = app.listen(process.env.PORT, () => {
  console.log("Server Running on  Port " + process.env.PORT);
});

const io = socket(Server); //Initializing socket connction

io.on("connection", (socket) => {
  console.log(socket.id, "Connection created");

  socket.on("disconnect", (reason) => {
    console.log(reason, "disconnect");
  });

  socket.on("disconnecting", (reason) => {
    console.log(reason, "disconnecting");
    for (const room of socket.rooms) {
      if (room !== socket.id) {
        socket.to(room).emit("user has left", socket.id);
      }
    }
  });

  socket.on("join_room", (data) => {
    console.log(data, "join_room "); //from client id room no 
    socket.join(data);
  });

  // socket.use(([event, ...args], next) => {   // middileware auth or not 
  //   if (isUnauthorized(event)) {
  //     return next(new Error("unauthorized event"));
  //   }
  //   next();
  // });

  socket.on("error", (err) => {
    if (err && err.message === "unauthorized event") {
      socket.disconnect();
    }
  });

});