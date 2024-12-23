import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  it('/budget (GET)', () => {
    return request(app.getHttpServer()).get('/budget').expect(200).expect([]);
  });

  it('/budget (POST)', () => {
    const payload = {
      name: 'Non',
      price: 20000,
      description: 'Yeyish uchun',
      date: new Date(),
      status: true,
    };
    return request(app.getHttpServer())
      .post('/budget')
      .send(payload)
      .set('Content-Type', 'application/json')
      .expect(201)
      .expect({ ...payload, id: 1 });
  });
});
