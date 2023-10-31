const server = require('@danitech/wa-web-api');
const fs = require('fs');
const chalk = require('chalk');
const config = require('./config/settings.js');
const client = require('./includes/client.js');

const startServer = (config, client) => {
  return server.start(config, client);
};

const watchAndReloadFile = (filePath) => {
  const currentFile = require.resolve(filePath);
  const filename = currentFile.substring(currentFile.lastIndexOf('/') + 1);

  fs.watchFile(currentFile, () => {
    fs.unwatchFile(currentFile);
    console.info(chalk.cyan(`${filename} file has been updated.`));
    delete require.cache[currentFile];
    require(currentFile);
    watchAndReloadFile(filePath);
  });
};

startServer(config, client);

/*watchAndReloadFile('./config/settings.js');
watchAndReloadFile('./includes/client.js');*/
