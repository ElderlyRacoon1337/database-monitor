import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { MonitoringModule } from '../monitoring/monitoring.module';

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
    TypeOrmModule.forFeature([Product]),
    MonitoringModule,
  ],
  providers: [ProductService],
  controllers: [ProductController],
})
export class ProductModule {}
