import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';
import { Connection } from 'typeorm';

@Injectable()
export class MonitoringService {
  constructor(@InjectConnection() private readonly connection: Connection) {}

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
