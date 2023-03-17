const Clothes = (sequelize, DataTypes) =>
  sequelize.define("Clothes", {
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    color: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cost: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  });

module.exports = Clothes;
