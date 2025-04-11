const { DataTypes } = require('sequelize');
module.exports = function(sequelize) {
  return sequelize.define('sousfamille', {
    code: {
      type: DataTypes.STRING(8),
      allowNull: false,
      primaryKey: true
    },
    libelle: {
      type: DataTypes.STRING(40),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'sousfamille',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "code" },
        ]
      },
    ]
  });
};
