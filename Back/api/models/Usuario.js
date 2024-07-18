const mongoose = require("mongoose");

const usuarioSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  fecha_creacion: { type: Date, default: Date.now },
  role: { type: String, required: true },
});

const Usuario = mongoose.model("Usuario", usuarioSchema);

module.exports = Usuario;
