import { Injectable, LoggerService } from '@nestjs/common';

@Injectable()
export class TskvLogger implements LoggerService {
  private format(level: string, message: any, ...optionalParams: any[]) {
    const record = {
      level: String(level),
      message: String(message),
      timestamp: new Date().toISOString(),
      params: optionalParams.map(p => String(p)).join(',')
    };

    return Object.entries(record)
      .map(([key, value]) => `${key}=${value}`)
      .join('\t');
  }

  log(message: any, ...optionalParams: any[]) {
    console.log(this.format('log', message, ...optionalParams));
  }

  error(message: any, ...optionalParams: any[]) {
    console.error(this.format('error', message, ...optionalParams));
  }

  warn(message: any, ...optionalParams: any[]) {
    console.warn(this.format('warn', message, ...optionalParams));
  }

  debug(message: any, ...optionalParams: any[]) {
    console.debug(this.format('debug', message, ...optionalParams));
  }

  verbose(message: any, ...optionalParams: any[]) {
    console.debug(this.format('verbose', message, ...optionalParams));
  }
}