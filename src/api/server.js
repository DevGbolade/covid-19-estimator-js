import { port } from './utils/config.utils';
import app from './app';

app.listen(port, () => {
  console.log(`👉👉   Project running on ${port}`);
});
