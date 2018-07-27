const moment = require('moment');
const db = require('../database');
const requireLogin = require('../middlewares/requireLogin');
const {
  canReadOrders,
  canWriteOrders
} = require('../middlewares/requirePermission');
const { onRequestSuccess, onRequestFail } = require('../utils');

const { SAMPLE_ORDERS } = require('../fixture');
const REQUIRED_PROPS = ['product_id', 'order_quantity'];

const joinedTable = db.raw(
  'select orders.*, accounts.account_name, accounts.phone, accounts.fax, accounts.email, accounts.email_tax, accounts.address, accounts.reg_no, accounts.ceo_name, accounts.ceo_phone, accounts.ceo_email, accounts.manager_name, accounts.manager_phone, accounts.manager_email, accounts.account_memo ,products.product_name, products.product_thick, products.product_length, products.product_width, products.is_print, products.ext_color, products.ext_antistatic, products.ext_pretreat, products.ext_memo, products.print_front_color_count, products.print_front_color, products.print_front_position, products.print_back_color_count, products.print_back_color, products.print_back_position, products.print_image_url, products.print_memo, products.cut_position, products.cut_ultrasonic, products.cut_powder_pack, products.cut_is_punched, products.cut_punch_count, products.cut_punch_size, products.cut_punch_position, products.cut_memo, products.pack_material, products.pack_unit, products.pack_deliver_all, products.pack_memo, products.unit_price, products.old_history, products.product_memo from orders left join accounts on accounts.id = orders.account_id left join products on products.id = orders.product_id order by orders.id'
);

