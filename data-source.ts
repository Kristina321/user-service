import { DataSource } from 'typeorm';
import { User } from './src/user/user.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '9095',
  database: 'userdb',
  entities: [User],
  synchronize: true,
});
