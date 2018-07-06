const db = require('../database');
const passport = require('passport');
const bcrypt = require('bcrypt-nodejs');
const LocalStrategy = require('passport-local').Strategy;

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((userId, done) => {
  db.select('*')
    .from('users')
    .where('id', '=', userId)
    .then(user => done(null, user[0]));
});

passport.use(
  'local',
  new LocalStrategy((username, password, done) => {
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
              done(null, user[0]);
            })
            .catch(error =>
              done(null, false, { message: '사용자를 찾을 수 없습니다.' })
            );
        } else {
          done(null, false, { message: '아이디와 비밀번호를 확인하세요.' });
        }
      })
      .catch(error =>
        done(null, false, { message: '아이디와 비밀번호를 확인하세요.' })
      );
  })
);
