import { blueBright } from 'chalk';
import { port } from './utils/config.utils';
import app from './app';

console.log(process.env.NODE_ENV);


app.listen(port, () => {
  console.log(`${blueBright(
    `👉👉   Project running on ${port}`
  )}
  `);
});
