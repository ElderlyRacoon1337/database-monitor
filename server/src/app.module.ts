import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from './product/product.module';
import { MonitoringModule } from './monitoring/monitoring.module';
import { WebsocketModule } from './websocket/websocket.module';

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
    WebsocketModule,
  ],
})
export class AppModule {}
