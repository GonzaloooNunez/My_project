const mongoose = require("mongoose");

const gamesSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  categoria: { type: String, required: true },
  precio: { type: Number, required: true },
  stock: { type: Number, required: true },
  fecha_creacion: { type: Number, required: true },
  imagen: { type: String, required: true },
});

const Game = mongoose.model("Game", gamesSchema);

module.exports = Game;
