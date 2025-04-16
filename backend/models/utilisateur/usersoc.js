const { DataTypes } = require('sequelize');
module.exports = function(sequelize) {
  return sequelize.define('usersoc', {
    CODEUSER: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: "",
      primaryKey: true
    },
    societe: {
      type: DataTypes.STRING(8),
      allowNull: false,
      defaultValue: "",
      primaryKey: true
    },
    accee: {
      type: DataTypes.STRING(1),
      allowNull: true,
      defaultValue: "0"
    },
    ecriture: {
      type: DataTypes.STRING(1),
      allowNull: true,
      defaultValue: "0"
    },
    Projet: {
      type: DataTypes.STRING(20),
      allowNull: false,
      primaryKey: true
    },
    seltmp: {
      type: DataTypes.STRING(1),
      allowNull: true,
      defaultValue: "0"
    },
    acceclot: {
      type: DataTypes.STRING(1),
      allowNull: true,
      defaultValue: "0"
    },
    rsoc: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: ""
    },
    ip: {
      type: DataTypes.STRING(50),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'usersoc',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "CODEUSER" },
          { name: "societe" },
          { name: "Projet" },
        ]
      },
    ]
  });
};
