import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { AccessTokenStrategy } from './strategies/access-token.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { RefreshTokenStrategy } from './strategies/refresh-token.strategy';
import { Module } from '@nestjs/common';
import { BasicStrategy } from './strategies/basic.strategy';

//const useCases = [];
@Module({
  imports: [
    // ThrottlerModule.forRoot({
    //   ttl: 1,
    //   limit: 1000,
    // }),
    PassportModule,
    ConfigModule,
    // CqrsModule,
    ,
  ],
  providers: [
    LocalStrategy,
    AccessTokenStrategy,
    BasicStrategy,
    RefreshTokenStrategy,
  ],

  controllers: [],
  exports: [],
})
export class AuthModule {}
