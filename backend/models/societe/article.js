const { DataTypes } = require('sequelize');
module.exports = function(sequelize) {
  return sequelize.define('article', {
    code: {
      type: DataTypes.STRING(20),
      allowNull: false,
      primaryKey: true
    },
    libelle: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    unite: {
      type: DataTypes.STRING(5),
      allowNull: true
    },
    nbrunite: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      defaultValue: 1
    },
    type: {
      type: DataTypes.STRING(12),
      allowNull: true
    },
    famille: {
      type: DataTypes.STRING(8),
      allowNull: false,
      defaultValue: "",
      primaryKey: true
    },
    fourn: {
      type: DataTypes.STRING(8),
      allowNull: true
    },
    image: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    chemin: {
      type: DataTypes.STRING(250),
      allowNull: true
    },
    tauxtva: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      defaultValue: 0
    },
    fodec: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      defaultValue: 0
    },
    tauxmajo: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    remmax: {
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: 0
    },
    qtes: {
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
      type: DataTypes.FLOAT(12,3),
      allowNull: true,
      defaultValue: 0.000
    },
    stockmax: {
      type: DataTypes.FLOAT(12,3),
      allowNull: true,
      defaultValue: 0.000
    },
    dateachat: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      defaultValue: "2000-01-01"
    },
    DREMISE: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      defaultValue: 0
    },
    prixbrut: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      defaultValue: 0
    },
    prixnet: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      defaultValue: 0
    },
    marge: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      defaultValue: 0
    },
    margepv2: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      defaultValue: 0
    },
    margepv3: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      defaultValue: 0
    },
    datevente: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      defaultValue: "2000-01-01"
    },
    prix1: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      defaultValue: 0
    },
    prix2: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      defaultValue: 0
    },
    prix3: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      defaultValue: 0
    },
    prix4: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      defaultValue: 0
    },
    CONFIG: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    lieustock: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    gestionstock: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    libellef: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    libellefourn: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    avecconfig: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    observation: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    budget: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    prixachini: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      defaultValue: 0
    },
    libelleAr: {
      type: DataTypes.STRING(40),
      allowNull: true
    },
    prixdevice: {
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: 0
    },
    nomenclature: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    PrixPub: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      defaultValue: 0
    },
    longeur: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      defaultValue: 0
    },
    largeur: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      defaultValue: 0
    },
    epaisseur: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      defaultValue: 0
    },
    Bois: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    serie: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    TYCODBAR: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    codebarre: {
      type: DataTypes.STRING(14),
      allowNull: true
    },
    gtaillecoul: {
      type: DataTypes.STRING(1),
      allowNull: true,
      defaultValue: "0"
    },
    hauteur: {
      type: DataTypes.FLOAT(12,3),
      allowNull: true,
      defaultValue: 0.000
    },
    stkinitexer: {
      type: DataTypes.FLOAT(12,3),
      allowNull: true,
      defaultValue: 0.000
    },
    nbreptfid: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      defaultValue: 0
    },
    affectptfid: {
      type: DataTypes.STRING(1),
      allowNull: true,
      defaultValue: "N"
    },
    datprom1: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      defaultValue: "2000-01-01"
    },
    datprom2: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      defaultValue: "2000-01-01"
    },
    remfidel: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      defaultValue: 0
    },
    NGP: {
      type: DataTypes.STRING(13),
      allowNull: true
    },
    cours: {
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: 0
    },
    tariffrs: {
      type: DataTypes.DOUBLE(12,3),
      allowNull: true,
      defaultValue: 0.000
    },
    datetarif: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      defaultValue: "2000-01-01"
    },
    devise: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    pxcomp: {
      type: DataTypes.DOUBLE(12,3),
      allowNull: true
    },
    cvlong: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    cvlarg: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    codefini: {
      type: DataTypes.STRING(8),
      allowNull: true
    },
    libfini: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    typeart: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    reforigine: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    puht: {
      type: DataTypes.DOUBLE(12,3),
      allowNull: true,
      defaultValue: 0.000
    },
    avance: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    datecreate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      defaultValue: "2000-01-01"
    },
    abrev: {
      type: DataTypes.STRING(35),
      allowNull: true
    },
    abrevpart1: {
      type: DataTypes.STRING(13),
      allowNull: true
    },
    abrevpart2: {
      type: DataTypes.STRING(13),
      allowNull: true
    },
    dispo: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0
    },
    position: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    import: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    typeartg: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    kmmax: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      defaultValue: 0
    },
    kmeff: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      defaultValue: 0
    },
    duregarant: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      defaultValue: 0
    },
    codefrs: {
      type: DataTypes.STRING(8),
      allowNull: true
    },
    rsfrs: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    dernmajprix1: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      defaultValue: "2000-01-01"
    },
    dernmajprix2: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      defaultValue: "2000-01-01"
    },
    dernmajprix3: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      defaultValue: "2000-01-01"
    },
    dernmajprix4: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      defaultValue: "2000-01-01"
    },
    lib1: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    lib2: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    lib3: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    lib4: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    nbcart: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      defaultValue: 0
    },
    numlot: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    qtecart: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    qtesac: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    unitegarantie: {
      type: DataTypes.STRING(15),
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
    datemaj: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      defaultValue: "2000-01-01"
    },
    dureealerte: {
      type: DataTypes.STRING(2),
      allowNull: true,
      defaultValue: "0"
    },
    gestionlot: {
      type: DataTypes.STRING(1),
      allowNull: true,
      defaultValue: "N"
    },
    artmouv: {
      type: DataTypes.STRING(1),
      allowNull: true,
      defaultValue: "1"
    },
    pmp: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      defaultValue: 0
    },
    ventevrac: {
      type: DataTypes.STRING(1),
      allowNull: true,
      defaultValue: "0"
    },
    prix1TTC: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      defaultValue: 0
    },
    prix2TTC: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      defaultValue: 0
    },
    prix3TTC: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      defaultValue: 0
    },
    prix4TTC: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      defaultValue: 0
    },
    genGPAO: {
      type: DataTypes.STRING(1),
      allowNull: true,
      defaultValue: "0"
    },
    sav: {
      type: DataTypes.STRING(1),
      allowNull: true,
      defaultValue: "N"
    },
    ftmodif: {
      type: DataTypes.STRING(1),
      allowNull: true,
      defaultValue: "0"
    },
    prixsolde: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      defaultValue: 0
    },
    remisesolde: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      defaultValue: 0
    },
    cgrilletaille: {
      type: DataTypes.STRING(2),
      allowNull: true
    },
    lgrilletaille: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    ctaille: {
      type: DataTypes.STRING(3),
      allowNull: true
    },
    taille: {
      type: DataTypes.STRING(6),
      allowNull: true
    },
    libsousfam: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: " "
    },
    ccoul: {
      type: DataTypes.STRING(3),
      allowNull: true
    },
    couleur: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    ccol: {
      type: DataTypes.STRING(3),
      allowNull: true
    },
    libcol: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    sousfamille: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    cons: {
      type: DataTypes.STRING(1),
      allowNull: true,
      defaultValue: "0"
    },
    Famille_code: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    tcomm: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      defaultValue: 0
    },
    Dtcons: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      defaultValue: 0
    },
    codesousfam: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: " "
    },
    PUHTA: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0
    },
    PUHTV: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      defaultValue: 0
    },
    codepv: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: " "
    },
    libpv: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: " "
    },
    PrixMoyAchat: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    PrixMoyVente: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    mtcomm: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0
    },
    Poid: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      defaultValue: 0
    },
    PoidNet: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      defaultValue: 0
    },
    colisage: {
      type: DataTypes.STRING(1),
      allowNull: true,
      defaultValue: "0"
    },
    imagesize: {
      type: DataTypes.MEDIUMINT,
      allowNull: true,
      defaultValue: 0
    },
    imagepath: {
      type: DataTypes.STRING(80),
      allowNull: true,
      defaultValue: "0"
    },
    imagedata: {
      type: DataTypes.BLOB,
      allowNull: true
    },
    AveConsigne: {
      type: DataTypes.STRING(6),
      allowNull: true
    },
    comptec: {
      type: DataTypes.STRING(8),
      allowNull: true
    },
    sel: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    UnitProd: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    QtePrev: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    PrixMod: {
      type: DataTypes.STRING(1),
      allowNull: true,
      defaultValue: "0"
    },
    taxe_rca: {
      type: DataTypes.STRING(1),
      allowNull: false,
      defaultValue: "0"
    }
  }, {
    sequelize,
    tableName: 'article',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "code" },
          { name: "famille" },
        ]
      },
      {
        name: "Famille_code",
        using: "BTREE",
        fields: [
          { name: "Famille_code" },
        ]
      },
    ]
  });
};
