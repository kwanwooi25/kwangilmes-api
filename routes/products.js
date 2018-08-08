const db = require('../database');
const requireLogin = require('../middlewares/requireLogin');
const { canReadProducts, canWriteProducts } = require('../middlewares/requirePermission');
const { onRequestSuccess, onRequestFail } = require('../utils');

const REQUIRED_PROPS = [
	'product_name',
	'account_id',
	'product_thick',
	'product_length',
	'product_width',
	'ext_color'
];
const { SAMPLE_PRODUCTS } = require('../fixture');

const joinedTable = db.raw(
	'select products.*, accounts.account_name, accounts.phone, accounts.fax, accounts.email, accounts.email_tax, accounts.address, accounts.reg_no, accounts.ceo_name, accounts.ceo_phone, accounts.ceo_email, accounts.manager_name, accounts.manager_phone, accounts.manager_email, accounts.account_memo from products left join accounts on accounts.id = products.account_id order by accounts.account_name, products.product_name, products.product_thick, products.product_length, products.product_width'
);

module.exports = (app) => {
	/*=======================================
  ROUTES
  -----------------------------------------
  POST    /products          전체 품목 조회
  POST    /products-for-xls  전체 품목 조회
  GET     /products          인쇄 품목 조회
  GET     /products/:id      단일 품목 조회
  POST    /products/add      품목 추가
  PUT     /products/:id      품목 정보 수정
  DELETE  /products          품목 삭제
  =========================================*/

	// Create table if table does not exist
	db.schema.hasTable('products').then((exists) => {
		// if (exists) db.schema.dropTable('products').then(console.log);
		if (!exists) {
			db.schema
				.createTable('products', (table) => {
					table.increments('id').primary();
					table.integer('account_id').notNullable();
					table.string('product_name').notNullable();
					table.string('product_thick').notNullable();
					table.string('product_length').notNullable();
					table.string('product_width').notNullable();
					table.boolean('is_print').defaultTo(false);
					table.string('ext_color').notNullable();
					table.boolean('ext_antistatic').defaultTo(false);
					table.string('ext_pretreat');
					table.text('ext_memo');
					table.integer('print_front_color_count');
					table.string('print_front_color');
					table.string('print_front_position');
					table.integer('print_back_color_count');
					table.string('print_back_color');
					table.string('print_back_position');
					table.string('print_image_url');
					table.text('print_memo');
					table.string('cut_position');
					table.boolean('cut_ultrasonic').defaultTo(false);
					table.boolean('cut_powder_pack').defaultTo(false);
					table.boolean('cut_is_punched').defaultTo(false);
					table.integer('cut_punch_count');
					table.string('cut_punch_size');
					table.string('cut_punch_position');
					table.text('cut_memo');
					table.string('pack_material');
					table.integer('pack_unit');
					table.boolean('pack_deliver_all').defaultTo(false);
					table.text('pack_memo');
					table.float('unit_price');
					table.text('old_history');
					table.date('product_created_at');
					table.date('product_last_modified_at');
					table.text('product_memo');
				})
				.then((result) => {
					console.log("TABLE CREATED: 'products'");
					db.insert(SAMPLE_PRODUCTS).into('products').then((result) => {
						console.log('SAMPLE_PRODUCTS added');
					});
				});
		}
	});

	/*-----------------------------
    전체 품목 조회
  -----------------------------*/
	app.post('/products', requireLogin, canReadProducts, (req, res) => {
		const {
			limit = 10,
			offset = 0,
			account_name = '',
			product_name = '',
			product_thick = '',
			product_length = '',
			product_width = '',
			ext_color = '',
			print_color = ''
		} = req.body;

		db
			.with('joinedTable', joinedTable)
			.select('*')
			.from('joinedTable')
			.where('account_name', 'ilike', `%${account_name}%`)
			.andWhere('product_name', 'ilike', `%${product_name}%`)
			.andWhere('product_thick', 'ilike', `%${product_thick}%`)
			.andWhere('product_length', 'ilike', `%${product_length}%`)
			.andWhere('product_width', 'ilike', `%${product_width}%`)
			.andWhere('ext_color', 'ilike', `%${ext_color}%`)
			.andWhere(function() {
				this.where('print_front_color', 'ilike', `%${print_color}%`).orWhere(
					'print_back_color',
					'ilike',
					`%${print_color}%`
				);
			})
			.then((products) => {
				if (products.length) {
					const ids = products.map((product) => product.id);
					const data = {
						count: products.length,
						ids,
						products: products.slice(offset, offset + limit)
					};
					res.json(onRequestSuccess(data));
				} else {
					const data = { count: 0, ids: [], products: [] };
					res.json(onRequestSuccess(data));
				}
			})
			.catch((error) => res.status(400).json(onRequestFail('error fetching products')));
	});

	/*-----------------------------
    전체 품목 조회 (엑셀추출용)
  -----------------------------*/
	app.post('/products-for-xls', requireLogin, canReadProducts, (req, res) => {
		const {
			account_name = '',
			product_name = '',
			product_thick = '',
			product_length = '',
			product_width = '',
			ext_color = '',
			print_color = ''
		} = req.body;

		db
			.with('joinedTable', joinedTable)
			.select('*')
			.from('joinedTable')
			.where('account_name', 'ilike', `%${account_name}%`)
			.andWhere('product_name', 'ilike', `%${product_name}%`)
			.andWhere('product_thick', 'ilike', `%${product_thick}%`)
			.andWhere('product_length', 'ilike', `%${product_length}%`)
			.andWhere('product_width', 'ilike', `%${product_width}%`)
			.andWhere('ext_color', 'ilike', `%${ext_color}%`)
			.andWhere(function() {
				this.where('print_front_color', 'ilike', `%${print_color}%`).orWhere(
					'print_back_color',
					'ilike',
					`%${print_color}%`
				);
			})
			.then((products) =>
				res.json(
					onRequestSuccess({
						count: products.length,
						products
					})
				)
			)
			.catch((error) => res.status(400).json(onRequestFail('error fetching products')));
	});

	/*-----------------------------
    인쇄 품목 조회
  -----------------------------*/
	app.get('/products', requireLogin, canReadProducts, (req, res) => {
		const { product_name } = req.query;

		db
			.select('id', 'product_name', 'product_thick', 'product_length', 'product_width')
			.from('products')
			.where('is_print', '=', true)
			.andWhere('product_name', 'ilike', `%${product_name}%`)
			.orderBy('product_name', 'asc')
			.then((products) => {
				if (products.length) {
					const ids = products.map((product) => product.id);
					const data = {
						count: products.length,
						ids,
						products
					};
					res.json(onRequestSuccess(data));
				} else {
					const data = { count: 0, ids: [], products: [] };
					res.json(onRequestSuccess(data));
				}
			})
			.catch((error) => res.status(400).json(onRequestFail('error fetching products')));
	});

	/*-----------------------------
    단일 품목 조회
  -----------------------------*/
	app.get('/products/:id', requireLogin, canReadProducts, (req, res) => {
		const { id } = req.params;

		db
			.select('*')
			.from('products')
			.where('id', '=', id)
			.then((product) => {
				if (product.length) {
					res.json(onRequestSuccess(product[0]));
				} else {
					res.status(400).json(onRequestFail('존재하지 않는 품목입니다.'));
				}
			})
			.catch((error) => res.status(400).json(onRequestFail('error fetching a product')));
	});

	/*-----------------------------
    품목 추가 (single, multi)
  -----------------------------*/
	app.post('/products/add', requireLogin, canWriteProducts, (req, res) => {
		let data = req.body; // array of product object

		Promise.all(
			data.map((product) => {
				if (product.account_name) {
					return db('accounts')
						.select('id')
						.where('account_name', '=', product.account_name)
						.then((response) => {
							product.account_id = response[0].id;
							delete product.account_name;
							return product;
						});
				} else {
					return product;
				}
			})
		).then((dataToAdd) => {
			// check required field
			const isRequiredEmpty = dataToAdd
				.map((product) => {
					return REQUIRED_PROPS.map((prop) => !!product[prop]).includes(false);
				})
				.includes(true);

			if (isRequiredEmpty) return res.status(400).json(onRequestFail('필수항목을 입력해야 합니다.'));

			// check if account id of product exists
			Promise.all(
				dataToAdd.map((product) =>
					db('accounts')
						.select('account_name')
						.where('id', '=', product.account_id)
						.then((response) => !!response.length)
				)
			)
				.then((results) => results.includes(false))
				.then((isAccountIdInvalid) => {
					if (isAccountIdInvalid) {
						res.status(400).json(onRequestFail('존재하지 않는 업체입니다.'));
					} else {
						// 최초 생성일자 입력
						dataToAdd.forEach((product) => {
							product.product_created_at = new Date();
						});

						db
							.insert(dataToAdd)
							.into('products')
							.returning('*')
							.then((products) => res.json(onRequestSuccess(products)))
							.catch((error) => res.status(400).json(onRequestFail('error adding products')));
					}
				});
		});
	});

	/*-----------------------------
    품목 정보 수정
  -----------------------------*/
	app.put('/products/:id', requireLogin, canWriteProducts, (req, res) => {
		const { id } = req.params;
		const data = req.body; // object containing product info

		// remove property of incoming data if value is empty
		REQUIRED_PROPS.forEach((prop) => {
			if (data[prop] === '') delete data[prop];
		});

		if (!Object.keys(data).length) return res.status(400).json(onRequestFail('수정할 항목이 없습니다.'));

		db('products')
			.select('*')
			.where('id', '=', id)
			.then((response) => {
				db('accounts')
					.select('account_name')
					.where('id', '=', response[0].account_id)
					.then((response) => !!response.length)
					.then((isAccountExist) => {
						if (isAccountExist) {
							// 수정일자 입력
							data.product_last_modified_at = new Date();
							db('products')
								.where('id', '=', id)
								.update(data)
								.returning('*')
								.then((product) => res.json(onRequestSuccess(product)))
								.catch((error) => res.status(400).json(onRequestFail('error updating a product')));
						} else {
							res.status(400).json(onRequestFail('존재하지 않는 업체명입니다.'));
						}
					});
			})
			.catch((error) => res.status(400).json(onRequestFail('품목이 존재하지 않습니다.')));
	});

	/*-----------------------------
    품목 삭제 (single, multi)
  -----------------------------*/
	app.delete('/products', requireLogin, canWriteProducts, (req, res) => {
		const ids = req.body; // array of ids

		if (ids.length) {
			db('products')
				.whereIn('id', ids)
				.del()
				.then((response) => res.json(onRequestSuccess(`${response}개 품목이 정상적으로 삭제되었습니다.`)))
				.catch((error) => res.status(400).json(onRequestFail('error deleting products')));
		} else {
			res.status(400).json(onRequestFail('삭제할 품목 정보가 없습니다.'));
		}
	});
};
