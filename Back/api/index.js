require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const router = require("./routes/routes");

const app = express();
const port = process.env.PORT || 3000;

const userRoutes = require("./routes/userRoutes");
const gamesRoutes = require("./routes/gamesRoutes");

// Conectar a MongoDB
connectDB();

// Middleware para parsear JSON
app.use(express.json());

// usar rutas

app.use("/", router);
app.use("/user", userRoutes); //Todos lo de este router lleva /user antes en la url /user/signup, /user/login
app.use("/games", gamesRoutes);

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
