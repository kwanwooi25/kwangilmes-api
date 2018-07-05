const { SAMPLE_ACCOUNTS } = require('../fixture');

module.exports = (app, db) => {
  /*=======================================
  ROUTES
  -----------------------------------------
  POST    /accounts      전체 거래처 조회
  GET     /accounts/:id  단일 거래처 조회
  POST    /accounts/add  거래처 추가
  PUT     /accounts/:id  거래처 정보 수정
  DELETE  /accounts      거래처 삭제
  =========================================*/

  // Create table if table does not exist
  db.schema.hasTable('accounts').then(exists => {
    // if (exists) db.schema.dropTable('accounts').then(console.log);
    if (!exists) {
      db.schema.createTable('accounts', table => {
        table.increments('id').primary();
        table.string('account_name');
        table.string('phone');
        table.string('fax');
        table.string('email');
        table.string('email_tax');
        table.string('address');
        table.string('reg_no');
        table.string('ceo_name');
        table.string('ceo_phone');
        table.string('ceo_email');
        table.string('manager_name');
        table.string('manager_phone');
        table.string('manager_email');
        table.date('account_created_at');
        table.date('account_last_modified_at');
        table.text('account_memo');
      }).then(result => {
        console.log("TABLE CREATED: 'accounts'");
        db.insert(SAMPLE_ACCOUNTS).into('accounts').then(result => {
          console.log("SAMPLE_ACCOUNTS added");
        });
      });
    }
  });

  // 전체 거래처 조회
  app.post('/accounts', (req, res) => {
    const { limit = 10, offset = 0, searchTerm = "" } = req.body;

    db.select('*')
      .from('accounts')
      .where('account_name', 'like', `%${searchTerm}%`)
      .limit(limit)
      .offset(offset)
      .then(data => {
        if (data.length) {
          res.json(data);
        } else {
          res.status(400).json('표시할 결과가 없습니다.');
        }
      })
      .catch(error => res.status(400).json('error fetching accounts'));
  });

  // 단일 거래처 조회
  app.get('/accounts/:id', (req, res) => {
    const { id } = req.params;

    db.select('*')
      .from('accounts')
      .where('id', '=', id)
      .then(account => {
        if (account.length) {
          res.json(account[0]);
        } else {
          res.status(400).json('존재하지 않는 업체입니다.');
        }
      })
      .catch(error => res.status(400).json('error fetching an account'));
  });

  //거래처 추가
  app.post('/accounts/add', (req, res) => {
    const data = req.body; // array of account object

    const isNameEmpty = data.map(account => !!account.account_name).includes(false);

    if (isNameEmpty) {
      res.status(400).json('업체명을 입력해야 합니다.');
    } else {

      // 최초 생성일자 입력
      data.forEach(account => {
        account.account_created_at = new Date();
      });
      db.insert(data)
        .into('accounts')
        .returning('*')
        .then(accounts => res.json(accounts))
        .catch(error => res.status(400).json('error adding accounts'));
    }
  });

  // 거래처 정보 수정
  app.put('/accounts/:id', (req, res) => {
    const { id } = req.params;
    const data = req.body; // object containing account info

    if (!data.account_name) {
      res.status(400).json('업체명을 입력해야 합니다.');
    } else {
      // 수정일자 입력
      data.account_last_modified_at = new Date();
      db('accounts')
        .where('id', '=', id)
        .update(data)
        .returning('*')
        .then(account => res.json(account))
        .catch(error => res.status(400).json('error updating account'));
    }
  });

  // 거래처 삭제
  app.delete('/accounts', (req, res) => {
    const ids = req.body; // array of ids

    if (ids.length) {
      db('accounts')
        .whereIn('id', ids)
        .del()
        .then(response =>
          res.json(`${response}개 업체가 정상적으로 삭제되었습니다.`)
        )
        .catch(error => res.status(400).json('error deleting accounts'));
    } else {
      res.status(400).json('삭제할 업체 정보가 없습니다.');
    }
  });
};
