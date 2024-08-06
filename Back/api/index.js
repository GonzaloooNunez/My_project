require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");
const router = require("./routes/routes");
const userRoutes = require("./routes/userRoutes");
const gamesRoutes = require("./routes/gamesRoutes");

const app = express();
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:7000", // Cambia esto por la URL de tu frontend
    credentials: true, // Permite el envío de cookies
  })
);
app.use(express.json());

const port = process.env.PORT || 3000;

// Conectar a MongoDB
connectDB();

// Middleware para parsear JSON
app.use(express.json());

// usar rutas
app.use("/", router);
app.use("/user", userRoutes);
app.use("/games", gamesRoutes);

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
