import { useContainer } from 'class-validator';
import { INestApplication } from '@nestjs/common';
import { AppModule } from './app.module';

export const appSettings = (app: INestApplication) => {
  //app.use(cookieParser());
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  // app.useGlobalPipes(
  //   new ValidationPipe({
  //     transform: true,
  //     stopAtFirstError: true,
  //     //whitelist: true,
  //     //forbidNonWhitelisted: true,
  //     exceptionFactory: (errors) => {
  //       const errorsForResponse = [];
  //
  //       errors.forEach((e) => {
  //         const constraintKeys = Object.keys(e.constraints);
  //         constraintKeys.forEach((ckey) => {
  //           errorsForResponse.push({
  //             message: e.constraints[ckey],
  //             field: e.property,
  //           });
  //         });
  //       });
  //       throw new BadRequestException(errorsForResponse);
  //     },
  //   }),
  // );
  app.enableCors();
  //app.useGlobalFilters(new HttpExceptionFilter()); //new ErrorExceptionFilter()
  return app;
};
