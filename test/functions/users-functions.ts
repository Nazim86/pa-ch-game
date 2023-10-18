import * as request from 'supertest';

export const creatingUser = async (httpServer, createUserDto) => {
  return request(httpServer)
    .post('/sa/users')
    .auth('admin', 'admin')
    .send(createUserDto);
};
