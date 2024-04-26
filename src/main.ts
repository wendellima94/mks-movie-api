import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { config } from 'dotenv';
import serverless from 'serverless-http';

config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const globalPrefix = '.netlify/functions/main';
  app.setGlobalPrefix(globalPrefix);

  const config = new DocumentBuilder()
    .setTitle('Movie Catalog API')
    .setDescription('API para gerenciar um catálogo de filmes')
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('Movies', 'Endpoints relacionados a filmes')
    .addTag('Authentication', 'Endpoints de autenticação de usuário')
    .addTag('Users', 'Endpoints relacionados a usuário')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
    customSiteTitle: 'Movie Catalog API Documentation',
    customCss: '.swagger-ui .topbar { background-color: #1976d2; }',
  });

  const expressApp = app.getHttpAdapter().getInstance();
  await app.listen(3000);

  console.log('Nest application is running');
  console.log('Connected to database');
}

let server;
export const handler = async (event, context, callback) => {
  server = server ?? (await bootstrap());
  return serverless(server)(event, context);
};
