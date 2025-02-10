const { DataTypes } = require("sequelize");
const { sequelizeUserERP } = require("../db/config");

const User = sequelizeUserERP.define('User', {
    codeuser: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      nom: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      motpasse: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    }, {
      tableName: 'utilisateur',  
      timestamps: false,  
    });

    module.exports = User;