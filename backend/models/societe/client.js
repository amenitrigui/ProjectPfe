const { DataTypes } = require('sequelize');
module.exports = function(sequelize) {
  return sequelize.define('client', {
    code: {
      type: DataTypes.STRING(8),
      allowNull: false,
      primaryKey: true
    },
    rsoc: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    adresse: {
      type: DataTypes.STRING(120),
      allowNull: true
    },
    cp: {
      type: DataTypes.STRING(6),
      allowNull: true
    },
    descp: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    ville: {
      type: DataTypes.STRING(40),
      allowNull: true
    },
    pays: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    telephone: {
      type: DataTypes.STRING(15),
      allowNull: true
    },
    fax: {
      type: DataTypes.STRING(15),
      allowNull: true
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    site: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    matriculef: {
      type: DataTypes.STRING(17),
      allowNull: true
    },
    banque: {
      type: DataTypes.STRING(32),
      allowNull: true
    },
    compteb: {
      type: DataTypes.STRING(32),
      allowNull: true
    },
    comptec: {
      type: DataTypes.STRING(8),
      allowNull: true
    },
    cltexport: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    timbref: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    exon: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    majotva: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    suspfodec: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    responsable1: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    responsable2: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    responsable3: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    titre1: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    titre2: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    titre3: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    gsm1: {
      type: DataTypes.STRING(15),
      allowNull: true
    },
    gsm2: {
      type: DataTypes.STRING(15),
      allowNull: true
    },
    gsm3: {
      type: DataTypes.STRING(15),
      allowNull: true
    },
    nposte1: {
      type: DataTypes.STRING(3),
      allowNull: true
    },
    nposte2: {
      type: DataTypes.STRING(3),
      allowNull: true
    },
    nposte3: {
      type: DataTypes.STRING(3),
      allowNull: true
    },
    tarif: {
      type: DataTypes.STRING(7),
      allowNull: true
    },
    offretick: {
      type: DataTypes.STRING(1),
      allowNull: true,
      defaultValue: "0"
    },
    Adresse1: {
      type: DataTypes.STRING(40),
      allowNull: true
    },
    Commentaire: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    bon: {
      type: DataTypes.STRING(1),
      allowNull: true,
      defaultValue: "0"
    },
    cin: {
      type: DataTypes.STRING(8),
      allowNull: true
    },
    typecli: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    emp: {
      type: DataTypes.STRING(1),
      allowNull: true,
      defaultValue: "0"
    },
    seloffre: {
      type: DataTypes.STRING(1),
      allowNull: true,
      defaultValue: "0"
    },
    susptva: {
      type: DataTypes.STRING(1),
      allowNull: true,
      defaultValue: "0"
    },
    decision: {
      type: DataTypes.STRING(35),
      allowNull: true
    },
    datec: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      defaultValue: "2000-01-01"
    },
    activite: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    coder: {
      type: DataTypes.STRING(3),
      allowNull: true
    },
    tel1: {
      type: DataTypes.STRING(15),
      allowNull: true
    },
    tel2: {
      type: DataTypes.STRING(15),
      allowNull: true
    },
    telex: {
      type: DataTypes.STRING(15),
      allowNull: true
    },
    codes: {
      type: DataTypes.STRING(3),
      allowNull: true
    },
    nature: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    remise: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      defaultValue: 0
    },
    typreg: {
      type: DataTypes.STRING(15),
      allowNull: true
    },
    scredit: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      defaultValue: 0
    },
    srisque: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      defaultValue: 0
    },
    coderep: {
      type: DataTypes.STRING(3),
      allowNull: true
    },
    desrep: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    mtdebit: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      defaultValue: 0
    },
    mtcredit: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      defaultValue: 0
    },
    soldeini: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      defaultValue: 0
    },
    solde: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      defaultValue: 0
    },
    blockage: {
      type: DataTypes.STRING(1),
      allowNull: true,
      defaultValue: "N"
    },
    desisec: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    desireg: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    desicp: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    ventiler: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      defaultValue: 0
    },
    livcours: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      defaultValue: 0
    },
    totregle: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      defaultValue: 0
    },
    aval1: {
      type: DataTypes.STRING(40),
      allowNull: true
    },
    aval2: {
      type: DataTypes.STRING(40),
      allowNull: true
    },
    datecin: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      defaultValue: "2000-01-01"
    },
    soldeinibs: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      defaultValue: 0
    },
    rsocar: {
      type: DataTypes.STRING(40),
      allowNull: true
    },
    adressear: {
      type: DataTypes.STRING(40),
      allowNull: true
    },
    soldebs: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      defaultValue: 0
    },
    fidel: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    datefidel: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      defaultValue: "2000-01-01"
    },
    remfidel: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      defaultValue: 0
    },
    typcarte: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    Matricule: {
      type: DataTypes.STRING(15),
      allowNull: true
    },
    numcarte: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    tauxconv: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    datcreat: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      defaultValue: "2000-01-01"
    },
    datexp: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      defaultValue: "2000-01-01"
    },
    chifaff: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      defaultValue: 0
    },
    nbrpts: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      defaultValue: 0
    },
    catot: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      defaultValue: 0
    },
    dernclot: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      defaultValue: "2000-01-01"
    },
    soldeinitexer: {
      type: DataTypes.DOUBLE(12,3),
      allowNull: true,
      defaultValue: 0.000
    },
    connaiss: {
      type: DataTypes.STRING(80),
      allowNull: true
    },
    profession: {
      type: DataTypes.STRING(80),
      allowNull: true
    },
    premAch: {
      type: DataTypes.STRING(1),
      allowNull: true,
      defaultValue: "O"
    },
    nbreEnf: {
      type: DataTypes.BIGINT,
      allowNull: true,
      defaultValue: 0
    },
    dat1: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      defaultValue: "2000-01-01"
    },
    dat2: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      defaultValue: "2000-01-01"
    },
    dat3: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      defaultValue: "2000-01-01"
    },
    dat4: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      defaultValue: "2000-01-01"
    },
    nom1: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    nom2: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    nom3: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    nom4: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    opf1: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    opf2: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    opf3: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    opf4: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    rsocconj: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    datnaissconj: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      defaultValue: "2000-01-01"
    },
    professconj: {
      type: DataTypes.STRING(80),
      allowNull: true
    },
    datnaiss: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      defaultValue: "2000-01-01"
    },
    datedebaut: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      defaultValue: "2000-01-01"
    },
    datefinaut: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      defaultValue: "2000-01-01"
    },
    typcli: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    regime: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    soldeinidevise: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      defaultValue: 0
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
    datemaj: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      defaultValue: "2000-01-01"
    },
    soldeinibl: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      defaultValue: 0
    },
    soldebl: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      defaultValue: 0
    },
    sdinilivencours: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      defaultValue: 0
    },
    totreglesd: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      defaultValue: 0
    },
    soldecont: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      defaultValue: 0
    },
    blnbon: {
      type: DataTypes.STRING(1),
      allowNull: true,
      defaultValue: "1"
    },
    NbPtsFid: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      defaultValue: 0
    },
    codepv: {
      type: DataTypes.CHAR(2),
      allowNull: true,
      defaultValue: "0"
    },
    contrat: {
      type: DataTypes.STRING(1),
      allowNull: true,
      defaultValue: "N"
    },
    fact: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      defaultValue: 0
    },
    comptec2: {
      type: DataTypes.STRING(8),
      allowNull: true
    },
    ptva: {
      type: DataTypes.STRING(1),
      allowNull: true,
      defaultValue: "0"
    },
    reference: {
      type: DataTypes.STRING(15),
      allowNull: false,
      defaultValue: ""
    },
    codesel: {
      type: DataTypes.STRING(1),
      allowNull: false,
      defaultValue: "0"
    },
    soldeiniRapp: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0
    },
    totreglerapp: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0
    },
    NPermis: {
      type: DataTypes.STRING(8),
      allowNull: true
    },
    TypePermis: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    DatePermis: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    ParPermis: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    ParCin: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    delregFT: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    delregFC: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    delregBL: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'client',
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
