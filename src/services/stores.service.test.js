const { storesService } = require('../services');
const { storesRepository } = require('../repositories');
const NotFoundError = require('../utils/errors/NotFoundError');

jest.mock('../repositories', () => ({
  storesRepository: {
    findClosestStore: jest.fn(),
  },
}));

describe('Stores Service', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findClosestStore', () => {
    it('should return store details when closest store is found', async () => {
      const mockStore = {
        id: 1,
        name: 'Test Store',
        is_open: true,
        latitude: 40.7128,
        longitude: -74.006,
      };

      storesRepository.findClosestStore.mockResolvedValue([mockStore]);

      const latitude = 40.7127;
      const longitude = -74.0061;
      const filters = {};

      const result = await storesService.findClosestStore(
        latitude,
        longitude,
        filters
      );

      expect(result).toEqual({
        storeId: mockStore.id,
        storeName: mockStore.name,
        isOpen: mockStore.is_open,
        coordinates: {
          latitude: mockStore.latitude,
          longitude: mockStore.longitude,
        },
      });
    });

    it('should throw NotFoundError when no store is found', async () => {
      storesRepository.findClosestStore.mockResolvedValue([]);

      const latitude = 40.7127;
      const longitude = -74.0061;
      const filters = {};

      await expect(
        storesService.findClosestStore(latitude, longitude, filters)
      ).rejects.toThrow(NotFoundError);
    });
  });
});
