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
    userId = user.body.id;
  });

  it('Get Users', async () => {
    const users = await getUsers(httpServer);
    console.log(users.body);
  });

  it('Delete user', async () => {
    const isDeleted = await deleteUser(httpServer, userId);
    expect(isDeleted.status).toBe(204);
  });

  it('Delete user', async () => {
    const isDeleted = await deleteUser(httpServer, userId);
    expect(isDeleted.status).toBe(404);
  });
});
