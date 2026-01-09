require('dotenv').config();
const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000;
const sequelize = require("./models/database"); // <- así, sin llaves

const autor = require("./routes/autor");
const genero = require("./routes/genero");
const libro = require("./routes/libro");

app.use(express.json());

app.use('/autor', autor);
app.use('/genero', genero);
app.use('/libro', libro);

app.get("/", (req, res) => {
  res.json({ mensaje: "Bienvenido a la API con Express y Sequelize" });
});

const start = async () => {
  try {
    await sequelize.authenticate();
    console.log("Base de datos conectada");
    require("./models/autor");
    require("./models/genero");
    require("./models/libro");

    await sequelize.sync({ alter: true }); 
    console.log("Tablas sincronizadas (creadas/actualizadas) desde modelos");


    app.listen(PORT, () => {
      console.log(`Escuchando desde el puerto: ${PORT}`);
    });
  } catch (error) {
    console.error("No se pudo conectar a la base de datos:", error);
  }
};

start();
