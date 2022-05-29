import { DataSource } from 'typeorm';
import { DATA_BASE, GIT_REPOSITORY } from '../core/constants/constant';
import { GitHub } from './interface/git-hub-entities';

export const appProviders = [
  {
    provide: GIT_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(GitHub),
    inject: [DATA_BASE],
  },
];
