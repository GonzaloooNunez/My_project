require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");
const router = require("./routes/routes");

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());
const port = process.env.PORT || 3000;

const userRoutes = require("./routes/userRoutes");
const gamesRoutes = require("./routes/gamesRoutes");

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
