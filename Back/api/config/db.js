const mongoose = require("mongoose");

const uri = process.env.MONGODB_URI;

const connectDB = async () => {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Conectado a MongoDB");
  } catch (error) {
    console.error("Error al conectar a MongoDB", error);
    process.exit(1);
  }
};

module.exports = connectDB;
