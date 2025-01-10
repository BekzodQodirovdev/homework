import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as basicAuth from 'express-basic-auth';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(
    ['/api/docs'],
    basicAuth({ users: { admin: 'admin123' }, challenge: true }),
  );
  const config = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The test API description')
    .setVersion('1.0')
    .addTag('test')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  const port = process.env.PORT ?? 3000
  await app.listen(port, () => {
    console.log(`running on port ${port}`)
  });
}
bootstrap();
