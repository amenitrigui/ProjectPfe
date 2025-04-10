const {DataTypes} = require('sequelize');
module.exports = function(sequelize) {
  return sequelize.define('depot', {
    Code: {
      type: DataTypes.STRING(2),
      allowNull: false,
      primaryKey: true
    },
    Libelle: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    Adresse: {
      type: DataTypes.STRING(40),
      allowNull: true
    },
    Responsable: {
      type: DataTypes.STRING(25),
      allowNull: true
    },
    Datec: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      defaultValue: "2000-01-01"
    },
    TEL: {
      type: DataTypes.STRING(15),
      allowNull: true
    },
    FAX: {
      type: DataTypes.STRING(15),
      allowNull: true
    },
    EMAIL: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    TYPED: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    codepv: {
      type: DataTypes.STRING(3),
      allowNull: false,
      primaryKey: true
    },
    libpv: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    inactif: {
      type: DataTypes.STRING(1),
      allowNull: true,
      defaultValue: "0"
    },
    sel: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    SAISIQTENEG: {
      type: DataTypes.STRING(1),
      allowNull: true,
      defaultValue: "0"
    }
  }, {
    sequelize,
    tableName: 'depot',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "Code" },
          { name: "codepv" },
        ]
      },
    ]
  });
};
