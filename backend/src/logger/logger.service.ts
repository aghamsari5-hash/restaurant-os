import { Injectable, LoggerService as NestLoggerService } from '@nestjs/common';

@Injectable()
export class LoggerService implements NestLoggerService {
  public log(message: string, context?: string): void {
    const timestamp = new Date().toISOString();
    console.log(JSON.stringify({ level: 'INFO', timestamp, context, message }));
  }

  public error(message: string, trace?: string, context?: string): void {
    const timestamp = new Date().toISOString();
    console.error(
      JSON.stringify({ level: 'ERROR', timestamp, context, message, trace }),
    );
  }

  public warn(message: string, context?: string): void {
    const timestamp = new Date().toISOString();
    console.warn(
      JSON.stringify({ level: 'WARN', timestamp, context, message }),
    );
  }

  public debug?(message: string, context?: string): void {
    const timestamp = new Date().toISOString();
    console.debug(
      JSON.stringify({ level: 'DEBUG', timestamp, context, message }),
    );
  }

  public verbose?(message: string, context?: string): void {
    const timestamp = new Date().toISOString();
    console.log(
      JSON.stringify({ level: 'VERBOSE', timestamp, context, message }),
    );
  }
}
