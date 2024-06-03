import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';
import { Client } from 'pg';
import { Connection } from 'typeorm';
import osu from 'node-os-utils';

@Injectable()
export class MonitoringService {
  private client: Client;

  constructor(@InjectConnection() private readonly connection: Connection) {
    this.client = new Client({
      user: 'postgres',
      host: 'localhost',
      database: 'postgres',
      password: 'helloworld',
      port: 5432,
    });
    this.client.connect((err) => {
      if (err) {
        console.error('connection error', err.stack);
      } else {
        console.log('connected to PostgreSQL');
      }
    });
  }

  async getCpuAndMemoryUsage() {
    const cpuUsage = await osu.cpu.usage();
    const memoryUsage = await osu.mem.used();

    return {
      cpu: cpuUsage,
      memory: memoryUsage,
    };
  }

  async getDatabaseStats(): Promise<any> {
    return this.connection.query(`
      SELECT 
        datname,
        numbackends,
        xact_commit,
        xact_rollback,
        blks_read,
        blks_hit,
        tup_returned,
        tup_fetched,
        tup_inserted,
        tup_updated,
        tup_deleted 
      FROM pg_stat_database;
    `);
  }

  async getActivity(): Promise<any> {
    return this.connection.query(`
      SELECT 
        pid,
        usename,
        application_name,
        client_addr,
        client_hostname,
        client_port,
        backend_start,
        state,
        query 
      FROM pg_stat_activity;
    `);
  }
}
