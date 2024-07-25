const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const usuarioSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: "User" },
  fecha_creacion: { type: Date, default: Date.now },
});

// Hash de contraseña antes de guardar si ha sido modificada
usuarioSchema.pre("save", async function (next) {
  if (this.isModified("password") || this.isNew) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

const Usuario = mongoose.model("Usuario", usuarioSchema);

module.exports = Usuario;
