const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
const socket = require('socket.io');

const { connectDB } = require('./Src/Config/db');
const routes = require('./Src/Routes');
const { notFound, errorHandler } = require("./Src/Middlewares/errorHandler");
const { AutherizedUser } = require('./Src/Middlewares/AuthMiddleWare');
const { addMessage } = require('./Src/Controllers/Chat/ChatController');

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

const io = socket(Server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
}); //Initializing socket connction
io.use(AutherizedUser);
io.on("connection", (socket) => {
  socket.on("join_room", (data) => { // accepting an event.  join_room : matching name with client side
    console.log(data, "join_room "); //from client id room no 
    socket.join(data);
  });

  socket.on("send_message", async (data) => { // accepting an event.  
    console.log(data, "send_message ");
    const content = { messageContent: data.message, sender: socket?.user?._id?.toString(), chat: data.room };

    // call chat controller
    const myMessages = await addMessage(content);
    socket.to(data.room).emit("recieve_message", myMessages);
    // socket.in(data.room).emit("recieve_message", myMessages);

  });

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

  socket.on("error", (err) => {
    if (err && err.message === "unauthorized event") {
      socket.disconnect();
    }
  });

});