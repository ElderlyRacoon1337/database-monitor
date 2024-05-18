import { ProductModule } from './product/product.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MonitoringModule } from './monitoring/monitoring.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'tightly-pumped-sloth.a1.pgedge.io',
      port: 5432,
      username: 'admin',
      password: '9z268U4oo4rB6U9eIfU5M4ed',
      database: 'defaultdb',
      ssl: true,
      extra: {
        ssl: {
          rejectUnauthorized: false,
        },
      },
      autoLoadEntities: true,
      synchronize: true,
    }),
    ProductModule,
    MonitoringModule,
  ],
})
export class AppModule {}
