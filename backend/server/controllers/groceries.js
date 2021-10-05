const GroceryModel = require('../models/groceries');
const { InternalServerError, BadRequestError } = require('../utils/errors');

const getGroceries = async (req, res, next) => {
  try {
    res.locals.data = await GroceryModel.getGroceries()
    res.status(200);
    next();
  } catch (err) {
    next(new InternalServerError(err));
  }
}

const addGrocery = async (req, res, next) => {
  const grocery = req.body;
  try {
    res.locals.data = await GroceryModel.addGrocery(grocery)
    res.status(201);
    next();
  } catch (err) {
    next(new BadRequestError(err));
  }
}

module.exports = {
  getGroceries,
  addGrocery
}