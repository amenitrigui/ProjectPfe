

const { DataTypes } = require("sequelize");
const { sequelizeUserERP } = require("../db/config");

/**
 * Description
 * @author Bilel
 * @date 2025-02-06
 * @returns {any}
 */
const Societe = sequelizeUserERP.define('societe', {
    code: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    nom: {
      type: DataTypes.STRING,
    },
  }, {
    tableName: 'societe',
    timestamps: false,
  });   


  module.exports = {  Societe };