import app from "./index.ts";
import 'reflect-metadata';
import { AppDataSource } from "./ormconfig.ts";

const port = 3001;

AppDataSource.initialize()
    .then(() => {
        console.log('Data Source has been initialized!'); // eslint-disable-line no-console
        app.listen(port, () => {
            console.log(`Server is running at http://localhost:${port}`); // eslint-disable-line no-console
        });
    })
    .catch((err) => {
        console.error('Error during Data Source initialization:', err); // eslint-disable-line no-console
    });