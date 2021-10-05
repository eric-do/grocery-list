const express = require('express');
const router = express.Router();
const {
  getGroceries,
  addGrocery
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

module.exports = router;