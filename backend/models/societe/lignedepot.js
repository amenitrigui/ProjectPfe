const { DataTypes } = require('sequelize');
module.exports = function(sequelize) {
  return sequelize.define('lignedepot', {
    codedep: {
      type: DataTypes.STRING(2),
      allowNull: false,
      primaryKey: true
    },
    codeart: {
      type: DataTypes.STRING(20),
      allowNull: false,
      primaryKey: true
    },
    libelle: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    desart: {
      type: DataTypes.STRING(250),
      allowNull: true
    },
    famille: {
      type: DataTypes.STRING(8),
      allowNull: false,
      defaultValue: "",
      primaryKey: true
    },
    qteart: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      defaultValue: 0
    },
    stockinitial: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      defaultValue: 0
    },
    stockmin: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      defaultValue: 0
    },
    stockmax: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      defaultValue: 0
    },
    typearticle: {
      type: DataTypes.STRING(2),
      allowNull: true
    },
    qteres: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      defaultValue: 0
    },
    datderninv: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    type: {
      type: DataTypes.STRING(12),
      allowNull: true
    },
    artmouv: {
      type: DataTypes.STRING(1),
      allowNull: true,
      defaultValue: "1"
    },
    lot: {
      type: DataTypes.STRING(1),
      allowNull: true,
      defaultValue: "0"
    },
    codepv: {
      type: DataTypes.STRING(5),
      allowNull: true,
      defaultValue: "0"
    },
    libpv: {
      type: DataTypes.STRING(50),
      allowNull: true,
      defaultValue: "0"
    },
    lieustock: {
      type: DataTypes.STRING(20),
      allowNull: true,
      defaultValue: "0"
    },
    sousfamille: {
      type: DataTypes.STRING(20),
      allowNull: true,
      defaultValue: "0"
    },
    qtereap: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'lignedepot',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "codedep" },
          { name: "codeart" },
          { name: "famille" },
        ]
      },
      {
        name: "codeart",
        using: "BTREE",
        fields: [
          { name: "codeart" },
        ]
      },
      {
        name: "codedep",
        using: "BTREE",
        fields: [
          { name: "codedep" },
        ]
      },
    ]
  });
};
