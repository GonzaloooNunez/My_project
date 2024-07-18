const Usuario = require("");

const bcrypt = require("bcrypt");
const SALT_ROUNDS = 10;

const signup = async (req, res) => {
  try {
    const email = req?.body?.email;
    if (!email) throw new Error("No se ha proporcionado el campo email");

    const password = req?.body?.password;
    if (!password) throw new Error("No se ha proporcionado el campo password");

    const nombre = req?.body?.nombre;
    if (!password) throw new Error("No se ha proporcionado el campo nombre");

    const hashedPassword = bcrypt.hashSync(password, SALT_ROUNDS);

    const usuario = new Usuario({
      nombre,
      email,
      password: hashedPassword,
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

    const user = await Usuario.find;
  } catch (error) {}
};

module.exports = { signup, login };
