import { Module } from '@nestjs/common';
import { DatabaseModule } from '../core/database/database.module';
import { AppController } from './app.controller';
import { appProviders } from './app.providers';
import { AppService } from './app.service';
import { GitHubTransformApi } from './utils/transform-git-api';

@Module({
  imports: [DatabaseModule],
  controllers: [AppController],
  providers: [...appProviders, AppService, GitHubTransformApi],
})
export class AppModule {}
