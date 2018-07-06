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
              table.timestamp('order_modified_at');
              table.boolean('is_order_modified').defaultTo(false);
              table.integer('account_id').notNullable();
              table.integer('product_id').notNullable();
              table.integer('order_quantity').notNullable();
              table.float('order_quantity_weight').notNullable();
              table.string('plate_status'); // 신규, 수정, 확인
              table.boolean('is_plate_ready').defaultTo(true);
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

    // 품목 정보 확인
    db('products')
      .where('id', '=', data.product_id)
      .then(products => {
        if (products.length === 0) {
          return res.status(400).json('존재하지 않는 품목입니다.');
        } else {
          console.log('품목정보 확인 완료::: ', products[0]);
          const product = products[0];
          // 주문 중량 계산
          const calculateWeight = () => {
            return (
              Number(product.product_thick) *
              (Number(product.product_length) + 5) *
              (Number(product.product_width) / 100) *
              0.0184 *
              Number(data.order_quantity)
            );
          };
          // 납기일자 계산
          const getDeliverBy = () => {
            let leadtime = 7;
            if (product.is_print) leadtime = 10;
            return moment(data.ordered_at)
              .add(leadtime, 'days')
              .format('YYYY-MM-DD');
          };

          // 주문일, 납기일, 업체ID, 주문중량
          data.ordered_at = data.ordered_at || moment().format('YYYY-MM-DD');
          data.deliver_by = data.deliver_by || getDeliverBy();
          data.account_id = data.account_id || product.account_id;
          data.order_quantity_weight = calculateWeight();

          // 인쇄품목 동판상태 비어있을 경우 = '확인' (default)
          if (product.is_print && !data.plate_status) {
            data.plate_status = '확인';
          }

          // 동판준비상태
          // 인쇄일때  && 동판상태 === 확인 = true
          // 무지일때 = true
          data.is_plate_ready =
            product.is_print && data.plate_status === '확인';
          if (product.is_print === false) data.is_plate_ready = true;

          return data;
        }
      })
      .then(orderData => {
        /*--------------------------------------------
        1. 주문번호 생성
        2. 주문 등록
        --------------------------------------------*/
        db.transaction(trx => {
          // 1. 주문번호 생성
          trx('orders_id_seq')
            .where('id', '=', moment(orderData.ordered_at).format('YYYY-MM'))
            .then(orderSeq => {
              if (orderSeq.length) {
                return trx('orders_id_seq')
                  .where('id', '=', orderSeq[0].id)
                  .increment('seq', 1)
                  .returning('*')
                  .then(updatedOrderSeq => {
                    const sequence = ('00' + updatedOrderSeq[0].seq).slice(-3);
                    return `${updatedOrderSeq[0].id}-${sequence}`;
                  });
              } else {
                return trx
                  .insert({ id: moment(data.ordered_at).format('YYYY-MM') })
                  .into('orders_id_seq')
                  .returning('*')
                  .then(newOrderSeq => {
                    const sequence = ('00' + newOrderSeq[0].seq).slice(-3);
                    return `${newOrderSeq[0].id}-${sequence}`;
                  });
              }
            })
            .then(orderId => {
              console.log('주문번호 생성 완료::: ', orderId);
              data.id = orderId;
              return data;
            })
            .then(orderToAdd => {
              console.log('주문등록 정보 가공완료::: ', orderToAdd);
              // 2. 주문 등록
              return trx
                .insert(orderToAdd)
                .into('orders')
                .returning('*')
                .then(orders => {
                  console.log('주문등록 완료::: ', orders[0]);
                  return res.json(orders[0]);
                })
                .then(trx.commit)
                .catch(trx.rollback);
            });
        });
      })
      .catch(error => res.status(400).json('error placing an order'));
  });

  /* TODO */

  // 주문 정보 수정
  app.put('/orders/:id', (req, res) => {
    const { id } = req.params;
    const data = req.body; // object containing product info
    console.log(data);

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
        console.log('주문정보 가져오기 완료::: ', response[0]);
        const { product_id } = response[0];

        // 수정내용 중 동판상태 or 주문수량이 있을 경우
        if (data.plate_status || data.order_quantity) {
          return db('products')
            .select('product_thick', 'product_length', 'product_width', 'is_print')
            .where('id', '=', product_id)
            .then(productInfo => {
              const {
                product_thick,
                product_length,
                product_width,
                is_print
              } = productInfo[0];

              // 동판준비상태 작성
              if (data.plate_status) {
                data.is_plate_ready =
                  is_print && data.plate_status === '확인';
                if (is_print === false) data.is_plate_ready = true;
              }

              // 중량계산
              if (data.order_quantity) {
                data.order_quantity_weight =
                  Number(product_thick) *
                  (Number(product_length) + 5) *
                  (Number(product_width) / 100) *
                  0.0184 *
                  Number(data.order_quantity);
              }

              return data;
            });
        } else {
          return data;
        }
      })
      .then(orderToUpdate => {
        console.log('수정 주문정보 작성 완료::: ', orderToUpdate);
        orderToUpdate.is_order_modified = true;
        orderToUpdate.order_modified_at = moment().format('YYYY-MM-DD');
        /*--------------------------------------------
         주문정보 수정
        --------------------------------------------*/
        db('orders')
          .where('id', '=', id)
          .update(orderToUpdate)
          .returning('*')
          .then(orders => {
            console.log('주문정보 수정 완료::: ', orders[0]);
            return res.json(orders[0]);
          });
      })
      .catch(error => res.status(400).json('error updating an order'));
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
