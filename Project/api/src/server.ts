import app from './index.ts';
import dotenv from 'dotenv'
import 'reflect-metadata';
import { AppDataSource } from './ormconfig.ts';
import logger from './logger.ts';

dotenv.config();

const port = process.env.PORT

AppDataSource.initialize()
    .then(() => {
        logger.info({ message: 'Data Source has been initialized!' });
        
        app.listen(port, () => {
            logger.info({ message: `Server is running at http://localhost:${port}` });
        });

        //Kafka listener for events
        //runConsumer().catch(console.error);
    })
    .catch((err) => {
        logger.error({
            message: `Error during Data Source initialization: ${err}`,
            timestamp: new Date().toISOString(),
          });
        console.error('Error during Data Source initialization:', err);
    });
