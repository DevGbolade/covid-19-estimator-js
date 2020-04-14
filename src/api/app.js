const express = require('express');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const { createWriteStream } = fs;


const routes = require('./routes/index.route');


const app = express();

// create a write stream for (morgan logger)
const accessLogStream = createWriteStream(
  path.join(__dirname, 'access.log'),
  { flags: 'a' }
);

// logger setup
app.use(
  morgan(':method :url :status :response-time ms', {
    stream: {
      write: (string) => {
        const methodToStatus = string.split(' ').slice(0, 3).join(' ');
        let time = Math.trunc(Number(string.split(' ')[3]));
        if (time < 10) time = `0${time.toString()}`;
        const logger = `${methodToStatus}  ${time}${string.split(' ')[4]}`;
        accessLogStream.write(logger);
      }
    }
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.options('*', cors());


app.get('/', (req, res) => res.send('Welcome to covid 19 estimator'));

app.use('/api/v1', routes);

app.all('*', (req, res) => {
  res.status(404).json({
    status: 404,
    error: "Sorry, we couldn't find that!"
  });
});


module.exports = app;
