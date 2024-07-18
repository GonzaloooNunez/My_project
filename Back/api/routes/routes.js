const express = require("express");
const Usuario = require("../models/Usuario");
const Game = require("../models/Games");
const Admin = require("../models/Admin");
const { isAdmin, isUser } = require("../middlewares/authorization.js");

const router = express.Router();

// Ruta para obtener games
router.get("/games", isAdmin, async (req, res) => {
  try {
    const games = await Game.find();
    res.json(games);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Ruta para crear un game
//router.post("/games", GameController.create)

router.post("/games", async (req, res) => {
  const game = new Game({
    nombre: req.body.nombre,
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
});

// Ruta para obtener todos los usuarios
router.get("/usuarios", async (req, res) => {
  try {
    const usuarios = await Usuario.find();
    res.json(usuarios);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Ruta para crear un usuario
router.post("/usuarios", async (req, res) => {
  const usuario = new Usuario({
    nombre: req.body.nombre,
    email: req.body.email,
    password: req.body.password,
  });
  try {
    const nuevoUsuario = await usuario.save();
    res.status(201).json(nuevoUsuario);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Ruta para crear un admin
router.post("/admins", async (req, res) => {
  const admin = new Admin({
    nombre: req.body.nombre,
    email: req.body.email,
    password: req.body.password,
  });
  try {
    const nuevoAdmin = await admin.save();
    res.status(201).json(nuevoAdmin);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
