const { DataTypes } = require('sequelize');

module.exports = function(sequelize) {
  return sequelize.define('region', {
    codergg: {
      type: DataTypes.STRING(3),
      allowNull: true,
      primaryKey: true, // Ajoute ceci si codergg est ta clé primaire
    },
    desirgg: {
      type: DataTypes.STRING(30),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'region',
    timestamps: false,
    id: false // Désactive la création automatique de la colonne `id`
  });
};
