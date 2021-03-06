/* jslint node: true */
'use strict'

module.exports = function (sequelize, DataTypes) {
  var Recycle = sequelize.define('Recycle', {
    quantity: DataTypes.INTEGER,
    address: DataTypes.STRING,
    isPickup: { type: DataTypes.BOOLEAN, defaultValue: false },
    date: DataTypes.DATE
  },
    {
      classMethods: {
        associate: function (models) {
          Recycle.belongsTo(models.User, { constraints: true, foreignKeyConstraint: true })
        }
      }
    })
  return Recycle
}
