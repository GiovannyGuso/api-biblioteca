const { sequelize, DataTypes } = require("./database");
const Autor = require("./autor");
const Genero = require("./genero");

const Libro = sequelize.define(
  "Libro",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    titulo: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    editorial: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    id_autor: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    id_genero: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
  },
  {
    tableName: "libro",
    timestamps: false,
  }
);

Libro.belongsTo(Autor,{
    foreignKey:'id_autor',
    as:'autor'
});

Libro.belongsTo(Genero,{
    foreignKey:'id_genero',
    as:'genero'
});

module.exports = Libro;