const storesRepository = require('./stores.respository');
const db = require('../models');
const sequelize = require('sequelize');

jest.mock('../models', () => ({
  Store: {
    findAll: jest.fn(),
  },
}));

describe('Store Repository', () => {
  describe('findClosestStore', () => {
    it('should return the closest store with correct distance when stores are found', async () => {
      const mockStore = {
        id: 1,
        name: 'Test Store',
        is_open: true,
        latitude: 40.7128,
        longitude: -74.006,
        distance: 1234.56,
      };

      db.Store.findAll.mockResolvedValue([mockStore]);

      const latitude = 40.7127;
      const longitude = -74.0061;
      const filters = { isOpen: false };

      const result = await storesRepository.findClosestStore(
        latitude,
        longitude,
        filters
      );

      expect(result).toEqual([
        {
          id: mockStore.id,
          name: mockStore.name,
          is_open: mockStore.is_open,
          latitude: mockStore.latitude,
          longitude: mockStore.longitude,
          distance: mockStore.distance,
        },
      ]);
      expect(db.Store.findAll).toHaveBeenCalledWith({
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
        where: { is_open: false },
        order: [[sequelize.literal('distance'), 'ASC']],
        limit: 1,
        raw: true,
      });
    });

    it('should return an empty array when no stores are found', async () => {
      db.Store.findAll.mockResolvedValue([]);

      const latitude = 40.7127;
      const longitude = -74.0061;
      const filters = {};

      const result = await storesRepository.findClosestStore(
        latitude,
        longitude,
        filters
      );

      expect(result).toEqual([]);

      expect(db.Store.findAll).toHaveBeenCalledWith({
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
        where: {},
        order: [[sequelize.literal('distance'), 'ASC']],
        limit: 1,
        raw: true,
      });
    });

    it('should apply filter isOpen when provided', async () => {
      const mockStore = {
        id: 1,
        name: 'Test Store',
        is_open: true,
        latitude: 40.7128,
        longitude: -74.006,
        distance: 1234.56,
      };

      db.Store.findAll.mockResolvedValue([mockStore]);

      const latitude = 40.7127;
      const longitude = -74.0061;
      const filters = { isOpen: false };

      await storesRepository.findClosestStore(latitude, longitude, filters);

      expect(db.Store.findAll).toHaveBeenCalledWith({
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
        where: { is_open: false },
        order: [[sequelize.literal('distance'), 'ASC']],
        limit: 1,
        raw: true,
      });
    });
  });
});
