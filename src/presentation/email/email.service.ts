import nodemailer from 'nodemailer';
import { envs } from '../../config/plugins/envs.plugins';

interface SendEmailOptions {
  to: string | string[];
  subject: string;
  htmlBody: string;
  attachments: Attachment[];
}

interface Attachment {
  filename: string;
  path: string;
}

export class EmailService {
  private transporter = nodemailer.createTransport({
    service: envs.MAILER_SERVICE,
    auth: {
      user: envs.MAILER_EMAIL,
      pass: envs.MAILER_SECRET_KEY,
    },
  });
  private generateEmailHTML(date: string): string {
    return `
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Informe Diario de Logs del Servidor</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                line-height: 1.6;
                color: #333;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
            }
            .header {
                background-color: #0056b3;
                color: white;
                padding: 20px;
                text-align: center;
            }
            .content {
                padding: 20px;
                background-color: #f9f9f9;
            }
            .log-section {
                margin-bottom: 20px;
                padding: 10px;
                border-radius: 5px;
            }
            .log-all {
                background-color: #e6f7ff;
            }
            .log-medium {
                background-color: #fff5e6;
            }
            .log-high {
                background-color: #ffe6e6;
            }
            .footer {
                text-align: center;
                padding: 10px;
                font-size: 12px;
                color: #666;
            }
        </style>
    </head>
    <body>
        <div class="header">
            <h1>Informe Diario de Logs del Servidor</h1>
        </div>
        <div class="content">
            <p>Estimado equipo,</p>
            <p>Adjunto encontrarán el informe diario de logs del servidor correspondiente a la fecha ${date}. A continuación, se presenta un resumen de los archivos adjuntos:</p>

            <div class="log-section log-all">
                <h3>Logs de Todos los Niveles</h3>
                <p>Archivo: logs-all.log</p>
                <p>Descripción: Contiene todos los logs del servidor, incluyendo eventos de rutina y alertas de todas las prioridades.</p>
            </div>

            <div class="log-section log-medium">
                <h3>Logs de Nivel Medio</h3>
                <p>Archivo: logs-medium.log</p>
                <p>Descripción: Incluye advertencias y eventos que requieren atención, pero no son críticos.</p>
            </div>

            <div class="log-section log-high">
                <h3>Logs de Nivel Alto</h3>
                <p>Archivo: logs-high.log</p>
                <p>Descripción: Contiene alertas críticas y eventos que requieren atención inmediata.</p>
            </div>

            <p>Por favor, revisen los archivos adjuntos y tomen las acciones necesarias según los protocolos establecidos.</p>

            <p>Si tienen alguna pregunta o requieren información adicional, no duden en contactar al equipo de soporte.</p>

            <p>Saludos cordiales,<br>
            Sistema Automatizado de Reportes de Logs</p>
        </div>
        <div class="footer">
            <p>Este es un mensaje automático. Por favor, no responda a este correo.</p>
            <p>© ${new Date().getFullYear()} Tu Empresa. Todos los derechos reservados.</p>
        </div>
    </body>
    </html>
    `;
  }

  constructor() {}

  async sendEmail(options: SendEmailOptions): Promise<boolean> {
    const { to, subject, htmlBody, attachments } = options;
    try {
      const sentInformation = await this.transporter.sendMail({
        to: to,
        subject: subject,
        html: htmlBody,
        attachments: attachments,
      });
      console.log(sentInformation);

      return true;
    } catch (error) {
      console.error('Error sending email:', error);
      return false;
    }
  }

  async sendEmailWithFileSystemLogs(to: string | string[]): Promise<boolean> {
    const date = new Date().toISOString().split('T')[0]; // Formato YYYY-MM-DD
    const subject = `Informe de Logs del Servidor - ${date}`;
    const htmlBody = this.generateEmailHTML(date);

    const attachments: Attachment[] = [
      { filename: 'logs-all.log', path: './logs/logs-all.log' },
      { filename: 'logs-medium.log', path: './logs/logs-medium.log' },
      { filename: 'logs-high.log', path: './logs/logs-high.log' },
    ];

    return this.sendEmail({
      to,
      subject,
      attachments,
      htmlBody,
    });
  }
}
