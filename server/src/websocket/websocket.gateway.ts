import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { MonitoringService } from '../monitoring/monitoring.service';

@WebSocketGateway()
export class WebsocketGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  constructor(private readonly monitoringService: MonitoringService) {}

  async handleConnection(client: Socket, ...args: any[]) {
    console.log('Client connected:', client.id);

    const databaseStats = await this.monitoringService.getDatabaseStats();
    const activity = await this.monitoringService.getActivity();
    client.emit('database-stats', databaseStats);
    client.emit('activity', activity);
  }

  handleDisconnect(client: Socket) {
    console.log('Client disconnected:', client.id);
  }

  @SubscribeMessage('get-database-stats')
  async handleGetDatabaseStats(client: Socket): Promise<void> {
    const databaseStats = await this.monitoringService.getDatabaseStats();
    client.emit('database-stats', databaseStats);
  }

  @SubscribeMessage('get-activity')
  async handleGetActivity(client: Socket): Promise<void> {
    const activity = await this.monitoringService.getActivity();
    client.emit('activity', activity);
  }
}
