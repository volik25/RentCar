import { Module } from '@nestjs/common';
import { CarModule } from './modules/car/car.module';
import { OrderModule } from './modules/order/order.module';
import { UserModule } from './modules/user/user.module';
import { getMetadataArgsStorage } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QueryLogger } from '../../../../libs/interfaces/modules/logger/query.logger';

@Module({
  imports: [
    CarModule,
    OrderModule,
    UserModule,
    TypeOrmModule.forRootAsync({
      useFactory: () => {
        return AppModule.getDatabaseConfig();
      },
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  public static getDatabaseConfig() {
    const defaultOptions = {
      name: 'default',
      type: 'postgres',
      autoLoadEntities: true,
      entities: getMetadataArgsStorage()
        .tables.filter((table) => !!table.schema)
        .map((tbl) => tbl.target),
      logging: true,
      logger: new QueryLogger(),
      synchronize: false,
      host: '127.0.0.1',
      port: '3306',
      username: 'root',
      password: '',
      database: 'cars4rent'
    };
    return defaultOptions;
  }
}
