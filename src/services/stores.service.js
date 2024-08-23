const { storesRepository } = require('../repositories');
const NotFoundError = require('../utils/errors/NotFoundError');

const findClosestStore = async (latitude, longitude, filters) => {
  const [closestStore] = await storesRepository.findClosestStore(
    latitude,
    longitude,
    filters
  );

  if (!closestStore) {
    throw new NotFoundError('Closest store not found');
  }

  return {
    storeId: closestStore.id,
    storeName: closestStore.name,
    isOpen: closestStore.is_open,
    coordinates: {
      latitude: closestStore.latitude,
      longitude: closestStore.longitude,
    },
  };
};

module.exports = {
  findClosestStore,
};
