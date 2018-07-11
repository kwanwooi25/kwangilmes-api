const db = require('../database');
const requireLogin = require('../middlewares/requireLogin');
const {
  canReadAccounts,
  canWriteAccounts
} = require('../middlewares/requirePermission');
const { onRequestSuccess, onRequestFail } = require('../utils');
const { SAMPLE_ACCOUNTS } = require('../fixture');

module.exports = app => {
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
      db.schema
        .createTable('accounts', table => {
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
        })
        .then(result => {
          console.log("TABLE CREATED: 'accounts'");
          db.insert(SAMPLE_ACCOUNTS)
            .into('accounts')
            .then(result => {
              console.log('SAMPLE_ACCOUNTS added');
            });
        });
    }
  });

  /*-----------------------------
    전체 거래처 조회
  -----------------------------*/
  app.post('/accounts', requireLogin, canReadAccounts, (req, res) => {
    const {
      account_name = '',
      limit = 10,
      offset = 0
    } = req.body;

    db.select('*')
      .from('accounts')
      .where('account_name', 'like', `%${account_name}%`)
      .limit(limit)
      .offset(offset)
      .then(accounts => {
        if (accounts.length) {
          db.select('id')
            .from('accounts')
            .where('account_name', 'like', `%${account_name}%`)
            .then(result => {
              const ids = result.map(({ id }) => id);
              const data = { count: result.length, ids, accounts };
              res.json(onRequestSuccess(data));
            });
        } else {
          const data = { count: 0, accounts: [] }
          res.json(onRequestSuccess(data));
        }
      })
      .catch(error =>
        res.status(400).json(onRequestFail('error fetching accounts'))
      );
  });

  /*-----------------------------
    단일 거래처 조회
  -----------------------------*/
  app.get('/accounts/:id', requireLogin, canReadAccounts, (req, res) => {
    const { id } = req.params;

    db.select('*')
      .from('accounts')
      .where('id', '=', id)
      .then(account => {
        if (account.length) {
          res.json(onRequestSuccess(account[0]));
        } else {
          res.status(400).json(onRequestFail('존재하지 않는 업체입니다.'));
        }
      })
      .catch(error =>
        res.status(400).json(onRequestFail('error fetching an account'))
      );
  });

  /*-----------------------------
    거래처 추가 (single, multi)
  -----------------------------*/
  app.post('/accounts/add', requireLogin, canWriteAccounts, (req, res) => {
    const data = req.body; // array of account object

    const isNameEmpty = data
      .map(account => !!account.account_name)
      .includes(false);

    if (isNameEmpty) {
      res.status(400).json(onRequestFail('업체명을 입력해야 합니다.'));
    } else {
      // 최초 생성일자 입력
      data.forEach(account => {
        account.account_created_at = new Date();
      });
      db.insert(data)
        .into('accounts')
        .returning('*')
        .then(accounts => res.json(onRequestSuccess(accounts)))
        .catch(error =>
          res.status(400).json(onRequestFail('error adding accounts'))
        );
    }
  });

  /*-----------------------------
    거래처 정보 수정
  -----------------------------*/
  app.put('/accounts/:id', requireLogin, canWriteAccounts, (req, res) => {
    const { id } = req.params;
    const data = req.body; // object containing account info

    if (!data.account_name) {
      res.status(400).json(onRequestFail('업체명을 입력해야 합니다.'));
    } else {
      // 수정일자 입력
      data.account_last_modified_at = new Date();
      db('accounts')
        .where('id', '=', id)
        .update(data)
        .returning('*')
        .then(account => res.json(onRequestSuccess(account)))
        .catch(error =>
          res.status(400).json(onRequestFail('error updating account'))
        );
    }
  });

  /*-----------------------------
    거래처 삭제 (single, multi)
  -----------------------------*/
  app.delete('/accounts', requireLogin, canWriteAccounts, (req, res) => {
    const ids = req.body; // array of ids

    if (ids.length) {
      db('accounts')
        .whereIn('id', ids)
        .del()
        .then(response =>
          res.json(
            onRequestSuccess(`${response}개 업체가 정상적으로 삭제되었습니다.`)
          )
        )
        .catch(error =>
          res.status(400).json(onRequestFail('error deleting accounts'))
        );
    } else {
      res.status(400).json(onRequestFail('삭제할 업체 정보가 없습니다.'));
    }
  });
};
