import { DataSource } from 'typeorm';
import { App } from '../../src/config/export-envs';
import { GitHub } from '../../src/interface/git-hub-entities';
import { DATA_BASE } from '../constants/constant';

export const databaseProviders = [
  {
    provide: DATA_BASE,
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'mongodb',
        url: App.urlDatabase,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        synchronize: true,
        logging: true,
        entities: [GitHub],
      });

      return dataSource.initialize();
    },
  },
];
