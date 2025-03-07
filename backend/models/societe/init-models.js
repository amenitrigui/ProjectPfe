var DataTypes = require("sequelize").DataTypes;
var _article = require("./article");
var _client = require("./client");
var _dfp = require("./dfp");
var _ldfp = require("./ldfp");

function initModels(sequelize) {
  var article = _article(sequelize, DataTypes);
  var client = _client(sequelize, DataTypes);
  var dfp = _dfp(sequelize, DataTypes);
  var ldfp = _ldfp(sequelize, DataTypes);


  return {
    article,
    client,
    dfp,
    ldfp,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
