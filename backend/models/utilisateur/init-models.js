var DataTypes = require("sequelize").DataTypes;
var _usersoc = require("./usersoc");
var _utilisateur = require("./utilisateur");

function initModels(sequelize) {
  var usersoc = _usersoc(sequelize, DataTypes);
  var utilisateur = _utilisateur(sequelize, DataTypes);


  return {
    usersoc,
    utilisateur,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
