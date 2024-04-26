import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder, ApiProperty } from '@nestjs/swagger';
import { config } from 'dotenv';

config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

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
  SwaggerModule.setup('/', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
    customSiteTitle: 'Movie Catalog API Documentation',
    customCss: '.swagger-ui .topbar { background-color: #1976d2; }',
  });
  
  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`Nest application is running on port ${port}`);

  console.log('Connected to database');
}
bootstrap();