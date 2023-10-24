import * as process from 'process';
import * as dotenv from 'dotenv';

// Load environment variables from .env
dotenv.config();

export const accessTokenSecret = {
  secret: process.env.ACCESS_TOKEN_SECRET,
};

export const refreshTokenSecret = {
  secret: process.env.REFRESH_TOKEN_SECRET,
};

export const basicConstants = {
  username: process.env.SA_LOGIN,
  password: process.env.SA_PASSWORD,
};
