const {DataTypes} = require('sequelize');
module.exports = function(sequelize) {
  return sequelize.define('secteur', {
    codesec: {
      type: DataTypes.STRING(3),
      allowNull: false,
      primaryKey: true
    },
    desisec: {
      type: DataTypes.STRING(30),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'secteur',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "codesec" },
        ]
      },
    ]
  });
};
