const express = require('express');
const { storesController } = require('../controllers');
const {
  getClosestStoreSchema,
} = require('../middlewares/validators/stores.validator');
const validateRequest = require('../middlewares/validator');

const StoresRouter = express.Router();

StoresRouter.get(
  '/closest',
  validateRequest(getClosestStoreSchema),
  storesController.getClosestStore
);

module.exports = StoresRouter;
