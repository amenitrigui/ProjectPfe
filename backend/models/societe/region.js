const {DataTypes} = require('sequelize');
module.exports = function(sequelize) {
  return sequelize.define('region', {
    codergg: {
      type: DataTypes.STRING(3),
      allowNull: true
    },
    desirgg: {
      type: DataTypes.STRING(30),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'region',
    timestamps: false
  });
};
