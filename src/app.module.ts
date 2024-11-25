import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import ormconfig from '../ormconfig.json';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: ormconfig.host,
      port: ormconfig.port,
      username: ormconfig.username,
      password: ormconfig.password,
      database: ormconfig.database,
      synchronize: ormconfig.synchronize,
      autoLoadEntities: true,
    }),
    UserModule,
  ],
})
export class AppModule {}
/*import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '9095',
      database: 'userdb',
      autoLoadEntities: true,
      synchronize: true,
    }),
    UserModule,
  ],
})
export class AppModule {}*/
