module.exports = (app, db) => {
  /*=======================================
  APIs
  -----------------------------------------
  POST    /products      전체 품목 조회
  GET     /products/:id  단일 품목 조회
  POST    /products/add  품목 추가
  PUT     /products/:id  품목 정보 수정
  DELETE  /products      품목 삭제
  =========================================*/

  // Create table if table does not exist
  db.schema.hasTable('products').then(function(exists) {
    if (!exists) {
      db.schema.createTable('products', function(table) {
        table.increments('id').primary();
        table.string('account_id').notNullable();
        table.string('name').notNullable();
        table.string('thick').notNullable();
        table.string('length').notNullable();
        table.string('width').notNullable();
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
        table.text('memo');
      });
    }
  });

  // 전체 품목 조회
  app.post('/products', (req, res) => {
    const { limit, offset, searchTerm } = req.body;

    if (limit !== undefined && offset !== undefined) {
      db.select('*')
        .from('products')
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

  // 단일 품목 조회
  app.get('/products/:id', (req, res) => {
    const { id } = req.params;

    db.select('*')
      .from('products')
      .where('id', '=', id)
      .then(product => {
        if (product.length) {
          res.json(product);
        } else {
          res.status(400).json('존재하지 않는 품목입니다.');
        }
      });
  });

  //품목 추가
  app.post('/products/add', (req, res) => {
    const data = req.body; // array of account object

    // check if product name is empty
    const isNameEmpty = data.map(product => !!product.name).includes(false);
    if (isNameEmpty) return res.status(400).json('품목명을 입력해야 합니다.');

    // check if account id of product exists
    Promise.all(
      data.map(product =>
        db('accounts')
          .select('name')
          .where('id', '=', product.account_id)
          .then(response => !!response.length)
      )
    )
      .then(results => results.includes(false))
      .then(isAccountIdInvalid => {
        if (isAccountIdInvalid) {
          res.status(400).json('존재하지 않는 업체명입니다.');
        } else {
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
    const data = req.body; // object containing account info

    if (!data.name) {
      res.status(400).json('품목명을 입력해야 합니다.');
    } else if (!data.account_id) {
      res.status(400).json('업체명을 입력해야 합니다.');
    } else if (!data.thick) {
      res.status(400).json('두께를 입력해야 합니다.');
    } else if (!data.length) {
      res.status(400).json('길이를 입력해야 합니다.');
    } else if (!data.width) {
      res.status(400).json('너비를 입력해야 합니다.');
    } else if (!data.ext_color) {
      res.status(400).json('원단색상을 입력해야 합니다.');
    } else {
      db('accounts')
        .select('name')
        .where('id', '=', data.account_id)
        .then(response => !!response.length)
        .then(isAccountExist => {
          if (isAccountExist) {
            db('products')
              .where('id', '=', id)
              .update(data)
              .returning('*')
              .then(product => res.json(product))
              .catch(error => res.status(400).json('error updating product'));
          } else {
            res.status(400).json('존재하지 않는 업체명입니다.');
          }
        });
    }
  });

  // 품목 삭제
  app.delete('/products', (req, res) => {
    const ids = req.body; // array of ids

    if (ids.length) {
      db('products')
        .whereIn('id', ids)
        .del()
        .then(response =>
          res.json(`${response} 개 품목이 정상적으로 삭제되었습니다.`)
        )
        .catch(error => res.status(400).json('error deleting products'));
    } else {
      res.status(400).json('삭제할 품목 정보가 없습니다.');
    }
  });
};
