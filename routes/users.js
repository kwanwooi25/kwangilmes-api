const db = require('../database');
const bcrypt = require('bcrypt-nodejs');
const requireLogin = require('../middlewares/requireLogin');
const { canReadUsers, canWriteUsers } = require('../middlewares/requirePermission');
const { onRequestSuccess, onRequestFail } = require('../utils');

const PERMISSIONS = [
	{
		id: 1,
		permission_name: 'admin',
		can_read_accounts: true,
		can_write_accounts: true,
		can_read_products: true,
		can_write_products: true,
		can_read_plates: true,
		can_write_plates: true,
		can_read_orders: true,
		can_write_orders: true,
		can_read_users: true,
		can_write_users: true,
		can_read_permission: true,
		can_write_permission: true
	},
	{
		id: 2,
		permission_name: 'manager',
		can_read_accounts: true,
		can_write_accounts: true,
		can_read_products: true,
		can_write_products: true,
		can_read_plates: true,
		can_write_plates: true,
		can_read_orders: true,
		can_write_orders: true,
		can_read_users: true,
		can_write_users: false,
		can_read_permission: false,
		can_write_permission: false
	},
	{
		id: 3,
		permission_name: 'staff',
		can_read_accounts: true,
		can_write_accounts: false,
		can_read_products: true,
		can_write_products: false,
		can_read_plates: true,
		can_write_plates: false,
		can_read_orders: true,
		can_write_orders: false,
		can_read_users: false,
		can_write_users: false,
		can_read_permission: false,
		can_write_permission: false
	}
];

