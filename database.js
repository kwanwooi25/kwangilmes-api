const knex = require('knex');

module.exports = knex({
  client: 'pg',
  connection: {
    host: 'kwdevdb.ccbl9zbqcka3.ap-northeast-2.rds.amazonaws.com',
    user: 'kwanwooi',
    password: 'rhksnsla12',
    database: 'kwangilmes'
  }
});

// module.exports = knex({
//   client: 'pg',
//   connection: {
//     host: 'kwanwoodb.ccbl9zbqcka3.ap-northeast-2.rds.amazonaws.com',
//     user: 'kwanwooi',
//     password: 'rhksnsla12',
//     database: 'kwangilmes-test2'
//   }
// });
