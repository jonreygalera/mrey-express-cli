import kernel from './bootstrap/kernel';
import config from './config/app.config';

(async () => {
  try {
    const server = await kernel();
    server?.listen(config.port, () => {
      console.log(`>> Listening to port: ${config.port}`);
    });
  } catch (error) {
    console.error('>> Failed to start the server:', error);
    process.exit(1); // Exit the process with a failure code
  }
})();

