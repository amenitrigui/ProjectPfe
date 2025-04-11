const { DataTypes } = require('sequelize');
module.exports = function(sequelize) {
  return sequelize.define('pointvente', {
    Code: {
      type: DataTypes.STRING(3),
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
    typepv: {
      type: DataTypes.STRING(2),
      allowNull: true
    },
    multidepot: {
      type: DataTypes.STRING(1),
      allowNull: true,
      defaultValue: "0"
    },
    validtrsauto: {
      type: DataTypes.STRING(1),
      allowNull: true,
      defaultValue: "0"
    },
    tauxmarge: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      defaultValue: 0
    },
    codetrs: {
      type: DataTypes.STRING(8),
      allowNull: true
    },
    rstrs: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    PFA: {
      type: DataTypes.STRING(2),
      allowNull: true
    },
    SFA: {
      type: DataTypes.STRING(7),
      allowNull: true
    },
    IFA: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    AIFA: {
      type: DataTypes.STRING(1),
      allowNull: true,
      defaultValue: "0"
    },
    PFC: {
      type: DataTypes.STRING(2),
      allowNull: true
    },
    SFC: {
      type: DataTypes.STRING(7),
      allowNull: true
    },
    IFC: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    AIFC: {
      type: DataTypes.STRING(1),
      allowNull: true,
      defaultValue: "0"
    },
    PBL: {
      type: DataTypes.STRING(2),
      allowNull: true
    },
    SBL: {
      type: DataTypes.STRING(7),
      allowNull: true
    },
    IBL: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    AIBL: {
      type: DataTypes.STRING(1),
      allowNull: true,
      defaultValue: "0"
    },
    PBS: {
      type: DataTypes.STRING(2),
      allowNull: true
    },
    SBS: {
      type: DataTypes.STRING(7),
      allowNull: true
    },
    IBS: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    AIBS: {
      type: DataTypes.STRING(1),
      allowNull: true,
      defaultValue: "0"
    },
    banque: {
      type: DataTypes.STRING(32),
      allowNull: true
    },
    rib: {
      type: DataTypes.STRING(32),
      allowNull: true
    },
    PFRC: {
      type: DataTypes.STRING(2),
      allowNull: true
    },
    SFRC: {
      type: DataTypes.STRING(7),
      allowNull: true
    },
    IFRC: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    AIFRC: {
      type: DataTypes.STRING(1),
      allowNull: true,
      defaultValue: "0"
    },
    PDEV: {
      type: DataTypes.STRING(2),
      allowNull: true
    },
    SDEV: {
      type: DataTypes.STRING(7),
      allowNull: true
    },
    AIDEV: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    IDEV: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    solde: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      defaultValue: 0
    },
    PBE: {
      type: DataTypes.STRING(2),
      allowNull: true
    },
    SBE: {
      type: DataTypes.STRING(7),
      allowNull: true
    },
    IBE: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    AIBE: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    PBC: {
      type: DataTypes.STRING(2),
      allowNull: true
    },
    SBC: {
      type: DataTypes.STRING(7),
      allowNull: true
    },
    IBC: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    AIBC: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    PBCF: {
      type: DataTypes.STRING(2),
      allowNull: true
    },
    SBCF: {
      type: DataTypes.STRING(7),
      allowNull: true
    },
    IBCF: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    AIBCF: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    PED: {
      type: DataTypes.STRING(2),
      allowNull: true
    },
    SED: {
      type: DataTypes.STRING(7),
      allowNull: true
    },
    IED: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    AIED: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    PFBE: {
      type: DataTypes.STRING(2),
      allowNull: true
    },
    SFBE: {
      type: DataTypes.STRING(7),
      allowNull: true
    },
    IFBE: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    AIFBE: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    IP_PV: {
      type: DataTypes.STRING(15),
      allowNull: true
    },
    VUSER: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    matf: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    Pwd: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    Port_conn: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    User: {
      type: DataTypes.STRING(20),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'pointvente',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "Code" },
        ]
      },
      {
        name: "CodeDep",
        using: "BTREE",
        fields: [
          { name: "Code" },
        ]
      },
    ]
  });
};
