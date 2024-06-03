import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { MonitoringService } from '../monitoring/monitoring.service';

@WebSocketGateway({
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
    credentials: true,
  },
})
export class WebsocketGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  constructor(private readonly monitoringService: MonitoringService) {
    // this.startBroadcastingStats();
  }

  // private startBroadcastingStats() {
  //   setInterval(async () => {
  //     const databaseStats = await this.monitoringService.getDatabaseStats();
  //     const activity = await this.monitoringService.getActivity();
  //     this.server.emit('database-stats', databaseStats);
  //     this.server.emit('activity', activity);
  //   }, 1000);
  // }

  async handleConnection(client: Socket) {
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
