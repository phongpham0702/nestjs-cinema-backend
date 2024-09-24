import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as morgan from 'morgan';
import { Logger, ValidationPipe } from '@nestjs/common';
import * as chalk from 'chalk';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(morgan('dev'))

  app.useGlobalPipes(new ValidationPipe({
    whitelist:true,
    transform:true,
    transformOptions:{
      enableImplicitConversion:true
    }
  }))

  const port: number = parseInt(process.env.SERVER_PORT) || 3000;
  await app.listen(port).then((v) => {
    Logger.log(chalk.cyan('Server is listening on port: ' + port),"NestApplication")
    
  });
}
bootstrap();
