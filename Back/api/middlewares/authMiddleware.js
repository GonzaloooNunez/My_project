const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

const isLogged = (req, res) => {
  try {
    const bearerToken = req.headers.authorization;
    if (!bearerToken) throw new Error("El usuario no está logeado");

    const token = bearerToken.split(" ").pop();
    const user = jwt.verify(token, JWT_SECRET);

    return user;
  } catch (error) {
    const { name, message, stack } = error;
    console.error(`[${name}]: ${message} - ${stack}`);
    res.status(401).json({ message });
    return null;
  }
};

const isUser = (req, res, next) => {
  const user = isLogged(req, res);

  if (!user)
    return res.status(403).json({ message: "El usuario no esta logeado" });
  req.user = user;
  next();
};

const isAdmin = (req, res, next) => {
  const user = isLogged(req, res);

  if (!user) {
    return res.status(401).json({ message: "No autenticado" });
  }

  if (user.role !== "Admin") {
    return res
      .status(403)
      .json({ message: "El usuario no es un administrador" });
  }

  next();
};

module.exports = { isAdmin, isUser, isLogged };
