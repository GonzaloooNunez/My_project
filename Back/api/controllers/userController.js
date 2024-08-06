const Usuario = require("../models/Usuario");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const SALT_ROUNDS = 10;
const JWT_SECRET = process.env.JWT_SECRET;

// Registro de usuario
const signup = async (req, res) => {
  try {
    const { email, password, nombre, role } = req.body;

    if (!email || !password || !nombre || !role) {
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
      nombre,
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

// Inicio de sesión
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new Error("No se ha proporcionado el campo email o password");
    }

    // Busca al usuario por email
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

    // Genera el token con el ID del usuario
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    // Envía el token en una cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "None",
    });

    res.status(200).json({
      message: "Inicio de sesión exitoso",
      userId: user._id,
      token: token,
    });
  } catch (error) {
    console.error(`[${error.name}]: ${error.message} - ${error.stack}`);
    res.status(400).json({ message: error.message });
  }
};

// Encontrar un usuario por ID
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

// Actualizar un usuario por ID
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, email, password } = req.body;

    // Verifica si el usuario existe
    const user = await Usuario.findById(id);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Actualiza la información del usuario
    if (nombre) user.nombre = nombre;
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
