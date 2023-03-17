const Food = (sequelize, DataTypes) =>
  sequelize.define("Food", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cost: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  });

module.exports = Food;
