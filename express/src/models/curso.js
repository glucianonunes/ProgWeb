'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Curso extends Model {

    static associate(models) {
      this.belongsTo(models.Area);
    }
  }
  Curso.init({
    sigla: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        len:{
          args: [4,4],
          msg: "sigla precisa conter 4 caracteres"
        }
      }
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        len:{
          args: [5,40],
          msg: "O nome do curso precisa conter entre 3 e 40 caracteres"
        }
      }
    },
    descricao: DataTypes.TEXT,
    areaId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Curso',
  });
  return Curso;
};