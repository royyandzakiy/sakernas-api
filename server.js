// server.js
const express        = require('express');
const MongoClient    = require('mongodb').MongoClient;
const bodyParser     = require('body-parser');
const app            = express();
const db = require('./config/db');
const cors = require('cors')

const port = 8002;

app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

MongoClient.connect(db.url, (err, database) => {
  if (err) return console.log(err)
  require('./app/routes')(app, database);

  app.listen(port, () => {
      console.log('We are on port ' + port);
  });
})
