require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");
const passport = require("passport");
const passportSetup = require("./passport");
const { Server } = require("socket.io");
const { createServer } = require("node:http");

const cartasRoutes = require("./routes/cardsRoutes");
const gamesRoutes = require("./routes/gamesRoutes");
const authRoutes = require("./routes/auth");

const { gameSockets } = require("./sockets/gameSockets");

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // Asegúrate de que coincida con la URL de tu cliente
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// MIDDLEWARES

app.use(
  cookieSession({
    name: "session",
    keys: ["dunkkingcards"],
    maxAge: 24 * 60 * 60 * 100,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  // Redirige o envía un mensaje de error según sea necesario
  res.status(401).send("No autorizado");
}

server.listen(process.env.PORT || 4000, () => {
  console.log(`Server running at http://localhost:${process.env.PORT || 4000}`);
});

// ROUTES
app.use(express.json());
app.use("/cartas", isLoggedIn, cartasRoutes);
app.use("/games", isLoggedIn, gamesRoutes);
app.use("/auth", authRoutes);

// SOCKETS

io.on("connection", (socket) => {
  gameSockets(socket, io);
});
