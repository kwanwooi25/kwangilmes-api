const REQUIRED_PROPS = [
  'product_name',
  'account_id',
  'product_thick',
  'product_length',
  'product_width',
  'ext_color'
];
const { SAMPLE_PRODUCTS } = require('../fixture');

module.exports = (app, db) => {
  /*=======================================
  ROUTES
  -----------------------------------------
  POST    /products      전체 품목 조회
  GET     /products/:id  단일 품목 조회
  POST    /products/add  품목 추가
  PUT     /products/:id  품목 정보 수정
  DELETE  /products      품목 삭제
  =========================================*/

  // Create table if table does not exist
  db.schema.hasTable('products').then(exists => {
    // if (exists) db.schema.dropTable('products').then(console.log);
    if (!exists) {
      db.schema
        .createTable('products', table => {
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
          table.json('order_history');
          table.date('product_created_at');
          table.date('product_last_modified_at');
          table.text('product_memo');
        })
        .then(result => {
          console.log("TABLE CREATED: 'products'");
          db.insert(SAMPLE_PRODUCTS)
            .into('products')
            .then(result => {
              console.log('SAMPLE_PRODUCTS added');
            });
        });
    }
  });

  // 전체 품목 조회
  app.post('/products', (req, res) => {
    const { limit = 10, offset = 0 } = req.body;
    const {
      account_name = '',
      product_name = '',
      product_thick = '',
      product_length = '',
      product_width = '',
      ext_color = '',
      print_color = ''
    } = req.body.search;

    db.select('*')
      .from('accounts')
      .join('products', 'accounts.id', 'products.account_id')
      .where('account_name', 'like', `%${account_name}%`)
      .andWhere('product_name', 'like', `%${product_name}%`)
      .andWhere('product_thick', 'like', `%${product_thick}%`)
      .andWhere('product_length', 'like', `%${product_length}%`)
      .andWhere('product_width', 'like', `%${product_width}%`)
      .andWhere('ext_color', 'like', `%${ext_color}%`)
      .andWhere(function() {
        this.where('print_front_color', 'like', `%${print_color}%`)
          .orWhere('print_back_color', 'like', `%${print_color}%`)
      })
      .limit(limit)
      .offset(offset)
      .then(data => {
        if (data.length) {
          res.json(data);
        } else {
          res.status(400).json('표시할 결과가 없습니다.');
        }
      })
      .catch(error => res.status(400).json('error fetching products'));
  });

  // 단일 품목 조회
  app.get('/products/:id', (req, res) => {
    const { id } = req.params;

    db.select('*')
      .from('products')
      .where('id', '=', id)
      .then(product => {
        if (product.length) {
          res.json(product[0]);
        } else {
          res.status(400).json('존재하지 않는 품목입니다.');
        }
      })
      .catch(error => res.status(400).json('error fetching a product'));
  });

  //품목 추가
  app.post('/products/add', (req, res) => {
    const data = req.body; // array of account object

    // check required field
    const isRequiredEmpty = data
      .map(product => {
        return REQUIRED_PROPS.map(prop => !!product[prop]).includes(false);
      })
      .includes(true);

    if (isRequiredEmpty)
      return res.status(400).json('필수항목을 입력해야 합니다.');

    // check if account id of product exists
    Promise.all(
      data.map(product =>
        db('accounts')
          .select('account_name')
          .where('id', '=', product.account_id)
          .then(response => !!response.length)
      )
    )
      .then(results => results.includes(false))
      .then(isAccountIdInvalid => {
        if (isAccountIdInvalid) {
          res.status(400).json('존재하지 않는 업체입니다.');
        } else {
          // 최초 생성일자 입력
          data.forEach(product => {
            product.product_created_at = new Date();
          });
          db.insert(data)
            .into('products')
            .returning('*')
            .then(products => res.json(products))
            .catch(error => res.status(400).json(error));
        }
      });
  });

  // 품목 정보 수정
  app.put('/products/:id', (req, res) => {
    const { id } = req.params;
    const data = req.body; // object containing product info

    // remove property of incoming data if value is empty
    REQUIRED_PROPS.forEach(prop => {
      if (data[prop] === '') delete data[prop];
    });

    if (!Object.keys(data).length)
      return res.status(400).json('수정할 항목이 없습니다.');

    db('products')
      .select('*')
      .where('id', '=', id)
      .then(response => {
        db('accounts')
          .select('account_name')
          .where('id', '=', response[0].account_id)
          .then(response => !!response.length)
          .then(isAccountExist => {
            if (isAccountExist) {
              // 수정일자 입력
              data.product_last_modified_at = new Date();
              db('products')
                .where('id', '=', id)
                .update(data)
                .returning('*')
                .then(product => res.json(product))
                .catch(error => res.status(400).json(error));
            } else {
              res.status(400).json('존재하지 않는 업체명입니다.');
            }
          });
      })
      .catch(error => res.status(400).json('품목이 존재하지 않습니다.'));
  });

  // 품목 삭제
  app.delete('/products', (req, res) => {
    const ids = req.body; // array of ids

    if (ids.length) {
      db('products')
        .whereIn('id', ids)
        .del()
        .then(response =>
          res.json(`${response}개 품목이 정상적으로 삭제되었습니다.`)
        )
        .catch(error => res.status(400).json('error deleting products'));
    } else {
      res.status(400).json('삭제할 품목 정보가 없습니다.');
    }
  });
};
