import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

describe('User and Auth tests (e2e)', () => {

  let token: any;
  let userId: any;
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot(),
        TypeOrmModule.forRoot({
          type: process.env.TYPEORM_CONNECTION,
          host: process.env.TYPEORM_HOST,
          port: process.env.TYPEORM_PORT,
          username: process.env.TYPEORM_USERNAME,
          password: process.env.TYPEORM_PASSWORD,
          database: 'db_gamestore_test',
          autoLoadEntities: true,
          synchronize: true,
          logging: false,
          dropSchema: true
        } as TypeOrmModuleOptions)
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('01 - Registers user', async () => {
    const response = await request(app.getHttpServer())
      .post('/users/register')
      .send({
        firstName: 'Root',
        lastName: 'Root',
        email: 'root@root.com',
        password: 'Root@1234'
      });
      expect(201);

    userId = response.body.id;
  });

  it('02 - Authenticates user (login)', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        user: 'root@root.com',
        password: 'Root@1234'
      })
      expect(200)

      token = response.body.token;
  });

  it(`03 - Doesn't duplicate user`, async () => {
    return request(app.getHttpServer())
      .post('/users/register')
      .send({
        firstName: 'Root',
        lastName: 'Root',
        email: 'root@root.com',
        password: 'Root@1234'
      })
      expect(400)
  });

  it('04 - Lists all users', async () => {
    request(app.getHttpServer())
      .get('users/all')
      .set('Authorization', `${token}`)
      .send({})
      expect(200)
  });

  it('05 - Updates user', async () => {
    request(app.getHttpServer())
      .put('users/update')
      .set('Authorization', `${token}`)
      .send({
        id: userId,
        firstName: 'Updated root',
        lastName: 'Root',
        email: 'root@root.com',
        password: 'Root@1234',
        photo: 'https://i.imgur.com/MxHmulq.jpeg'
      })
      .then(response => {
        expect('Updated root').toEqual(response.body.firsName);
      })
      expect(200)
  });

});
