const Usuario = require("../models/Usuario");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const SALT_ROUNDS = 10;
const JWT_SECRET = process.env.JWT_SECRET;

const signup = async (req, res) => {
  try {
    const email = req?.body?.email;
    if (!email) throw new Error("No se ha proporcionado el campo email");

    const password = req?.body?.password;
    if (!password) throw new Error("No se ha proporcionado el campo password");

    const nombre = req?.body?.nombre;
    if (!nombre) throw new Error("No se ha proporcionado el campo nombre");

    const role = req?.body?.role;
    if (!role) throw new Error("No se ha proporcionado el campo role");

    const hashedPassword = bcrypt.hashSync(password, SALT_ROUNDS);

    const usuario = new Usuario({
      nombre,
      email,
      password: hashedPassword,
      role,
    });

    const savedUser = await usuario.save();
    res.status(201).json(savedUser);
  } catch (error) {
    const { name, message, stack } = error;
    console.error(`[${name}]: ${message} - ${stack}`);
    res.status(400).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const email = req?.body?.email;
    if (!email) throw new Error("No se ha proporcionado el campo email");

    const password = req?.body?.password;
    if (!password) throw new Error("No se ha proporcionado el campo password");

    const user = await Usuario.findOne({ email });
    if (!user) throw new Error(`El usuario con email ${email} no existe`);

    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) throw new Error("La contraseña es incorrecta");

    const token = jwt.sign(user.toJSON(), JWT_SECRET);
    res.status(200).json({ token });
  } catch (error) {
    const { name, message, stack } = error;
    console.error(`[${name}]: ${message} - ${stack}`);
    res.status(400).json({ message: error.message });
  }
};

module.exports = { signup, login };
