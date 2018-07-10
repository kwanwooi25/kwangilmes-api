const db = require('../database');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');
const { onRequestSuccess, onRequestFail } = require('../utils');
const { JWT_SECRET } = require('../config/keys');

module.exports = app => {
  /*==============================================
  ROUTES
  ------------------------------------------------
  POST    /login                     사용자 로그인
  GET     /logout                    사용자 로그아웃
  ================================================*/

  /*-----------------------------
    로그인
  -----------------------------*/
  app.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json(onRequestFail('아이디와 비밀번호를 확인하세요.'));
    } else {
      db.select('*')
        .from('login')
        .where('username', '=', username)
        .then(data => {
          const isValid = bcrypt.compareSync(password, data[0].password);
          if (isValid) {
            return db
              .select('*')
              .from('users')
              .where('username', '=', username)
              .then(user => {
                const options = {
                  expiresIn: 6 * 60 * 60 * 24 // expires in 6 hours
                };
                jwt.sign(user[0], JWT_SECRET, options, (error, token) => {
                  if (!error) return res.json(onRequestSuccess(token));
                });
              });
          } else {
            res
              .status(400)
              .json(onRequestFail('아이디와 비밀번호를 확인하세요.'));
          }
        })
        .catch(error =>
          res.status(400).json(onRequestFail('아이디와 비밀번호를 확인하세요.'))
        );
    }
  });

  /*-----------------------------
    로그아웃
  -----------------------------*/
  app.get('/logout', (req, res) => {
    if (req.user) {
      req.logout();
      res.json('로그아웃 되었습니다.');
    } else {
      res.status(400).json('이미 로그아웃 되었습니다.');
    }
  });
};
