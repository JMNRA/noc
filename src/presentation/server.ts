import { FileSystemDatasource } from '../infrastructure/datasources/file-system.datasource';
import { LogRepositoryImpl } from '../infrastructure/repositories/log.repository.impl';
import { CronService } from './cron/cron-service';
import { EmailService } from './email/email.service';
import { MongoLogDatasource } from '../infrastructure/datasources/mongo-log.datasource';
import { PostgresLogDatasource } from '../infrastructure/datasources/postgres-log.datasource';
import { CheckServiceMultiple } from '../domain/use-cases/checks/check-service-multiple';

const fsLogRepository = new LogRepositoryImpl(new FileSystemDatasource());
const mongoLogRepository = new LogRepositoryImpl(new MongoLogDatasource());
const postgresLogRepository = new LogRepositoryImpl(
  new PostgresLogDatasource()
);
const emailService = new EmailService();

export class Server {
  public static async start() {
    console.log('Server started...');
    // new SendEmailLogs(emailService, fileSystemLogRepository).execute([
    //   'flor_neyra_diaz@hotmail.com',
    // ]);
    // emailService.sendEmailWithFileSystemLogs(['hbowiiu@gmail.com']);

    // const logs = await logRepository.getLogs(LogSeverityLevel.low);
    // console.log(logs);

    // const url = 'https://conservas.joyan.cloud';
    // CronService.createJob('*/5 * * * * *', () => {
    //   new CheckServiceMultiple(
    //     [fsLogRepository, mongoLogRepository, postgresLogRepository],
    //     () => console.log(`${url} is ok`),
    //     (error) => console.log(`${error} in ${url}`)
    //   ).execute(url);
    // });
  }
}
