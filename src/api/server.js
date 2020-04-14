import { blueBright } from 'chalk';
import { port } from './utils/config.utils';
import app from './app';

app.listen(port, () => {
  console.log(`${blueBright(
    `👉👉   Project running on ${port}`
  )}
  `);
});
