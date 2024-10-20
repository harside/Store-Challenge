const request = require('supertest');
const storesController = require('./stores.controller');
const { storesService } = require('../services');
const app = require('../app');
const NotFoundError = require('../utils/errors/NotFoundError');

jest.mock('../services', () => ({
  storesService: {
    findClosestStore: jest.fn(),
  },
}));

describe('Stores Controller', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /api/stores/closest', () => {
    it('should return closest store details', async () => {
      const mockStore = {
        storeId: 1,
        storeName: 'Test Store',
        isOpen: true,
        coordinates: {
          latitude: 40.7128,
          longitude: -74.006,
        },
      };

      storesService.findClosestStore.mockResolvedValue(mockStore);

      const response = await request(app)
        .get('/api/stores/closest')
        .query({ latitude: 40.7127, longitude: -74.0061, isOpen: true });

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockStore);
      expect(storesService.findClosestStore).toHaveBeenCalled();
    });

    it('should throws an error due missing attribute', async () => {
      const response = await request(app)
        .get('/api/stores/closest')
        .query({ latitude: 40.7127, isOpen: true });

      expect(response.status).toBe(400);
      expect(response.body).toEqual({
        message: 'Some attributes are required',
        errors: ['"longitude" is required'],
      });
      expect(storesService.findClosestStore).not.toHaveBeenCalled();
    });

    it('should throws an error 404 due not found closest store', async () => {
      storesService.findClosestStore.mockRejectedValue(
        new NotFoundError('Closest store not found')
      );

      const response = await request(app)
        .get('/api/stores/closest')
        .query({ latitude: 40.7127, longitude: -74.0061 });

      expect(response.status).toBe(404);
      expect(response.body).toEqual({
        message: 'Closest store not found',
      });
      expect(storesService.findClosestStore).toHaveBeenCalled();
    });

    it('should throws an error 500 due a general error', async () => {
      storesService.findClosestStore.mockRejectedValue(
        new Error('Some error occurred')
      );

      const response = await request(app)
        .get('/api/stores/closest')
        .query({ latitude: 40.7127, longitude: -74.0061 });

      expect(response.status).toBe(500);
      expect(response.body.message).toEqual('Some error occurred');
      expect(storesService.findClosestStore).toHaveBeenCalled();
    });
  });
});
