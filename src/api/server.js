const app = require('./app');
const config = require('./utils/config.utils');

const { port } = config;

app.listen(port, () => {
  console.log(`👉👉   Project running on ${port}`);
});
