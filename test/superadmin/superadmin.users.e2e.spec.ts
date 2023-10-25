import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../../src/app.module';
import {
  creatingUser,
  deleteUser,
  getUsers,
} from '../functions/users-functions';
import { createUserDto } from '../data/user-data';
import { appSettings } from '../../src/app.settings';
import * as request from 'supertest';

describe('SuperAdmin User (e2e)', () => {
  let app: INestApplication;
  let httpServer;
  let userId;

  jest.setTimeout(60 * 1000);
  beforeAll(async () => {
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

    console.log(result.body);

    expect(result.status).toBe(200);
  });

  it('Create User', async () => {
    const user = await creatingUser(httpServer, createUserDto);
    userId = user.body.id;
  });

  it('Get Users', async () => {
    const users = await getUsers(httpServer);
    console.log(users.body);
  });

  it('Delete user and status 204', async () => {
    const isDeleted = await deleteUser(httpServer, userId);
    expect(isDeleted.status).toBe(204);
  });

  it('Delete user of non existing user,status 404', async () => {
    const isDeleted = await deleteUser(httpServer, userId);
    expect(isDeleted.status).toBe(404);
  });
});
