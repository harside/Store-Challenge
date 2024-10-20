const sequelize = require('sequelize');
const db = require('../models');

const findClosestStore = (latitude, longitude, filters = {}) => {
  const conditionals = {
    ...(filters?.isOpen !== undefined && { is_open: filters.isOpen }),
  };

  return db.Store.findAll({
    attributes: [
      'id',
      'name',
      'is_open',
      [
        sequelize.literal(`ST_Distance(
            ST_MakePoint(longitude, latitude)::geography,
            ST_MakePoint(${longitude}, ${latitude})::geography
          )`),
        'distance',
      ],
      'latitude',
      'longitude',
    ],
    where: conditionals,
    order: [[sequelize.literal('distance'), 'ASC']],
    limit: 1,
    raw: true,
  });
};

module.exports = {
  findClosestStore,
};
