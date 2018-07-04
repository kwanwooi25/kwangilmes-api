module.exports = (app, db) => {
  /*=======================================
  APIs
  -----------------------------------------
  POST    /accounts      전체 거래처 조회
  GET     /accounts/:id  단일 거래처 조회
  POST    /accounts/add  거래처 추가
  PUT     /accounts/:id  거래처 정보 수정
  DELETE  /accounts      거래처 삭제
  =========================================*/

  // Create table if table does not exist
  db.schema.hasTable('accounts').then(function(exists) {
    if (!exists) {
      db.schema.createTable('accounts', function(table) {
        table.increments('id');
        table.string('name');
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
        table.string('memo');
      });
    }
  });

  // 전체 거래처 조회
  app.post('/accounts', (req, res) => {
    const { limit, offset, searchTerm } = req.body;

    if (limit !== undefined && offset !== undefined) {
      db.select('*')
        .from('accounts')
        .where('name', 'like', `%${searchTerm}%`)
        .limit(limit)
        .offset(offset)
        .then(data => {
          if (data.length) {
            res.json(data);
          } else {
            res.status(400).json('표시할 결과가 없습니다.');
          }
        });
    } else {
      res.status(400).json('데이터를 가져올 수 없습니다.');
    }
  });

  // 단일 거래처 조회
  app.get('/accounts/:id', (req, res) => {
    const { id } = req.params;

    db.select('*')
      .from('accounts')
      .where('id', '=', id)
      .then(account => {
        if (account.length) {
          res.json(account);
        } else {
          res.status(400).json('존재하지 않는 업체입니다.');
        }
      });
  });

  //거래처 추가
  app.post('/accounts/add', (req, res) => {
    const data = req.body; // array of account object

    const isNameEmpty = data.map(account => !!account.name).includes(false);

    if (isNameEmpty) {
      res.status(400).json('업체명을 입력해야 합니다.');
    } else {
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

    if (!data.name) {
      res.status(400).json('업체명을 입력해야 합니다.');
    } else {
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
          res.json(`${response} 개 업체가 정상적으로 삭제되었습니다.`)
        )
        .catch(error => res.status(400).json('error deleting accounts'));
    } else {
      res.status(400).json('삭제할 업체 정보가 없습니다.');
    }
  });
};
