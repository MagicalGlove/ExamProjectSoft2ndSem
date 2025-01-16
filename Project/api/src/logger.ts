import winston from 'winston';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ level, message, timestamp, ...meta }) => {
      return `${timestamp} [${level}] ${message} ${JSON.stringify(meta)}`;
    })
  ),
  transports: [
    new winston.transports.Console(),
    new (winston.transports.File)({ filename: 'error.log', level: 'error' }),
    new (winston.transports.File)({ filename: 'combined.log' }), // All logs
  ],
});

export default logger;

