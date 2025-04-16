var _article = require("./article");
var _client = require("./client");
var _cpostal = require("./cpostal");
var _depot = require("./depot");
var _dfp = require("./dfp");
var _famille = require("./famille");
var _ldfp = require("./ldfp");
var _lignedepot = require("./lignedepot");
var _pointvente = require("./pointvente");
var _region = require("./region");
var _secteur = require("./secteur");
var _sousfamille = require("./sousfamille");

function initModels(sequelize) {
  var article = _article(sequelize);
  var client = _client(sequelize);
  var cpostal = _cpostal(sequelize);
  var depot = _depot(sequelize);
  var dfp = _dfp(sequelize);
  var famille = _famille(sequelize);
  var ldfp = _ldfp(sequelize);
  var lignedepot = _lignedepot(sequelize);
  var pointvente = _pointvente(sequelize);
  var region = _region(sequelize);
  var secteur = _secteur(sequelize);
  var sousfamille = _sousfamille(sequelize);


  return {
    article,
    client,
    cpostal,
    depot,
    dfp,
    famille,
    ldfp,
    lignedepot,
    pointvente,
    region,
    secteur,
    sousfamille,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
