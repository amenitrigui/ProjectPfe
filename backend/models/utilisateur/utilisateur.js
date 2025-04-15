const { DataTypes } = require('sequelize');
module.exports = function(sequelize) {
  return sequelize.define('utilisateur', {
    codeuser: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nom: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    motpasse: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    type: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    jnlactif: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    prog1: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    prog2: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    prog3: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    prog4: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    bloque: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    actif: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    numvol: {
      type: DataTypes.STRING(12),
      allowNull: true
    },
    socutil: {
      type: DataTypes.STRING(8),
      allowNull: true
    },
    etatbcf: {
      type: DataTypes.STRING(1),
      allowNull: true,
      defaultValue: "0"
    },
    etatbcc: {
      type: DataTypes.STRING(1),
      allowNull: true,
      defaultValue: "0"
    },
    etatcl: {
      type: DataTypes.STRING(1),
      allowNull: true,
      defaultValue: "0"
    },
    etatfr: {
      type: DataTypes.STRING(1),
      allowNull: true,
      defaultValue: "0"
    },
    etatbe: {
      type: DataTypes.STRING(1),
      allowNull: true,
      defaultValue: "0"
    },
    etatvente: {
      type: DataTypes.STRING(1),
      allowNull: true,
      defaultValue: "0"
    },
    etatdemachat: {
      type: DataTypes.STRING(1),
      allowNull: true,
      defaultValue: "0"
    },
    vente: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    achat: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    client: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    frs: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    bcc: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    bcf: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    stat: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    acces: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    afftot: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    socutilclot: {
      type: DataTypes.STRING(8),
      allowNull: true
    },
    directeur: {
      type: DataTypes.STRING(2),
      allowNull: true
    },
    etatmarge: {
      type: DataTypes.STRING(1),
      allowNull: true,
      defaultValue: "0"
    },
    exercice: {
      type: DataTypes.STRING(4),
      allowNull: true
    },
    etatimport: {
      type: DataTypes.STRING(1),
      allowNull: true,
      defaultValue: "0"
    },
    etatbestk: {
      type: DataTypes.STRING(1),
      allowNull: true,
      defaultValue: "0"
    },
    Etatbcfstk: {
      type: DataTypes.STRING(1),
      allowNull: true,
      defaultValue: "0"
    },
    etatfrstk: {
      type: DataTypes.STRING(1),
      allowNull: true,
      defaultValue: "0"
    },
    etatimportstk: {
      type: DataTypes.STRING(1),
      allowNull: true,
      defaultValue: "0"
    },
    etatbccstk: {
      type: DataTypes.STRING(1),
      allowNull: true,
      defaultValue: "0"
    },
    etatimmo: {
      type: DataTypes.STRING(1),
      allowNull: true,
      defaultValue: "0"
    },
    acceclot: {
      type: DataTypes.STRING(1),
      allowNull: true,
      defaultValue: "0"
    },
    BL: {
      type: DataTypes.STRING(1),
      allowNull: true,
      defaultValue: "0"
    },
    FC: {
      type: DataTypes.STRING(1),
      allowNull: true,
      defaultValue: "0"
    },
    TICKCAIS: {
      type: DataTypes.STRING(1),
      allowNull: true,
      defaultValue: "0"
    },
    GESTBE: {
      type: DataTypes.STRING(1),
      allowNull: true,
      defaultValue: "0"
    },
    impbarre: {
      type: DataTypes.STRING(1),
      allowNull: true,
      defaultValue: "0"
    },
    PARAM: {
      type: DataTypes.STRING(1),
      allowNull: true,
      defaultValue: "0"
    },
    mp1: {
      type: DataTypes.STRING(16),
      allowNull: true
    },
    mp2: {
      type: DataTypes.STRING(16),
      allowNull: true
    },
    mp3: {
      type: DataTypes.STRING(16),
      allowNull: true
    },
    mp4: {
      type: DataTypes.STRING(16),
      allowNull: true
    },
    mp5: {
      type: DataTypes.STRING(16),
      allowNull: true
    },
    dernacce: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    nbrjr: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'utilisateur',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "codeuser" },
        ]
      },
    ]
  });
};
