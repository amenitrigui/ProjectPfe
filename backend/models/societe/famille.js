const { DataTypes } = require('sequelize');
module.exports = function(sequelize) {
  return sequelize.define('famille', {
    code: {
      type: DataTypes.STRING(8),
      allowNull: false,
      defaultValue: "",
      primaryKey: true
    },
    libelle: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    achat: {
      type: DataTypes.STRING(8),
      allowNull: true
    },
    vente: {
      type: DataTypes.STRING(8),
      allowNull: true
    },
    dispo: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      defaultValue: 0
    },
    sav: {
      type: DataTypes.STRING(3),
      allowNull: true,
      defaultValue: "N"
    },
    immeuble: {
      type: DataTypes.STRING(3),
      allowNull: true,
      defaultValue: "N"
    },
    position: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    codepv: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    libpv: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    favoris: {
      type: DataTypes.STRING(1),
      allowNull: true,
      defaultValue: "0"
    },
    marge: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    remmax: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'famille',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "code" },
        ]
      },
    ]
  });
};
