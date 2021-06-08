import { Module } from '@nestjs/common';
import { CarModule } from './modules/car/car.module';
import { OrderModule } from './modules/order/order.module';
import { SecurityModule } from './modules/security/security.module';
import { getMetadataArgsStorage } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QueryLogger } from '@rent/interfaces/modules/logger/query.logger';

@Module({
  imports: [
    CarModule,
    OrderModule,
    SecurityModule,
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
  public static getDatabaseConfig(): unknown {
    const defaultOptions = {
      name: 'default',
      type: 'postgres',
      autoLoadEntities: true,
      synchronize: true,
      entities: getMetadataArgsStorage()
        .tables.filter((table) => !!table.schema)
        .map((tbl) => tbl.target),
      logging: true,
      logger: new QueryLogger(),
      host: 'localhost',
      port: '5432',
      username: 'postgres',
      password: 'example',
      database: 'cars4rent'
    };
    return defaultOptions;
  }
}
