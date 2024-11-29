import { AppDataSource } from '../ormconfig.ts';
import { Order } from '../monolithOrderAndFeedback/Order.ts';
import { Feedback } from '../monolithOrderAndFeedback/Feedback.ts';

export default async function globalTeardown() {
    //Connect to database
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
  }

  console.log('Cleaning up the test database...'); // eslint-disable-line no-console

  const entities = [Order, Feedback]; //Add entities when neccesarry

  // Clear all collections
  try {
    for (const entity of entities) {
      const repository = AppDataSource.getRepository(entity);

      await repository.delete({}); //Deletes all documents in the collection
    }
  } catch (error) {
    console.error('Error while clearing the database:', error);
  }

  // Close the connection
  try {
    await AppDataSource.destroy();
    console.log('Database connection closed.');
  } catch (error) {
    console.error('Error while closing the database connection:', error);
  }
}
