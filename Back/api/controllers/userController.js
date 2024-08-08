const Usuario = require("../models/Usuario");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const SALT_ROUNDS = 10;
const JWT_SECRET = process.env.JWT_SECRET;

// Registro de usuario
const signup = async (req, res) => {
  try {
    const { email, password, name, role } = req.body;

    console.log(email, password, name, role);
    if (!email || !password || !name || !role) {
      throw new Error("Todos los campos son obligatorios");
    }

    // Verifica si el usuario ya existe
    const existingUser = await Usuario.findOne({ email });
    if (existingUser) {
      throw new Error("El usuario ya existe");
    }

    const hash = bcrypt.hashSync(password, SALT_ROUNDS);

    // Crea un nuevo usuario
    const usuario = new Usuario({
      name,
      email,
      password: hash,
      role,
    });

    // Guarda el usuario en la base de datos
    const savedUser = await usuario.save();
    res.status(201).json(savedUser);
  } catch (error) {
    console.error(`[${error.name}]: ${error.message} - ${error.stack}`);
    res.status(400).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new Error("No se ha proporcionado el campo email o password");
    }

    const user = await Usuario.findOne({ email });

    if (!user) {
      return res
        .status(400)
        .json({ message: `El usuario con email ${email} no existe` });
    }

    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ message: "La contraseña es incorrecta" });
    }

    const token = jwt.sign(
      {
        name: user.name,
        id: user.id,
        email: user.email,
        role: user.role,
      },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "None",
    });

    res.status(200).json({
      message: "Inicio de sesión exitoso",
      user,
      token: token,
    });
  } catch (error) {
    console.error(`[${error.name}]: ${error.message} - ${error.stack}`);
    res.status(400).json({ message: error.message });
  }
};

const findOneById = async (req, res) => {
  try {
    const user = await Usuario.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password } = req.body;

    const user = await Usuario.findById(id);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    if (name) user.name = name;
    if (email) user.email = email;
    if (password) user.password = bcrypt.hashSync(password, SALT_ROUNDS);

    const updatedUser = await user.save();
    res.json(updatedUser);
  } catch (error) {
    console.error(`[${error.name}]: ${error.message} - ${error.stack}`);
    res.status(400).json({ message: error.message });
  }
};

module.exports = { signup, login, findOneById, updateUser };
