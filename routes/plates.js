const db = require('../database');
const requireLogin = require('../middlewares/requireLogin');
const {
  canReadPlates,
  canWritePlates
} = require('../middlewares/requirePermission');
const { onRequestSuccess, onRequestFail } = require('../utils');

const REQUIRED_PROPS = ['plate_round', 'plate_length', 'plate_material'];
const { SAMPLE_PLATES } = require('../fixture');

const joinedTable = db.raw(
  `select plates.*, p1.account_id as product_1_account_id, p1.product_name as product_1_name, p1.product_thick as product_1_thick, p1.product_length as product_1_length, p1.product_width as product_1_width, p2.account_id as product_2_account_id, p2.product_name as product_2_name, p2.product_thick as product_2_thick, p2.product_length as product_2_length, p2.product_width as product_2_width, p3.account_id as product_3_account_id, p3.product_name as product_3_name, p3.product_thick as product_3_thick, p3.product_length as product_3_length, p3.product_width as product_3_width from plates left join products as p1 on plates.product_1 = p1.id left join products as p2 on plates.product_2 = p2.id left join products as p3 on plates.product_3 = p3.id order by plates.plate_round, plates.plate_length`
);

module.exports = app => {
  /*=======================================
  APIs
  -----------------------------------------
  POST    /plates          전체 동판 조회
  POST    /plates-for-xls  전체 동판 조회 (엑셀추출용)
  GET     /plates/:id      단일 동판 조회
  POST    /plates/add      동판 추가
  PUT     /plates/:id      동판 정보 수정
  DELETE  /plates          동판 삭제
  =========================================*/

  // Create table if table does not exist
  db.schema.hasTable('plates').then(exists => {
    // if (exists) db.schema.dropTable('plates').then(console.log);
    if (!exists) {
      db.schema
        .createTable('plates', table => {
          table.increments('id').primary();
          table.integer('product_1');
          table.integer('product_2');
          table.integer('product_3');
          table.string('plate_round').notNullable();
          table.string('plate_length').notNullable();
          table.string('plate_material').notNullable();
          table.string('storage_location');
          table.date('plate_created_at');
          table.date('plate_last_modified_at');
          table.text('memo');
        })
        .then(result => {
          console.log("TABLE CREATED: 'plates'");
          // db.insert(SAMPLE_PLATES).into('plates').then((result) => {
          // 	console.log('SAMPLE_PLATES added');
          // });
        });
    }
  });

  /*-----------------------------
    전체 동판 조회
  -----------------------------*/
  app.post('/plates', requireLogin, canReadPlates, (req, res) => {
    const {
      plate_round = '',
      plate_length = '',
      plate_material = '',
      product_name = '',
      limit = 10,
      offset = 0
    } = req.body;

    db.with('joinedTable', joinedTable)
      .select('*')
      .from('joinedTable')
      .where(function() {
        this.where('product_1_name', 'ilike', `%${product_name}%`)
          .orWhere('product_2_name', 'ilike', `%${product_name}%`)
          .orWhere('product_3_name', 'ilike', `%${product_name}%`);
      })
      .andWhere('plate_round', 'ilike', `%${plate_round}%`)
      .andWhere('plate_length', 'ilike', `%${plate_length}%`)
      .andWhere('plate_material', 'ilike', `%${plate_material}%`)
      .then(data => {
        Promise.all(
          data.map(plate => {
            const ids = [
              plate.product_1_account_id,
              plate.product_2_account_id,
              plate.product_3_account_id
            ];

            return db('accounts')
              .select('id', 'account_name')
              .whereIn('id', ids)
              .then(response => {
                response.forEach(({ id, account_name }) => {
                  const seq = ids.indexOf(id) + 1;
                  plate[`product_${seq}_account_name`] = account_name;
                  delete plate[`product_${seq}_account_id`];
                });

                return plate;
              });
          })
        ).then(plates => {
          const ids = plates.map(plate => plate.id);
          const data = {
            count: plates.length,
            ids,
            plates: plates.slice(offset, offset + limit)
          };
          return res.json(onRequestSuccess(data));
        });
      })
      .catch(error =>
        res.status(400).json(onRequestFail('error fetching plates'))
      );
  });

  /*-----------------------------
    전체 동판 조회 (엑셀 추출용)
  -----------------------------*/
  app.post('/plates-for-xls', requireLogin, canReadPlates, (req, res) => {
    const {
      plate_round = '',
      plate_length = '',
      plate_material = '',
      product_name = ''
    } = req.body;

    db.with('joinedTable', joinedTable)
      .select('*')
      .from('joinedTable')
      .where(function() {
        this.where('product_1_name', 'ilike', `%${product_name}%`)
          .orWhere('product_2_name', 'ilike', `%${product_name}%`)
          .orWhere('product_3_name', 'ilike', `%${product_name}%`);
      })
      .andWhere('plate_round', 'ilike', `%${plate_round}%`)
      .andWhere('plate_length', 'ilike', `%${plate_length}%`)
      .andWhere('plate_material', 'ilike', `%${plate_material}%`)
      .then(data => {
        Promise.all(
          data.map(plate => {
            const ids = [
              plate.product_1_account_id,
              plate.product_2_account_id,
              plate.product_3_account_id
            ];

            return db('accounts')
              .select('id', 'account_name')
              .whereIn('id', ids)
              .then(response => {
                response.forEach(({ id, account_name }) => {
                  const seq = ids.indexOf(id) + 1;
                  plate[`product_${seq}_account_name`] = account_name;
                  delete plate[`product_${seq}_account_id`];
                });

                return plate;
              });
          })
        ).then(plates => {
          return res.json(
            onRequestSuccess({
              count: plates.length,
              plates
            })
          );
        });
      })
      .catch(error =>
        res.status(400).json(onRequestFail('error fetching plates'))
      );
  });

  /*-----------------------------
    단일 동판 조회
  -----------------------------*/
  app.get('/plates/:id', requireLogin, canReadPlates, (req, res) => {
    const { id } = req.params;

    db.select('*')
      .from('plates')
      .where('id', '=', id)
      .then(plate => {
        if (plate.length) {
          res.json(onRequestSuccess(plate[0]));
        } else {
          res.status(400).json(onRequestFail('존재하지 않는 동판입니다.'));
        }
      })
      .catch(error =>
        res.status(400).json(onRequestFail('error fetching a plate'))
      );
  });

  /*-----------------------------
    동판 추가 (single, multi)
  -----------------------------*/
  app.post('/plates/add', requireLogin, canWritePlates, (req, res) => {
    const data = req.body; // array of plate object

    // check required field
    const isRequiredEmpty = data
      .map(plate => {
        return REQUIRED_PROPS.map(prop => !!plate[prop]).includes(false);
      })
      .includes(true);

    if (isRequiredEmpty) {
      res.status(400).json(onRequestFail('필수항목을 입력해야 합니다.'));
    } else {
      const modifiedData = data.map(plate => {
        const plateInfo = {
          plate_round: plate.plate_round,
          plate_length: plate.plate_length,
          plate_material: plate.plate_material,
          storage_location: plate.storage_location,
          product_1: plate.product_1,
          product_2: plate.product_2,
          product_3: plate.product_3,
          memo: plate.memo,
          plate_created_at: new Date()
        };

        let products = [];
        for (let i = 1; i <= 3; i++) {
          if (plate[`product_${i}_account_name`]) {
            products.push({
              account_name: plate[`product_${i}_account_name`],
              product_name: plate[`product_${i}_name`],
              product_thick: plate[`product_${i}_thick`],
              product_length: plate[`product_${i}_length`],
              product_width: plate[`product_${i}_width`]
            });
          }
        }

        return { plateInfo, products };
      });

      Promise.all(
        modifiedData.map(({ plateInfo, products }) => {
          return Promise.all(
            products.map(product => {
              return db('accounts')
                .select('id')
                .where('account_name', '=', product.account_name)
                .then(result => {
                  if (result.length) {
                    product.account_id = result[0].id;
                    return product;
                  }
                });
            })
          ).then(result => {
            return Promise.all(
              result.map(product => {
                if (product !== undefined) {
                  return db('products')
                    .select('id')
                    .where('account_id', '=', product.account_id)
                    .andWhere('product_name', '=', product.product_name)
                    .andWhere('product_thick', '=', product.product_thick)
                    .andWhere('product_length', '=', product.product_length)
                    .andWhere('product_width', '=', product.product_width)
                    .then(result => {
                      if (result.length) return result[0].id;
                    });
                }
              })
            ).then(productIds => {
              productIds.forEach((productId, index) => {
                plateInfo[`product_${index + 1}`] = productId;
              });
              return plateInfo;
            });
          });
        })
      ).then(dataToAdd => {
        db.insert(dataToAdd)
          .into('plates')
          .returning('*')
          .then(plates => res.json(onRequestSuccess(plates)))
          .catch(error =>
            res.status(400).json(onRequestFail('error adding plates'))
          );
      });
    }
  });

  /*-----------------------------
    동판 정보 수정
  -----------------------------*/
  app.put('/plates/:id', requireLogin, canWritePlates, (req, res) => {
    const { id } = req.params;
    const data = req.body; // object containing plate info

    // remove property of incoming data if value is empty
    REQUIRED_PROPS.forEach(prop => {
      if (data[prop] === '') delete data[prop];
    });

    if (!Object.keys(data).length)
      return res.status(400).json(onRequestFail('수정할 항목이 없습니다.'));

    // 수정일자 입력
    data.plate_last_modified_at = new Date();
    db('plates')
      .where('id', '=', id)
      .update(data)
      .returning('*')
      .then(plate => res.json(onRequestSuccess(plate)))
      .catch(error =>
        res.status(400).json(onRequestFail('error updating plate'))
      );
  });

  /*-----------------------------
    동판 삭제 (single, multi)
  -----------------------------*/
  app.delete('/plates', requireLogin, canWritePlates, (req, res) => {
    const ids = req.body; // array of ids

    if (ids.length) {
      db('plates')
        .whereIn('id', ids)
        .del()
        .then(response =>
          res.json(
            onRequestSuccess(`${response}개 동판이 정상적으로 삭제되었습니다.`)
          )
        )
        .catch(error =>
          res.status(400).json(onRequestFail('error deleting plates'))
        );
    } else {
      res.status(400).json(onRequestFail('삭제할 동판 정보가 없습니다.'));
    }
  });
};
