import { Sequelize } from 'sequelize';
import * as dotenv from 'dotenv';

// Load environment variables from the .env file
dotenv.config();

// Instantiate a new Sequelize instance using environment variables
export const sequalize: Sequelize = new Sequelize(
  process.env.DB_NAME as string,
  process.env.DB_USER as string,
  process.env.DB_PASSWORD as string,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false,
  },
);

// Test the connection to the database
export const establishDBConnection = async () => {
  try {
    await sequalize.authenticate();
    console.log('  ------ MySQL Server started ------\n');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};
