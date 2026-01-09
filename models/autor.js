const sequelize = require('./database');
const { DataTypes } = require('sequelize');

const Autor = sequelize.define('Autor', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  nacionalidad: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  tableName: 'autor',
  timestamps: false
});

module.exports = Autor;
