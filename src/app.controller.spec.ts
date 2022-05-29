/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseModule } from '../core/database/database.module';
import { gitMockRepo } from '../test/mocks/gitmock';
import { AppController } from './app.controller';
import { appProviders } from './app.providers';
import { AppService } from './app.service';
import { GitHubTransformApi } from './utils/transform-git-api';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule],
      controllers: [AppController],
      providers: [...appProviders, AppService, GitHubTransformApi],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', async () => {
      const response = await appController.create(gitMockRepo);
      console.log(response);
    });
  });
});
