import { transports, format, createLogger } from 'winston'

export const logger = createLogger({
    level: 'silly',
    format: format.combine(
        format.timestamp(),
        format.json(),
        format.colorize({ all: true })
    ),
    transports: [
        new transports.Console(),
        new transports.File({ filename: 'error.log', level: 'error' }),
        new transports.File({ filename: 'application.log' }),
    ],
})
