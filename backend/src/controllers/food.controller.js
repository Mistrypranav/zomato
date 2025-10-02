const foodModel = require('../models/food.model');
const storageService = require('../service/storage.service');
const{ v4: uuid } = require('uuid');


async function createFood(req, res, next) {
  try {
    console.log("req.file:", req.file);
    console.log("req.body:", req.body);

    if (!req.file) {
      return res.status(400).json({ message: "File is missing!" });
    }

    const fileUploadResult = await storageService.uploadFile(req.file.buffer, uuid());

    const foodItem = await foodModel.create({
      name: req.body.name,
      description: req.body.description,
      video: fileUploadResult.url,
      foodPartner: req.foodPartner._id
    });

    res.status(201).json({
      message: "food created successfully",
      food: foodItem
    });
  } catch (err) {
    console.error("Error while creating food:", err);
    // next(err); // send to error handler
  }
}

async function getFoodItems(req, res, next) {

    const foodItems = await foodModel.find({})

    res.status(200).json({
        message: "food items fetched successfully",
        foodItems
    })
}

module.exports = {
    createFood,
    getFoodItems
 
}