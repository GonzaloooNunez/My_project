const express = require("express");
const Usuario = require("../models/Usuario");
const Game = require("../models/Games");
const Admin = require("../models/Admin");
const { isAdmin, isUser } = require("../middlewares/authorization.js");

const router = express.Router();

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
