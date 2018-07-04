const bodyParser = require('body-parser');
const knex = require('knex');

const db = knex({
  client: 'pg',
  connection: {
    host: 'kwanwoodb.ccbl9zbqcka3.ap-northeast-2.rds.amazonaws.com',
    user: 'kwanwooi',
    password: 'rhksnsla12',
    database: 'kwangilmes_test'
  }
});

const app = require('express')();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send("Yes! I'm listening");
});

// ROUTES
require('./routes/accounts')(app, db);


app.listen(3000, () => {
  console.log('server is running on 3000');
});
