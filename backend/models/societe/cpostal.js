const { DataTypes } = require('sequelize');
module.exports = function(sequelize) {
  return sequelize.define('cpostal', {
    CODEp: {
      type: DataTypes.STRING(8),
      allowNull: true
    },
    desicp: {
      type: DataTypes.STRING(30),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'cpostal',
    timestamps: false
  });
};
