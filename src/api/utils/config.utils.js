const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

module.exports = {
  local_url: process.env.APP_URL_LOCAL || 'http://localhost:7000',
  hosted_url: process.env.APP_URL_HOSTED || 'http://localhost:7000',
  port: process.env.PORT || 7001
};
