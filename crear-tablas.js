const { sequelize } = require("./models/database");

require("./models/autor");
require("./models/genero");
require("./models/libro");

const iniciar = async () =>{
    try {
        await sequelize.authenticate();
        console.log("Base de datos conectada");
        await sequelize.sync({alter: true});
        console.log("Tablas creadas");
        process.exit(0);
    } catch (error) {
        console.log("Error "+ error);
        process.exit(1);
    }
}

iniciar();