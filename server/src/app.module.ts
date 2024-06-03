import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from './product/product.module';
import { MonitoringModule } from './monitoring/monitoring.module';
import { WebsocketModule } from './websocket/websocket.module';

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
    ProductModule,
    MonitoringModule,
    WebsocketModule,
  ],
})
export class AppModule {}
