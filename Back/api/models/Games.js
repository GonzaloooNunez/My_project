const mongoose = require("mongoose");

const ratingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
});

const commentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: false,
  },
  gameId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Game",
    required: false,
  },
  comment: { type: String, required: true },
  userName: { type: String, required: false },
  date: { type: Date, default: Date.now },
});

const gamesSchema = new mongoose.Schema({
  name: { type: String, required: true },
  categoria: { type: String, required: true },
  precio: { type: Number, required: true },
  stock: { type: Number, required: true },
  fecha_creacion: { type: Number, required: true },
  imagen: { type: String, required: true },
  ratings: [ratingSchema],
  comments: [commentSchema],
});

const Game = mongoose.model("Game", gamesSchema);

module.exports = Game;
