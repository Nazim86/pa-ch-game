import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../../src/app.module';
import { creatingUser } from '../functions/users-functions';
import { createUserDto } from '../data/user-data';
import { appSettings } from '../../src/app.settings';
import * as request from 'supertest';

describe('SuperAdmin User (e2e)', () => {
  let app: INestApplication;
  let httpServer;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app = appSettings(app);
    await app.init();

    httpServer = app.getHttpServer();
  });

  it('Delete all data', async () => {
    const result = await request(httpServer)
      .delete('/delete/all-data')
      .auth('admin', 'admin')
      .send();

    expect(result.status).toBe(200);
  });

  it('Create User', async () => {
    const user = await creatingUser(httpServer, createUserDto);
    console.log(user.body);
  });
});
