import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { WebsocketGateway } from './websocket/websocket.gateway';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly websocketGateway: WebsocketGateway,
  ) {}

  @Get('send-message')
  sendMessage() {
    const message = 'Hello from server';
    this.websocketGateway.server.emit('message', message); // Отправить сообщение всем подключенным клиентам
    return { message: 'Message sent' };
  }
}
