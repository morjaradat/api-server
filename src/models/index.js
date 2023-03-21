require("dotenv").config();

const POSTGRES_URI =
  process.env.NODE_ENV === "test" ? "sqlite:memory:" : process.env.DATABASE_URL;

const { Sequelize, DataTypes } = require("sequelize");

// this is option for heroku or railway for ssl just in production (is for security)
let sequelizeOptions =
  process.env.NODE_ENV === "production"
    ? {
        dialectOptions: {
          ssl: {
            require: true,
            rejectUnauthorized: false,
          },
        },
      }
    : {};

let sequelize = new Sequelize(POSTGRES_URI, sequelizeOptions);

const Food = require("./food.model");
const Clothes = require("./clothes.model");
const Collection = require("./lib/collection");

//! this is wrong (not working )
// const foodCollection = new Collection(Food);
// const clothesCollection = new Collection(Clothes);

const foodCollection = new Collection(Food(sequelize, DataTypes));
const clothesCollection = new Collection(Clothes(sequelize, DataTypes));

// example usage:
// foodCollection.create({ name: "Pizza", cost: 10 });
// foodCollection.create({ name: "banana", cost: 3 });
// foodCollection.create({ name: "mansaf", cost: 49.99 });

// clothesCollection.create({ type: "T-Shirt", color: "blue", cost: 12 });
// clothesCollection.create({ type: "T-Shirt", color: "red", cost: 10 });
// clothesCollection.create({ type: "T-Shirt", color: "black", cost: 13.5 });

// clothesCollection.getById(1);
// clothesCollection.update(2, { name: "T-Shirt", cost: 9.99 });
// foodCollection.delete(3);

async function ConnectionTest() {
  try {
    await sequelize.authenticate();
    console.log("------Connection has been established successfully.---------");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

module.exports = {
  db: sequelize,
  ConnectionTest: ConnectionTest,
  Food: Food(sequelize, DataTypes),
  Clothes: Clothes(sequelize, DataTypes),
  foodCollection: foodCollection,
  clothesCollection: clothesCollection,
};
