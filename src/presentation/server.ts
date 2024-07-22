import { log } from 'console';
import { CheckService } from '../domain/use-cases/checks/check-service';
import { SendEmailLogs } from '../domain/use-cases/email/send-email-logs';
import { FileSystemDatasource } from '../infrastructure/datasources/file-system.datasource';
import { LogRepositoryImpl } from '../infrastructure/repositories/log.repository.impl';
import { CronService } from './cron/cron-service';
import { EmailService } from './email/email.service';

const fileSystemLogRepository = new LogRepositoryImpl(
  new FileSystemDatasource()
);

const emailService = new EmailService();

export class Server {
  public static start() {
    console.log('Server started...');
    new SendEmailLogs(emailService, fileSystemLogRepository).execute([
      'hbowiiu@gmail.com',
    ]);
    // emailService.sendEmailWithFileSystemLogs(['hbowiiu@gmail.com']);

    // const url = 'https://conservas.joyan.cloud';
    // CronService.createJob('*/5 * * * * *', () => {
    //   new CheckService(
    //     fileSystemLogRepository,
    //     () => console.log(`${url} is ok`),
    //     (error) => console.log(`${error} in ${url}`)
    //   ).execute(url);
    // });
  }
}
