import { LogEntity, LogSeverityLevel } from '../../entities/log.entity';
import { LogRepository } from '../../repository/log.repository';

interface CheckServiceUseCase {
  execute(url: string): Promise<boolean>;
}

type SuccessCallback = () => void;
type ErrorCallback = (error: string) => void;

export class CheckService implements CheckServiceUseCase {
  constructor(
    private readonly logRepository: LogRepository,
    private readonly succesCallback: SuccessCallback,
    private readonly errorCalback: ErrorCallback
  ) {}

  public async execute(url: string): Promise<boolean> {
    try {
      const req = await fetch(url);
      if (req.ok) {
        const log = new LogEntity(
          `Service ${url} working`,
          LogSeverityLevel.low
        );
        this.logRepository.saveLog(log);
        this.succesCallback();
      }
      return true;
    } catch (error) {
      const errorMessage = `${error} on check service ${url}`;
      const log = new LogEntity(errorMessage, LogSeverityLevel.high);
      this.logRepository.saveLog(log);
      this.errorCalback(`${error}`);
      return false;
    }
  }
}
