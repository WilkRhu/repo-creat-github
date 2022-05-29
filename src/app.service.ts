import { Inject, Injectable } from '@nestjs/common';
import axios, { AxiosStatic } from 'axios';
import { Repository } from 'typeorm';
import { GIT_REPOSITORY } from '../core/constants/constant';
import { App } from './config/export-envs';
import { GitHub } from './interface/git-hub-entities';
import { GitHubTransformApi } from './utils/transform-git-api';

@Injectable()
export class AppService {
  constructor(
    @Inject(GIT_REPOSITORY) private readonly gitRepository: Repository<GitHub>,
    public readonly gitHubTransformApi: GitHubTransformApi,
  ) {}

  public readonly request: AxiosStatic = axios;
  async create(userName: string, repository: string): Promise<GitHub> {
    try {
      const repo = this.get_repository(userName, repository);
      const issues = await this.get_issues(userName, repository);
      const { contributors } = await this.get_contributors(
        userName,
        repository,
      );

      if (repo && issues && contributors) {
        const response = {
          ...repo,
          issues,
          contributors,
        };

        const saveDataBase = await this.gitRepository.insert(response);
        const getSave = await this.gitRepository.findOne(
          saveDataBase.raw.insertedId,
        );
        return getSave;
      }
      throw new Error('Error user or repository not found!');
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  async findAll(): Promise<GitHub[]> {
    return await this.gitRepository.find();
  }

  public async get_repository(
    userName: string,
    repository: string,
  ): Promise<any> {
    try {
      const { data } = await this.request.get(
        `${App.git}/${userName}/${repository}`,
      );
      const response = this.gitHubTransformApi.transformUseRepo(data);
      if (response) return response;
      throw new Error(`${response['error']}`);
    } catch (error) {
      throw new Error(`Error Api Git ${error}`);
    }
  }

  public async get_issues(userName: string, repository: string): Promise<any> {
    try {
      const { data } = await this.request.get(
        `${App.git}/${userName}/${repository}/issues`,
      );
      const response = this.gitHubTransformApi.transformIssues(data);
      return response;
    } catch (error) {
      throw new Error(`Error Api Git Issues ${error}`);
    }
  }

  public async get_contributors(
    userName: string,
    repository: string,
  ): Promise<any> {
    try {
      const { data } = await this.request.get(
        `${App.git}/${userName}/${repository}/contributors`,
      );
      const response =
        this.gitHubTransformApi.transformContributorsQuantityCommits(data);
      return { contributors: response };
    } catch (error) {
      throw new Error(`Error Api Git Contributors ${error}`);
    }
  }
}
