const { sequelize } = require("./models/database");

require("./models/autor");
require("./models/libro");
require("./models/genero");

const build = async ()=>{
    try {
        await sequelize.authenticate();
        console.log("Base de datos conectada");
        await sequelize.sync({alter: true});
        console.log("Tablas creadas");
        process.exit(0);
    } catch (error) {
        console.log("Error "+error);
        process.exit(0)
    }
}

build();