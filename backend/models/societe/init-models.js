var DataTypes = require("sequelize").DataTypes;
var _article = require("./article");
var _client = require("./client");
var _cpostal = require("./cpostal");
var _dfp = require("./dfp");
var _famille = require("./famille");
var _ldfp = require("./ldfp");
var _region = require("./region");
var _secteur = require("./secteur");
var _sousfamille = require("./sousfamille");

function initModels(sequelize) {
  var article = _article(sequelize, DataTypes);
  var client = _client(sequelize, DataTypes);
  var cpostal = _cpostal(sequelize, DataTypes);
  var dfp = _dfp(sequelize, DataTypes);
  var famille = _famille(sequelize, DataTypes);
  var ldfp = _ldfp(sequelize, DataTypes);
  var region = _region(sequelize, DataTypes);
  var secteur = _secteur(sequelize, DataTypes);
  var sousfamille = _sousfamille(sequelize, DataTypes);


  return {
    article,
    client,
    cpostal,
    dfp,
    famille,
    ldfp,
    region,
    secteur,
    sousfamille,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
