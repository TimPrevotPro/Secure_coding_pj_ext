import { pino } from 'pino';

const transport = {
    targets: [
        {
            level: 'info',
            target: 'pino/file',
            options: { destination: 1 }
        },
        {
            level: 'trace',
            target: 'pino/file',
            options: { destination: './logs/main.log' }
        }
    ]
}
export const logger = pino({
    level: 'debug',
    transport
});