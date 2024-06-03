import { Module } from '@nestjs/common';
import { WebsocketGateway } from './websocket.gateway';
import { MonitoringModule } from 'src/monitoring/monitoring.module';

@Module({
  imports: [MonitoringModule],
  providers: [WebsocketGateway],
})
export class WebsocketModule {}