module.exports = app => {
  /*=======================================
  ROUTES
  -----------------------------------------
  POST    /orders                전체 주문 조회
  POST    /orders-by-ids         전체 주문 조회 (ID조회)
  POST    /orders-for-xls        전체 주문 조회 (엑셀추출용)
  GET     /orders-by-product/:id 전체 주문 조회 (품목조회)
  GET     /orders/:id            단일 주문 조회
  POST    /orders/add            주문 추가
  PUT     /orders/:id            주문 정보 수정
  PUT     /orders-complete       작업 완료 처리
  DELETE  /orders                주문 삭제
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

  /*-----------------------------
    전체 주문 조회
  -----------------------------*/
  app.post('/orders', requireLogin, canReadOrders, (req, res) => {
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

    db.with('joinedTable', joinedTable)
      .select('*')
      .from('joinedTable')
      .whereBetween('ordered_at', [date_from, date_to])
      .andWhere('account_name', 'like', `%${account_name}%`)
      .andWhere('product_name', 'like', `%${product_name}%`)
      .andWhere('product_thick', 'like', `%${product_thick}%`)
      .andWhere('product_length', 'like', `%${product_length}%`)
      .andWhere('product_width', 'like', `%${product_width}%`)
      .andWhere(function() {
        if (show_completed === false) this.where('is_completed', false);
      })
      .then(orders => {
        const ids = orders.map(order => order.id);
        const data = {
          count: orders.length,
          ids,
          orders: orders.slice(offset, offset + limit)
        };
        res.json(onRequestSuccess(data));
      })
      .catch(error =>
        res.status(400).json(onRequestFail('error fetching orders'))
      );
  });

  /*-----------------------------
    전체 주문 조회 (ID로 조회)
  -----------------------------*/
  app.post('/orders-by-ids', requireLogin, canReadOrders, (req, res) => {
    const ids = req.body;

    db.with('joinedTable', joinedTable)
      .select('*')
      .from('joinedTable')
      .whereIn('id', ids)
      .then(orders => {
        if (orders.length) {
          res.json(onRequestSuccess(orders));
        } else {
          res.json(onRequestFail('no order to show'));
        }
      })
      .catch(error =>
        res.status(400).json(onRequestFail('error fetching orders'))
      );
  });

  /*-----------------------------
    전체 주문 조회 (엑셀추출용)
  -----------------------------*/
  app.post('/orders-for-xls', requireLogin, canReadOrders, (req, res) => {
    const {
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

    db.with('joinedTable', joinedTable)
      .select('*')
      .from('joinedTable')
      .whereBetween('ordered_at', [date_from, date_to])
      .andWhere('account_name', 'like', `%${account_name}%`)
      .andWhere('product_name', 'like', `%${product_name}%`)
      .andWhere('product_thick', 'like', `%${product_thick}%`)
      .andWhere('product_length', 'like', `%${product_length}%`)
      .andWhere('product_width', 'like', `%${product_width}%`)
      .andWhere(function() {
        if (show_completed === false) this.where('is_completed', false);
      })
      .then(orders =>
        res.json(
          onRequestSuccess({
            count: orders.length,
            orders
          })
        )
      )
      .catch(error =>
        res.status(400).json(onRequestFail('error fetching orders'))
      );
  });

  /*-----------------------------
    전체 주문 조회 (품목별 조회)
  -----------------------------*/
  app.get('/orders-by-product/:id', requireLogin, canReadOrders, (req, res) => {
    const { id } = req.params;

    db.with('joinedTable', joinedTable)
      .select('*')
      .from('joinedTable')
      .where('product_id', '=', id)
      .then(orders => {
        if (orders.length) {
          res.json(onRequestSuccess(orders));
        } else {
          res.json(onRequestFail('no order to show'));
        }
      })
      .catch(error =>
        res.status(400).json(onRequestFail('error fetching orders'))
      );
  });

  /*-----------------------------
    단일 주문 조회
  -----------------------------*/
  app.get('/orders/:id', requireLogin, canReadOrders, (req, res) => {
    const { id } = req.params;

    db.select('*')
      .from('orders')
      .where('id', '=', id)
      .then(order => {
        if (order.length) {
          res.json(onRequestSuccess(order[0]));
        } else {
          res.status(400).json(onRequestFail('존재하지 않는 주문입니다.'));
        }
      })
      .catch(error =>
        res.status(400).json(onRequestFail('error fetching an order'))
      );
  });

  /*-----------------------------
    주문 등록
  -----------------------------*/
  app.post('/orders/add', requireLogin, canWriteOrders, (req, res) => {
    const data = req.body; // order object

    // check required field
    const isRequiredEmpty = REQUIRED_PROPS.map(prop => !!data[prop]).includes(
      false
    );

    if (isRequiredEmpty)
      return res.status(400).json(onRequestFail('필수항목을 입력해야 합니다.'));

    // 품목 정보 확인
    db('products')
      .where('id', '=', data.product_id)
      .then(products => {
        if (products.length === 0) {
          return res
            .status(400)
            .json(onRequestFail('존재하지 않는 품목입니다.'));
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
                  return res.json(onRequestSuccess(orders[0]));
                })
                .then(trx.commit)
                .catch(trx.rollback);
            });
        });
      })
      .catch(error =>
        res.status(400).json(onRequestFail('error placing an order'))
      );
  });

  /*-----------------------------
    주문 정보 수정
  -----------------------------*/
  app.put('/orders/:id', requireLogin, canWriteOrders, (req, res) => {
    const { id } = req.params;
    const data = req.body; // object containing order info
    console.log(data);

    // remove property of incoming data if value is empty
    REQUIRED_PROPS.forEach(prop => {
      if (data[prop] === '') delete data[prop];
    });

    if (!Object.keys(data).length)
      return res.status(400).json(onRequestFail('수정할 항목이 없습니다.'));

    db('orders')
      .select('*')
      .where('id', '=', id)
      .then(response => {
        console.log('주문정보 가져오기 완료::: ', response[0]);
        const { product_id } = response[0];

        // 수정내용 중 동판상태 or 주문수량이 있을 경우
        if (data.plate_status || data.order_quantity) {
          return db('products')
            .select(
              'product_thick',
              'product_length',
              'product_width',
              'is_print'
            )
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
                data.is_plate_ready = is_print && data.plate_status === '확인';
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
            return res.json(onRequestSuccess(orders[0]));
          });
      })
      .catch(error => res.status(400).json('error updating an order'));
  });

  /*-----------------------------
    작업 완료 처리
  -----------------------------*/
  app.put('/orders-complete', requireLogin, canWriteOrders, (req, res) => {
    const data = req.body; // object containing order info

    Promise.all(
      data.map(order => {
        return db('orders')
          .where('id', '=', order.id)
          .update(order)
          .returning('*')
          .then(result => result[0]);
      })
    )
      .then(orders => res.json(onRequestSuccess(orders)))
      .catch(error => res.status(400).json('error completing orders'));
  });

  /*-----------------------------
    주문 삭제 (single, multi)
  -----------------------------*/
  app.delete('/orders', requireLogin, canWriteOrders, (req, res) => {
    const ids = req.body; // array of ids

    if (ids.length) {
      db('orders')
        .whereIn('id', ids)
        .del()
        .then(response =>
          res.json(
            onRequestSuccess(`${response}개 주문이 정상적으로 삭제되었습니다.`)
          )
        )
        .catch(error => res.status(400).json('error deleting orders'));
    } else {
      res.status(400).json('삭제할 주문 정보가 없습니다.');
    }
  });
};
