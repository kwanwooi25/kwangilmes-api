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
  POST    /accounts         전체 거래처 조회
  POST    /accounts-for-xls 전체 거래처 조회 (엑셀추출용)
  GET     /accounts/:id     단일 거래처 조회
  GET     /accounts         거래처명 조회
  POST    /accounts/add     거래처 추가
  PUT     /accounts/:id     거래처 정보 수정
  DELETE  /accounts         거래처 삭제
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
          // db.insert(SAMPLE_ACCOUNTS).into('accounts').then((result) => {
          // 	console.log('SAMPLE_ACCOUNTS added');
          // });
        });
    }
  });

  /*-----------------------------
    전체 거래처 조회
  -----------------------------*/
  app.post('/accounts', requireLogin, canReadAccounts, (req, res) => {
    const { account_name = '', limit = 10, offset = 0 } = req.body;

    db('accounts')
      .orderBy('account_name', 'asc')
      .select('*')
      .where('account_name', 'ilike', `%${account_name}%`)
      .then(accounts => {
        const ids = accounts.map(account => account.id);
        const data = {
          count: accounts.length,
          ids,
          accounts: accounts.slice(offset, offset + limit)
        };
        res.json(onRequestSuccess(data));
      })
      .catch(error =>
        res.status(400).json(onRequestFail('error fetching accounts'))
      );
  });

  /*-----------------------------
    전체 거래처 조회 (엑셀추출용)
  -----------------------------*/
  app.post('/accounts-for-xls', requireLogin, canReadAccounts, (req, res) => {
    const { account_name = '' } = req.body;

    db('accounts')
      .orderBy('account_name', 'asc')
      .select('*')
      .where('account_name', 'ilike', `%${account_name}%`)
      .then(accounts =>
        res.json(
          onRequestSuccess({
            count: accounts.length,
            accounts
          })
        )
      )
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
    거래처명 조회
  -----------------------------*/
  app.get('/accounts', requireLogin, (req, res) => {
    db.select('id', 'account_name')
      .from('accounts')
      .orderBy('account_name', 'asc')
      .then(accounts => res.json(onRequestSuccess(accounts)))
      .catch(error =>
        res.status(400).json(onRequestFail('error fetching an account'))
      );
  });

  /*-----------------------------
    거래처 추가 (single, multi)
  -----------------------------*/
  app.post('/accounts/add', requireLogin, canWriteAccounts, (req, res) => {
    const data = req.body; // array of account object

    let isNameNotEmpty = true;
    let isNameValid = true;

    Promise.all(
      data.map(account => {
        // 업체명 비어있지 않은지 확인
        if (!account.account_name) {
          isNameNotEmpty = isNameNotEmpty && false;
        }

        // 업체명 기존에 존재하는지 확인
        return db
          .select('id')
          .from('accounts')
          .where('account_name', '=', account.account_name)
          .then(result => {
            isNameValid = isNameValid && result.length === 0;
          });
      })
    ).then(() => {
      if (!isNameNotEmpty) {
        res.status(400).json(onRequestFail('업체명을 입력해야 합니다.'));
      } else if (!isNameValid) {
        res.status(400).json(onRequestFail('이미 존재하는 업체명입니다.'));
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
