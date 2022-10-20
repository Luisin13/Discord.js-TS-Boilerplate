import { LoggerConstructor, LoggerInterface, logLevels } from '@/types';
import chalk from 'chalk';

export class Logger implements LoggerInterface {
  private logPrefix: string;
  private onLog?: (logMessage: string, logLevel: logLevels) => void;

  constructor(args: LoggerConstructor) {
    this.logPrefix = args.logPrefix;
    if (args.onLog) this.onLog = args.onLog;
  }

  /**
   * Log a message on debug level
   */
  public debug(message: string) {
    console.log(
      `[${chalk.blueBright(this.logPrefix + '/DEBUG')}] - ${message}`,
    );
    if (this.onLog) this.onLog(message, 'DEBUG');
  }

  /**
   * Log a message on info level
   */
  public info(message: string) {
    console.log(`[${chalk.green(this.logPrefix + '/INFO')}] - ${message}`);
    if (this.onLog) this.onLog(message, 'INFO');
  }

  /**
   * Log a message on warn level
   */
  public warn(message: string) {
    console.log(`[${chalk.yellowBright(this.logPrefix + '/WARN')}] - ${message}`);
    if (this.onLog) this.onLog(message, 'WARN');
  }

  /**
   * Log a message on error level
   */
  public error(message: string) {
    console.log(`[${chalk.hex("#d49528")(this.logPrefix + '/ERROR')}] - ${message}`);
    if (this.onLog) this.onLog(message, 'ERROR');
  }

  /**
   * Log a message on fatal level
   */
  public fatal(message: string) {
    console.log(`[${chalk.redBright(this.logPrefix + '/FATAL')}] - ${message}`);
    if (this.onLog) this.onLog(message, 'FATAL');
  }
}
