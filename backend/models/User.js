const { DataTypes } = require("sequelize");
const { sequelizeUserERP } = require("../db/config");

/**
 * Description
 * Créer un objet user qui corresond à l'entité utilisateur dans la base de données
 * @author Bilel
 * @date 2025-02-06
 * @returns {user}
 */
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