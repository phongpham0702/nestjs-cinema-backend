import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port: number = parseInt(process.env.SERVER_PORT) || 3000;
  await app.listen(port).then((v) => {
    console.log('Server is listening on port: ' + port);
  });
}
bootstrap();
