import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, Logger } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { apiReference } from '@scalar/nestjs-api-reference';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT ?? 3000;
  try {
    const config = new DocumentBuilder()
      .setTitle('API')
      .setDescription('API documentation')
      .setVersion('1.0')
      .build();

    const document = SwaggerModule.createDocument(app, config);

    app.use(
      '/reference',
      apiReference({
        content: document,
      }),
    );
    Logger.debug(
      `Scalar is available at http://localhost:${port}/reference`,
      'Scalar',
    );
  } catch (error) {
    Logger.error('Failed to set up Scalar documentation:', error);
  }
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  await app.listen(port);
}

void bootstrap();
