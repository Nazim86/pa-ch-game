import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from "@nestjs/common";
import { appSettings } from "./app.settings";

async function bootstrap() {


  const rawApp: INestApplication = await NestFactory.create(AppModule);

  const app = appSettings(rawApp);

 // app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('PaCh game example')
    .setDescription('The PaCh game API description')
    .setVersion('1.0')
    .addTag('PaCh game')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  await app.listen(5000);
}

bootstrap();
