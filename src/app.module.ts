import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MoviesModule } from './modules/movies/movies.module';
import { DatabaseModule } from './database/database.module';
import { ServerConfigModule } from './config/server-config.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [ServerConfigModule, DatabaseModule, MoviesModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
