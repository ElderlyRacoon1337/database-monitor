import { Controller, Get } from '@nestjs/common';
import { MonitoringService } from './monitoring.service';

@Controller('monitoring')
export class MonitoringController {
  constructor(private readonly monitoringService: MonitoringService) {}

  @Get('database-stats')
  async getDatabaseStats() {
    return this.monitoringService.getDatabaseStats();
  }

  @Get('activity')
  async getActivity() {
    return this.monitoringService.getActivity();
  }
}
