const express = require("express");
const Usuario = require("../models/Usuario");
const Admin = require("../models/Admin");

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

// Ruta para obtener un usuario por ID
router.get("/usuarios/:id", async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.params.id);
    if (!usuario)
      return res.status(404).json({ message: "Usuario no encontrado" });
    res.json(usuario);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Ruta para crear un usuario
router.post("/usuarios", async (req, res) => {
  const usuario = new Usuario({
    name: req.body.name,
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
    name: req.body.name,
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

// Ruta para modificar datos de un usuario
router.put("/usuarios/:id", async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.params.id);
    if (!usuario)
      return res.status(404).json({ message: "Usuario no encontrado" });

    if (req.body.name) usuario.name = req.body.name;
    if (req.body.email) usuario.email = req.body.email;
    if (req.body.password) usuario.password = req.body.password;

    const usuarioActualizado = await usuario.save();
    res.json(usuarioActualizado);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
