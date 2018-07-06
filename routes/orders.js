const moment = require('moment');
const { SAMPLE_ORDERS } = require('../fixture');
const REQUIRED_PROPS = ['product_id', 'order_quantity'];

module.exports = (app, db) => {
  /*=======================================
  ROUTES
  -----------------------------------------
  POST    /orders      전체 주문 조회
  GET     /orders/:id  단일 주문 조회
  POST    /orders/add  주문 추가
  PUT     /orders/:id  주문 정보 수정
  DELETE  /orders      주문 삭제
  =========================================*/

  // Create table if table does not exist
  db.schema.hasTable('orders').then(ordersTableExists => {
    // if (ordersTableExists) db.schema.dropTable('orders').then(() => {
    //   db.schema.dropTable('orders_id_seq').then(console.log)
    // });
    if (!ordersTableExists) {
      db.schema
        .createTable('orders_id_seq', table => {
          table.string('id').primary();
          table.integer('seq').defaultTo(1);
        })
        .then(() => {
          console.log("TABLE CREATED: 'orders_id_seq'");
          db.insert({ id: '2018-05', seq: 125 })
            .into('orders_id_seq')
            .then(result => {
              console.log('orders_id_seq updated');
            });

          db.schema
            .createTable('orders', table => {
              table
                .string('id')
                .primary()
                .unique();
              table.timestamp('ordered_at').notNullable();
              table.integer('account_id').notNullable();
              table.integer('product_id').notNullable();
              table.integer('order_quantity').notNullable();
              table.float('order_quantity_weight').notNullable();
              table.string('plate_status'); // 신규, 수정, 확인
              table.string('order_status').defaultTo('압출중'); // 압출중, 인쇄중, 가공중, 완료
              table.timestamp('deliver_by').notNullable();
              table.boolean('is_delivery_strict').defaultTo(false);
              table.boolean('is_urgent').defaultTo(false);
              table.text('order_memo_work');
              table.text('order_memo_delivery');
              table.boolean('is_completed').defaultTo(false);
              table.timestamp('completed_at');
              table.integer('completed_quantity');
              table.boolean('is_delivered').defaultTo(false);
              table.timestamp('delivered_at');
            })
            .then(result => {
              console.log("TABLE CREATED: 'orders'");
              db.insert(SAMPLE_ORDERS)
                .into('orders')
                .then(result => {
                  console.log('SAMPLE_ORDERS added');
                });
            });
        });
    }
  });

  // 전체 주문 조회
  app.post('/orders', (req, res) => {
    const {
      limit = 10,
      offset = 0,
      date_from = moment()
        .subtract(14, 'days')
        .format('YYYY-MM-DD'),
      date_to = moment().format('YYYY-MM-DD'),
      account_name = '',
      product_name = '',
      product_thick = '',
      product_length = '',
      product_width = '',
      show_completed = false
    } = req.body;

    db('accounts')
      .join('products', 'accounts.id', '=', 'products.account_id')
      .join('orders', 'products.id', '=', 'orders.product_id')
      .orderBy('orders.id')
      .whereBetween('ordered_at', [date_from, date_to])
      .andWhere('account_name', 'like', `%${account_name}%`)
      .andWhere('product_name', 'like', `%${product_name}%`)
      .andWhere('product_thick', 'like', `%${product_thick}%`)
      .andWhere('product_length', 'like', `%${product_length}%`)
      .andWhere('product_width', 'like', `%${product_width}%`)
      .andWhere(function() {
        if (show_completed === false) this.where('is_completed', false);
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
      .catch(error => res.status(400).json(error));
  });

  // 단일 주문 조회
  app.get('/orders/:id', (req, res) => {
    const { id } = req.params;

    db.select('*')
      .from('orders')
      .where('id', '=', id)
      .then(order => {
        if (order.length) {
          res.json(order[0]);
        } else {
          res.status(400).json('존재하지 않는 주문입니다.');
        }
      })
      .catch(error => res.status(400).json('error fetching an order'));
  });

  //주문 추가
  app.post('/orders/add', (req, res) => {
    const data = req.body; // order object

    // check required field
    const isRequiredEmpty = REQUIRED_PROPS.map(prop => !!data[prop]).includes(
      false
    );

    if (isRequiredEmpty)
      return res.status(400).json('필수항목을 입력해야 합니다.');

    // check if product id exists
    db('products')
      .where('id', '=', data.product_id)
      .then(products => {
        if (products.length === 0) {
          res.status(400).json('존재하지 않는 품목입니다.');
        } else {
          const product = products[0];
          // 주문수량 => 중량 계산
          const calculateWeight = () => {
            return (
              Number(product.product_thick) *
              (Number(product.product_length) + 5) *
              (Number(product.product_width) / 100) *
              0.0184 *
              Number(data.order_quantity)
            );
          };

          data.ordered_at = data.ordered_at || moment().format('YYYY-MM-DD');
          data.deliver_by = data.deliver_by || moment().add(10, 'days').format('YYYY-MM-DD');
          data.account_id = product.account_id;
          data.order_quantity_weight = calculateWeight();

          db('orders_id_seq')
            .where('id', '=', moment(data.ordered_at).format('YYYY-MM'))
            // 주문번호 생성
            .then(orderSeq => {
              if (orderSeq.length) {
                const sequence = ('00' + orderSeq[0].seq).slice(-3);
                return `${orderSeq[0].id}-${sequence}`;
                db('orders_id_seq')
                  .where('id', '=', orderSeq[0].id)
                  .increment('seq', 1);
              } else {
                db.insert({ id: moment(data.ordered_at).format('YYYY-MM') })
                  .into('orders_id_seq')
                  .returning('*')
                  .then(newOrderSeq => {
                    const sequence = ('00' + newOrderSeq[0].seq).slice(-3);
                    return `${newOrderSeq[0].id}-${sequence}`;
                  });
              }
            })
            .then(orderId => data.id = orderId);
        }
        return data;
      })
      .then(orderToAdd => {
        console.log(orderToAdd);
      });

    return true;

          // db.insert(data)
          //   .into('orders')
          //   .returning('*')
          //   .then(orders => res.json(orders))
          //   .catch(error => res.status(400).json(error));
  });

  // 주문 정보 수정
  app.put('/orders/:id', (req, res) => {
    const { id } = req.params;
    const data = req.body; // object containing product info

    // remove property of incoming data if value is empty
    REQUIRED_PROPS.forEach(prop => {
      if (data[prop] === '') delete data[prop];
    });

    if (!Object.keys(data).length)
      return res.status(400).json('수정할 항목이 없습니다.');

    db('orders')
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
              db('orders')
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
      .catch(error => res.status(400).json('주문이 존재하지 않습니다.'));
  });

  // 주문 삭제
  app.delete('/orders', (req, res) => {
    const ids = req.body; // array of ids

    if (ids.length) {
      db('orders')
        .whereIn('id', ids)
        .del()
        .then(response =>
          res.json(`${response}개 주문이 정상적으로 삭제되었습니다.`)
        )
        .catch(error => res.status(400).json('error deleting orders'));
    } else {
      res.status(400).json('삭제할 주문 정보가 없습니다.');
    }
  });
};