module.exports = (app) => {
	/*==============================================
  ROUTES
  ------------------------------------------------
  GET     /users                     전체 사용자 정보
  GET     /users/:username           선택 사용자 정보
  PUT     /users/:username           사용자 정보 수정
  PUT     /users/password/:username  사용자 비밀번호 수정
  DELETE  /users/:username           사용자 삭제
  POST    /register                  사용자 등록
  ================================================*/

	// Create table if table does not exist
	db.schema.hasTable('users').then((exists) => {
		// if (exists)
		//   db.schema.dropTable('users').then(() => {
		//     db.schema.dropTable('login').then(() => {
		//       db.schema.dropTable('permission').then(console.log);
		//     });
		//   });
		if (!exists) {
			db.transaction((trx) => {
				trx.schema
					.createTable('users', (table) => {
						table.increments('id').primary();
						table.integer('permission_id').defaultTo(3);
						table.string('username').unique().notNullable();
						table.string('display_name').notNullable();
						table.string('user_phone');
						table.string('user_department');
						table.string('user_position');
						table.string('user_memo');
					})
					.then(() => {
						console.log("TABLE CREATED: 'users'");
						return trx.schema
							.createTable('login', (table) => {
								table.string('username').primary().notNullable();
								table.string('password').notNullable();
							})
							.then(() => {
								console.log("TABLE CREATED: 'login'");
								return trx.schema
									.createTable('permission', (table) => {
										table.integer('id').primary().notNullable();
										table.string('permission_name').notNullable();
										table.boolean('can_read_accounts').defaultTo(false);
										table.boolean('can_write_accounts').defaultTo(false);
										table.boolean('can_read_products').defaultTo(false);
										table.boolean('can_write_products').defaultTo(false);
										table.boolean('can_read_plates').defaultTo(false);
										table.boolean('can_write_plates').defaultTo(false);
										table.boolean('can_read_orders').defaultTo(false);
										table.boolean('can_write_orders').defaultTo(false);
										table.boolean('can_read_users').defaultTo(false);
										table.boolean('can_write_users').defaultTo(false);
										table.boolean('can_read_permission').defaultTo(false);
										table.boolean('can_write_permission').defaultTo(false);
									})
									.then(() => {
										console.log("TABLE CREATED: 'permission'");
										return trx
											.insert({
												username: 'admin',
												display_name: '관리자',
												permission_id: 1
											})
											.into('users')
											.returning('*')
											.then((results) => {
												console.log('admin added in USERS TABLE ::: ', results[0]);
												const { username } = results[0];
												const hash = bcrypt.hashSync('admin');
												return trx
													.insert({
														username,
														password: hash
													})
													.into('login')
													.returning('*')
													.then((results) => {
														console.log('admin added in LOGIN TABLE ::: ', results[0]);
														return trx
															.insert(PERMISSIONS)
															.into('permission')
															.returning('*')
															.then((results) => {
																console.log('permissions added ::: ', results);
															});
													});
											});
									});
							});
					})
					.then(trx.commit)
					.then(trx.rollback)
					.catch(console.log);
			});
		}
	});

	/*-----------------------------
    전체 사용자 조회
  -----------------------------*/
	app.get('/users', requireLogin, canReadUsers, (req, res) => {
		db
			.select('*')
			.from('users')
			.then((users) => res.json(onRequestSuccess(users)))
			.catch((error) => res.status(400).json(onRequestFail('error fetching users')));
	});

	/*-----------------------------
    선택 사용자 정보 가져오기
  -----------------------------*/
	app.get('/users/:username', requireLogin, canReadUsers, (req, res) => {
		const { username } = req.params;
		db
			.select('*')
			.from('users')
			.where('username', '=', username)
			.then((user) => res.json(onRequestSuccess(user[0])))
			.catch((error) => res.status(400).json(onRequestFail('error fetching the user')));
	});

	/*-----------------------------
    새로운 사용자 등록
  -----------------------------*/
	app.post('/register', requireLogin, canWriteUsers, (req, res) => {
		const user = req.body;
		const hash = bcrypt.hashSync(user.password);
		delete user.password;

		db
			.select('username')
			.from('users')
			.where('username', '=', user.username)
			.then((users) => {
				if (users.length) {
					res.status(400).json('이미 존재하는 아이디입니다.');
					return false;
				}
				return true;
			})
			.then((isUsernameValid) => {
				if (isUsernameValid) {
					db.transaction((trx) => {
						trx
							.insert(user)
							.into('users')
							.returning('*')
							.then((user) => {
								return trx
									.insert({
										username: user[0].username,
										password: hash
									})
									.into('login')
									.returning('*')
									.then(() => res.json(onRequestSuccess(user[0])));
							})
							.then(trx.commit)
							.catch(trx.rollback);
					});
				}
			})
			.catch((error) => res.status(400).json(onRequestFail('error registering a user')));
	});

	/*-----------------------------
    사용자 정보 수정
  -----------------------------*/
	app.put('/users/:username', requireLogin, canReadUsers, (req, res) => {
		const { username } = req.params;
		const data = req.body;
		if (data.display_name === '') delete data.display_name;

		db('users')
			.where('username', '=', username)
			.update(data)
			.returning('*')
			.then((user) => res.json(onRequestSuccess(user[0])))
			.catch((error) => res.status(400).json(onRequestFail('error updating a user')));
	});

	/*-----------------------------
    사용자 비밀번호 수정
  -----------------------------*/
	app.put('/users/password/:username', requireLogin, canReadUsers, (req, res) => {
		const { username } = req.params;
		const data = req.body;
		const loginData = {};
		if (data.password === '') {
			return res.status(400).json('password is empty');
		} else {
			loginData.password = bcrypt.hashSync(data.password);
		}

		db('login')
			.where('username', '=', username)
			.update(loginData)
			.returning('*')
			.then((result) => res.json(onRequestSuccess('비밀번호 변경 완료')))
			.catch((error) => res.status(400).json(onRequestFail('error updating password')));
	});

	/*-----------------------------
    사용자 삭제
  -----------------------------*/
	app.delete('/users/:username', requireLogin, canReadUsers, (req, res) => {
		const { username } = req.params;
		if (username === 'admin') return res.status(400).json('admin 계정은 삭제할 수 없습니다.');

		db
			.transaction((trx) => {
				trx('users')
					.where('username', '=', username)
					.del()
					.then(() => {
						return trx('login')
							.where('username', '=', username)
							.del()
							.then((result) => res.json(onRequestSuccess(`사용자 (${username}) 삭제 완료`)))
							.catch((error) => res.status(400).json(onRequestFail('unable to find user')));
					})
					.then(trx.commit)
					.catch(trx.rollback);
			})
			.catch((error) => res.status(400).json(onRequestFail('error removing user')));
	});
};
