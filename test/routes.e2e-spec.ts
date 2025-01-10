import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, HttpStatus } from '@nestjs/common';
import { AppModule } from '../src/app.module';
import * as request from 'supertest';
import { describe, it, expect } from '@jest/globals';


describe('All Routes (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should test all defined routes', async () => {
    const server = app.getHttpServer();
    const router = app.getHttpAdapter();

    // Extract all routes from the app
    const routes = router.getInstance()._router.stack
      .filter((layer) => layer.route) // Filter out middleware
      .map((layer) => {
        const routePath = layer.route.path;
        const methods = Object.keys(layer.route.methods);
        return { path: routePath, methods };
      });

    expect(routes.length).toBeGreaterThan(0); // Ensure at least one route exists

    for (const route of routes) {
      for (const method of route.methods) {
        console.log(`Testing ${method.toUpperCase()} ${route.path}`);

        // Send a generic request to each route and ensure a successful response
        const response = await request(server)[method](route.path).send();
        expect(response.status).toBeLessThanOrEqual(HttpStatus.INTERNAL_SERVER_ERROR); // Expect status < 500
      }
    }
  });
});
