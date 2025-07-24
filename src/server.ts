/* eslint-disable no-console */
import { Server } from 'http';
import app from './app';
import config from './app/config';

let server: Server | null = null;

function gracefulShutdown(signal: string) {
  console.log(`Received ${signal}. Closing server... `);
  if (server) {
    server.close(() => {
      console.log('Server closed gracefully! ');
      process.exit(0); 
    });
  } else {
    process.exit(0);
  }
}

async function main() {
  try {
  
    server = app.listen(config.port, () => {
      console.log(`Server running on port ${config.port}`);
    });

    process.on('SIGTERM', (error) => {
      console.error('SIGTERM:', error);
      gracefulShutdown('SIGTERM');
    });
    process.on('SIGINT', (error) => {
      console.error('SIGINT:', error);
      gracefulShutdown('SIGINT');
    });

    process.on('uncaughtException', (error) => {
      console.error('Uncaught Exception:', error);
      gracefulShutdown('uncaughtException');
    });

    process.on('unhandledRejection', (error) => {
      console.error('Unhandled Rejection:', error);
      gracefulShutdown('unhandledRejection');
    });
  } catch (error) {
    console.error('Error during bootstrap:', error);
    process.exit(1);
  }
}

main();
