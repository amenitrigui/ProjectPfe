const SequelizeAuto = require('sequelize-auto');

const autoChampsSociete = new SequelizeAuto('SOLEVO', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  directory: './models/societe', // where to write files
  port: '3306',
  caseModel: 'c', // convert snake_case column names to camelCase field names: user_id -> userId
  caseFile: 'c', // file names created for each model use camelCase.js not snake_case.js
  singularize: true, // convert plural table names to singular model names
  additional: {
      timestamps: false
  },
  tables: ['dfp', 'client', 'ldfp', 'article', 'famille', 'sousfamille', 'cpostal', 'region', 'secteur','pointvente','depot'] // use all tables, if omitted
})

const autoChampsUtilisateur = new SequelizeAuto('usererpsole', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  directory: './models/utilisateur', // where to write files
  port: '3306',
  caseModel: 'c', // convert snake_case column names to camelCase field names: user_id -> userId
  caseFile: 'c', // file names created for each model use camelCase.js not snake_case.js
  singularize: true, // convert plural table names to singular model names
  additional: {
      timestamps: false
  },
  tables: ['utilisateur', 'usersoc'] // use all tables, if omitted
})

autoChampsUtilisateur.run();
autoChampsSociete.run();