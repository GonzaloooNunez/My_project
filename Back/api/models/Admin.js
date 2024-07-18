const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  fecha_creacion: { type: Date, default: Date.now },
});

const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;
