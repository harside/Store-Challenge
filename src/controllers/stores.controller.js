const { storesService } = require('../services');

const getClosestStore = async (req, res, next) => {
  try {
    const { latitude, longitude, isOpen } = req.query;

    const closestStore = await storesService.findClosestStore(
      latitude,
      longitude,
      {
        isOpen,
      }
    );
    return res.json(closestStore);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getClosestStore,
};
