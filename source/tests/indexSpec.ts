import supertest from "supertest";
import app from "../index";
import { promises as fs } from "fs";
import path from "path";
import File from "../utilities/fileSystem";

const request: supertest.SuperTest<supertest.Test> = supertest(app);

describe('endpoiints', (): void => {
  describe('endpoint: /', (): void => {
    it('gets /', async (): Promise<void> => {
      const response: supertest.Response = await request.get('/');

      expect(response.status).toBe(200);
    });
    });

    describe('endpoint: /api/photos', (): void => {
      it('gets /api/photos?filename=yasmine (valid args)', async (): Promise<void> => {
        const response: supertest.Response = await request.get('/api/photos?filename=yasmine');
        expect(response.status).toBe(200);
      });

      it('gets /api/photos?filename=yasmine&width=288&height=288 (valid args)', async (): Promise<void> => {
        const response: supertest.Response = await request.get(
          '/api/photos?filename=yasmine&width=288&height=288'
        );
        expect(response.status).toBe(200);
      });

      it('gets /api/photos?filename=yasmine&width=300&height=300 (invalid args)', async (): Promise<void> => {
        const response: supertest.Response = await request.get(
          '/api/photos?filename=yasmine&width=300&height=300'
        );
        expect(response.status).toBe(200);
      });

      it('gets /api/photos (no arguments)', async (): Promise<void> => {
        const response: supertest.Response = await request.get(
          '/api/photos'
        );
        expect(response.status).toBe(200);
      });
    });

    describe('endpiont: /blabla', (): void => {
      it('404', async (): Promise<void> => {
        const response: supertest.Response = await request.get('/blabla');

        expect(response.status).toBe(404);
      });
    });
  });
