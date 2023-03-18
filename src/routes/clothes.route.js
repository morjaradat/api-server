const express = require("express");

//in this line we are taking the routing functionality from express

const { clothesCollection } = require("../models/index.js");

const clothesRouter = express.Router();
//add routes
clothesRouter.get("/clothes", getClothes);
clothesRouter.get("/clothes/:id", getOneClothes);
clothesRouter.post("/clothes", createClothes);
clothesRouter.put("/clothes/:id", updateClothes);
clothesRouter.delete("/clothes/:id", deleteClothes);

async function getClothes(req, res) {
  const allClothes = await clothesCollection.getAll();
  res.status(200).json(allClothes);
}
async function getOneClothes(req, res) {
  const clothesId = parseInt(req.params.id);
  let clothes = await clothesCollection.getById(clothesId);
  res.status(200).json(clothes);
}

async function createClothes(req, res) {
  let newClothes = req.body;
  let clothes = await clothesCollection.create(newClothes);
  res.status(201).json(clothes);
}

async function updateClothes(req, res) {
  let clothesId = parseInt(req.params.id);
  let updateClothes = req.body; //the one that the form will send to us from the frontend
  //to update the clothes i need to find it first then update it
  let foundClothes = await clothesCollection.update(clothesId, updateClothes);
  res.status(201).json(foundClothes);
}
async function deleteClothes(req, res) {
  //just make sure to parse it into int because it will be a number but in string format
  let clothesId = parseInt(req.params.id);
  let deleteClothes = clothesCollection.delete(clothesId);

  //if we have the name id instead of clothesId we can use a short cut
  //   let deleteClothes = await clothes.destroy({ where: { id } });

  res.status(204).json(deleteClothes); //it will return the id of the deleted person
}

module.exports = clothesRouter;
