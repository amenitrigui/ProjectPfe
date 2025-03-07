const {DataTypes} = require('sequelize');
module.exports = function(sequelize) {
  return sequelize.define('dfp', {
    NUMBL: {
      type: DataTypes.STRING(9),
      allowNull: false,
      primaryKey: true
    },
    ADRCLI: {
      type: DataTypes.STRING(81),
      allowNull: true
    },
    CODECLI: {
      type: DataTypes.STRING(8),
      allowNull: true
    },
    CODEFACTURE: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    CP: {
      type: DataTypes.STRING(40),
      allowNull: true
    },
    MODEREG: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    COM1: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    COM2: {
      type: DataTypes.STRING(60),
      allowNull: true
    },
    COM3: {
      type: DataTypes.STRING(60),
      allowNull: true
    },
    DATEBL: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      defaultValue: "2000-01-01"
    },
    MREMISE: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      defaultValue: 0
    },
    MTTC: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      defaultValue: 0
    },
    MTVA: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      defaultValue: 0
    },
    BASE1: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      defaultValue: 0
    },
    BASE2: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      defaultValue: 0
    },
    BASE3: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      defaultValue: 0
    },
    BASE4: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      defaultValue: 0
    },
    BASE5: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      defaultValue: 0
    },
    TVA1: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      defaultValue: 0
    },
    TVA2: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      defaultValue: 0
    },
    TVA3: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      defaultValue: 0
    },
    TVA4: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      defaultValue: 0
    },
    TVA5: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      defaultValue: 0
    },
    RSCLI: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    TAUXREMISE: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      defaultValue: 0
    },
    MHT: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      defaultValue: 0
    },
    EXON: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    MFODEC: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      defaultValue: 0
    },
    BFODEC: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      defaultValue: 0
    },
    RETENUE: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      defaultValue: 0
    },
    CEXPORT: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    CODEREP: {
      type: DataTypes.STRING(3),
      allowNull: true
    },
    RSREP: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    CODETVA: {
      type: DataTypes.STRING(17),
      allowNull: true
    },
    MAJ1: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      defaultValue: 0
    },
    MAJ2: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      defaultValue: 0
    },
    MAJ3: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      defaultValue: 0
    },
    MAJ4: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      defaultValue: 0
    },
    MAJ5: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      defaultValue: 0
    },
    TIMBRE: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      defaultValue: 0
    },
    MAJO: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      defaultValue: 0
    },
    TREMISE: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      defaultValue: 0
    },
    FACTURE: {
      type: DataTypes.STRING(9),
      allowNull: true
    },
    CODEVAL: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    CODESEL: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    TVADUE: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      defaultValue: 0
    },
    CODERAP: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    BONINTER: {
      type: DataTypes.STRING(8),
      allowNull: true
    },
    CODECHA: {
      type: DataTypes.STRING(8),
      allowNull: true
    },
    DESICHA: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    AGENT: {
      type: DataTypes.STRING(3),
      allowNull: true
    },
    FODECDUE: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      defaultValue: 0
    },
    NUMBC: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    TGARANTIE: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      defaultValue: 0
    },
    TRSOURCE: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      defaultValue: 0
    },
    MGARANTIE: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      defaultValue: 0
    },
    DATEDMAJ: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      defaultValue: "2000-01-01"
    },
    DECISION: {
      type: DataTypes.STRING(90),
      allowNull: true
    },
    REFCOMM: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    comm: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    commint: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    delailivr: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    transport: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    modepaie: {
      type: DataTypes.STRING(300),
      allowNull: true
    },
    usera: {
      type: DataTypes.STRING(2),
      allowNull: true
    },
    userm: {
      type: DataTypes.STRING(2),
      allowNull: true
    },
    users: {
      type: DataTypes.STRING(2),
      allowNull: true
    },
    baseavance: {
      type: DataTypes.DOUBLE(12,3),
      allowNull: true,
      defaultValue: 0.000
    },
    mtavance: {
      type: DataTypes.DOUBLE(12,3),
      allowNull: true,
      defaultValue: 0.000
    },
    descriptiontxt: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    Description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    mlettre: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    datt: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      defaultValue: "2000-01-01"
    },
    executer: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    mnht: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    confcl: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    confcltxt: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    codsui: {
      type: DataTypes.STRING(6),
      allowNull: true
    },
    dessui: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    contacte: {
      type: DataTypes.STRING(150),
      allowNull: true
    },
    commentaire: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    mtlettre: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    nb: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    remglo: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      defaultValue: 0
    },
    commentete: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    modeliv: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    valoff: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    arrondi: {
      type: DataTypes.FLOAT(12,3),
      allowNull: true,
      defaultValue: 0.000
    },
    champ1: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    champ2: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    champ3: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    champ4: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    champ5: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    champ6: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    champ7: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    champ8: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    champ9: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    champ10: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    champ11: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    affichec: {
      type: DataTypes.STRING(1),
      allowNull: true,
      defaultValue: "N"
    },
    affichet: {
      type: DataTypes.STRING(1),
      allowNull: true,
      defaultValue: "N"
    },
    affiched: {
      type: DataTypes.STRING(1),
      allowNull: true,
      defaultValue: "N"
    },
    papierb: {
      type: DataTypes.STRING(1),
      allowNull: true,
      defaultValue: "O"
    },
    codepv: {
      type: DataTypes.STRING(3),
      allowNull: true
    },
    libpv: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    typeapp: {
      type: DataTypes.STRING(2),
      allowNull: true
    },
    cloturer: {
      type: DataTypes.STRING(1),
      allowNull: true,
      defaultValue: "N"
    },
    datelimit: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      defaultValue: "2000-01-01"
    },
    valorisation: {
      type: DataTypes.STRING(3),
      allowNull: true
    },
    PFvalide: {
      type: DataTypes.STRING(1),
      allowNull: true,
      defaultValue: "1"
    },
    PFmodif: {
      type: DataTypes.STRING(4),
      allowNull: true,
      defaultValue: "0"
    },
    retenuefp: {
      type: DataTypes.STRING(2),
      allowNull: true
    },
    subv: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0
    },
    cred: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0
    },
    etatcl: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: " "
    },
    Bcons: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0
    },
    Mcons: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0
    },
    duree1: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    duree2: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    TEMPDMAJ: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    codesecteur: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    puissance: {
      type: DataTypes.DOUBLE(6,3),
      allowNull: true
    },
    reference: {
      type: DataTypes.STRING(20),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'dfp',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "NUMBL" },
        ]
      },
    ]
  });
};
