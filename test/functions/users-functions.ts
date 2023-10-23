import * as request from 'supertest';
import { CreateUserDto } from '../../src/api/superadmin/dto/createUser.Dto';

export const getUsers = async (httpServer) => {
  return request(httpServer).get('/sa/users').auth('admin', 'admin').send();
};

export const deleteUser = async (httpServer, userId: string) => {
  return request(httpServer)
    .delete(`/sa/users/${userId}`)
    .auth('admin', 'admin')
    .send();
};

export const creatingUser = async (
  httpServer,
  createUserDto: CreateUserDto,
) => {
  return request(httpServer)
    .post('/sa/users')
    .auth('admin', 'admin')
    .send(createUserDto);
};
