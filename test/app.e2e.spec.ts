import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';

describe('Get Endpoints', () => {
    let app: INestApplication;
    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        imports: [AppModule],
      }).compile();
  
      app = module.createNestApplication();
      await app.init();
    });
    test('should be defined', () => { 
      expect(AppModule).toBeDefined();
    });
    test('should get a message demo', async () => {
       const res = await request(app.getHttpServer()).get('/hello')
        expect(res.status).toEqual(200)
        expect(res.text).toEqual('Bienvenido demo!')
      })
    test('should create a new album', async () => {
      const res = await request(app.getHttpServer())
        .post('/createAlbum')
        .send({
          userId: 1,
          title: 'My travels',
        })
      expect(res.statusCode).toEqual(201)
      expect(res.body).toHaveProperty('message')
    })
})
