const express = require('express');
const router = express.Router();
const {
  getGroceries,
  addGrocery,
  resetGroceries,
  deleteGrocery
} = require('../controllers/groceries');
const responseHandler = require('../middleware/responseHandler');

router.get(
  '/',
  getGroceries,
  responseHandler
);

router.post(
  '/',
  addGrocery,
  responseHandler
);

router.delete(
  '/:id',
  deleteGrocery,
  responseHandler
);

router.post(
  '/seed',
  resetGroceries,
  responseHandler
)

module.exports = router;