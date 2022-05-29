import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseModule } from 'core/database/database.module';
import { AppController } from 'src/app.controller';
import { appProviders } from 'src/app.providers';
import { AppService } from 'src/app.service';
import { GitHubTransformApi } from 'src/utils/transform-git-api';
import * as request from 'supertest';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule],
      controllers: [AppController],
      providers: [...appProviders, AppService, GitHubTransformApi],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });
});
