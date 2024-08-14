import { LogEntity, LogSeverityLevel } from '../../entities/log.entity';
import { LogRepository } from '../../repository/log.repository';

interface CheckServiceUseCase {
  execute(url: string): Promise<boolean>;
}

type SuccessCallback = () => void;
type ErrorCallback = (error: string) => void;

export class CheckServiceMultiple implements CheckServiceUseCase {
  constructor(
    private readonly logRepository: LogRepository[],
    private readonly succesCallback: SuccessCallback,
    private readonly errorCalback: ErrorCallback
  ) {}

  private callLogs(log: LogEntity) {
    this.logRepository.forEach((logRepository) => {
      logRepository.saveLog(log);
    });
  }

  public async execute(url: string): Promise<boolean> {
    try {
      const req = await fetch(url);
      if (req.ok) {
        const log = new LogEntity({
          message: `Service ${url} working`,
          level: LogSeverityLevel.low,
          origin: 'check-service.ts',
        });
        this.callLogs(log);
        this.succesCallback();
      }
      return true;
    } catch (error) {
      const errorMessage = `${error} on check service ${url}`;
      const log = new LogEntity({
        message: errorMessage,
        level: LogSeverityLevel.high,
        origin: 'check-service.ts',
      });
      this.callLogs(log);
      this.errorCalback(`${error}`);
      return false;
    }
  }
}
