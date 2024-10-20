const Joi = require('joi');

const getClosestStoreSchema = {
  query: Joi.object({
    latitude: Joi.number().required(),
    longitude: Joi.number().required(),
    isOpen: Joi.boolean(),
  }),
};

module.exports = { getClosestStoreSchema };
