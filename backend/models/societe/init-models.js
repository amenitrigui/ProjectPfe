var DataTypes = require("sequelize").DataTypes;
var _article = require("./article");
var _client = require("./client");
var _cpostal = require("./cpostal");
var _depot = require("./depot");
var _dfp = require("./dfp");
var _famille = require("./famille");
var _ldfp = require("./ldfp");
var _pointvente = require("./pointvente");
var _region = require("./region");
var _secteur = require("./secteur");
var _sousfamille = require("./sousfamille");

function initModels(sequelize) {
  var article = _article(sequelize, DataTypes);
  var client = _client(sequelize, DataTypes);
  var cpostal = _cpostal(sequelize, DataTypes);
  var depot = _depot(sequelize, DataTypes);
  var dfp = _dfp(sequelize, DataTypes);
  var famille = _famille(sequelize, DataTypes);
  var ldfp = _ldfp(sequelize, DataTypes);
  var pointvente = _pointvente(sequelize, DataTypes);
  var region = _region(sequelize, DataTypes);
  var secteur = _secteur(sequelize, DataTypes);
  var sousfamille = _sousfamille(sequelize, DataTypes);


  return {
    article,
    client,
    cpostal,
    depot,
    dfp,
    famille,
    ldfp,
    pointvente,
    region,
    secteur,
    sousfamille,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
