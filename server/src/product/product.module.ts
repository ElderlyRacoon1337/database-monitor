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
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'helloworld',
      database: 'postgres',
      ssl: false,
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
