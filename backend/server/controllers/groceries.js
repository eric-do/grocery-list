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

const deleteGrocery = async (req, res, next) => {
  const { id } = req.params;
  console.log(id)

  try {
    res.locals.data = await GroceryModel.deleteGrocery(id)
    res.status(200);
    next();
  } catch (err) {
    next(new BadRequestError(err));
  }
}

const resetGroceries = async (req, res, next) => {
  try {
    await GroceryModel.resetGroceries();
    res.status(200);
    next()
  } catch(err) {
    next(new InternalServerError(err));
  }
}

module.exports = {
  getGroceries,
  addGrocery,
  deleteGrocery,
  resetGroceries
}