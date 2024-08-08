const mongoose = require("mongoose");
const Game = require("../models/Games");

const remove = async (req, res) => {
  try {
    const game = await Game.findById(req.params.id);
    if (!game) return res.status(404).json({ message: "Juego no encontrado" });

    await Game.findByIdAndDelete(req.params.id);

    res.json({ message: "Juego eliminado" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const update = async (req, res) => {
  try {
    console.log("Updating game with ID:", req.params.id);

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "ID inválido" });
    }

    const game = await Game.findById(req.params.id);
    if (!game) return res.status(404).json({ message: "Juego no encontrado" });

    if (req.body.name != null) game.name = req.body.name;
    if (req.body.categoria != null) game.categoria = req.body.categoria;
    if (req.body.precio != null) game.precio = req.body.precio;
    if (req.body.stock != null) game.stock = req.body.stock;
    if (req.body.fecha_creacion != null)
      game.fecha_creacion = req.body.fecha_creacion;
    if (req.body.imagen != null) game.imagen = req.body.imagen;

    const updatedGame = await game.save();
    res.json(updatedGame);
  } catch (err) {
    console.error("Error updating game:", err);
    res.status(400).json({ message: err.message });
  }
};

const create = async (req, res) => {
  const game = new Game({
    name: req.body.name,
    categoria: req.body.categoria,
    precio: req.body.precio,
    stock: req.body.stock,
    fecha_creacion: req.body.fecha_creacion,
    imagen: req.body.imagen,
  });

  try {
    const nuevoGame = await game.save();
    res.status(201).json(nuevoGame);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const createMany = async (req, res) => {
  const games = req.body;

  try {
    if (Array.isArray(games)) {
      const nuevosGames = await Game.insertMany(games);
      res.status(201).json(nuevosGames);
    } else {
      const game = new Game(games);
      const nuevoGame = await game.save();
      res.status(201).json(nuevoGame);
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const findAll = async (req, res) => {
  try {
    const games = await Game.find();
    res.json(games);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const findOne = async (req, res) => {
  try {
    const game = await Game.findById(req.params.id);
    if (!game) return res.status(404).json({ message: "Juego no encontrado" });
    res.json(game);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { remove, update, create, createMany, findAll, findOne };
