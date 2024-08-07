const mongoose = require("mongoose");

const usuarioSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: "User" },
  fecha_creacion: { type: Date, default: Date.now() },
});

const Usuario = mongoose.model("Usuario", usuarioSchema);

module.exports = Usuario;
