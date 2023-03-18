const express = require("express");

//in this line we are taking the routing functionality from express

const { foodCollection } = require("../models/index.js");

const foodRouter = express.Router();
//add routes
foodRouter.get("/food", getFood);
foodRouter.get("/food/:id", getOneFood);
foodRouter.post("/food", createFood);
foodRouter.put("/food/:id", updateFood);
foodRouter.delete("/food/:id", deleteFood);

async function getFood(req, res) {
  const allFood = await foodCollection.getAll();
  res.status(200).json(allFood);
}
async function getOneFood(req, res) {
  const foodId = parseInt(req.params.id);
  let food = await foodCollection.getById(foodId);
  res.status(200).json(food);
}

async function createFood(req, res) {
  let newFood = req.body;
  let food = await foodCollection.create(newFood);
  res.status(201).json(food);
}

async function updateFood(req, res) {
  let foodId = parseInt(req.params.id);
  let updateFood = req.body; //the one that the form will send to us from the frontend
  //to update the food i need to find it first then update it
  try {
    let foundFood = await foodCollection.update(foodId, updateFood);
    res.status(201).json(foundFood);
  } catch (error) {
    res.status(500);
  }
}
async function deleteFood(req, res) {
  //just make sure to parse it into int because it will be a number but in string format
  let foodId = parseInt(req.params.id);
  try {
    let deleteFood = await foodCollection.delete(foodId);
    //if we have the name id instead of foodId we can use a short cut
    //   let deleteFood = await food.destroy({ where: { id } });
    res.status(204).json(deleteFood); //it will return the id of the deleted person
  } catch (error) {
    res.status(500);
  }
}

module.exports = foodRouter;
