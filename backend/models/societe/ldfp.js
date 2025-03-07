const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('ldfp', {
    NumBL: {
      type: DataTypes.STRING(9),
      allowNull: false,
      primaryKey: true
    },
    DateBL: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      defaultValue: "2000-01-01"
    },
    CodeART: {
      type: DataTypes.STRING(20),
      allowNull: false,
      primaryKey: true
    },
    DesART: {
      type: DataTypes.STRING(250),
      allowNull: true
    },
    QteART: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      defaultValue: 0
    },
    PUART: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      defaultValue: 0
    },
    Remise: {
      type: DataTypes.DOUBLE(12,3),
      allowNull: true,
      defaultValue: 0.000
    },
    TauxTVA: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      defaultValue: 0
    },
    TauxTVAB: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      defaultValue: 0
    },
    Unite: {
      type: DataTypes.STRING(5),
      allowNull: true
    },
    TypeART: {
      type: DataTypes.STRING(12),
      allowNull: true
    },
    CodeREP: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    TTFodec: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      defaultValue: 0
    },
    TauxMAJO: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      defaultValue: 0
    },
    Conf: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    taux: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      defaultValue: 0
    },
    NLigne: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    famille: {
      type: DataTypes.STRING(8),
      allowNull: false,
      primaryKey: true
    },
    tauxavance: {
      type: DataTypes.FLOAT(12,3),
      allowNull: true,
      defaultValue: 0.000
    },
    nbun: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      defaultValue: 1
    },
    num: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    lot: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    Item: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    marque: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    disponible: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    mttc: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      defaultValue: 0
    },
    numseq: {
      type: DataTypes.BIGINT,
      allowNull: true,
      defaultValue: 0
    },
    qteliv: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      defaultValue: 0
    },
    codedep: {
      type: DataTypes.STRING(2),
      allowNull: true
    },
    libdep: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    typeapp: {
      type: DataTypes.STRING(2),
      allowNull: true
    },
    origine: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    QteACC: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    dateretenu: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      defaultValue: "2000-01-01"
    },
    valeur: {
      type: DataTypes.TINYINT,
      allowNull: true
    },
    Tcons: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      defaultValue: 0
    },
    codepv: {
      type: DataTypes.STRING(50),
      allowNull: true,
      defaultValue: "0"
    }
  }, {
    sequelize,
    tableName: 'ldfp',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "NumBL" },
          { name: "CodeART" },
          { name: "NLigne" },
          { name: "famille" },
        ]
      },
    ]
  });
};
