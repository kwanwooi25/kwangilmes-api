const db = require('../database');
const requireLogin = require('../middlewares/requireLogin');
const {
  canReadPlates,
  canWritePlates
} = require('../middlewares/requirePermission');
const { onRequestSuccess, onRequestFail } = require('../utils');

const REQUIRED_PROPS = ['product_1', 'round', 'length', 'material'];
const { SAMPLE_PLATES } = require('../fixture');

module.exports = app => {
  /*=======================================
  APIs
  -----------------------------------------
  POST    /plates      전체 동판 조회
  GET     /plates/:id  단일 동판 조회
  POST    /plates/add  동판 추가
  PUT     /plates/:id  동판 정보 수정
  DELETE  /plates      동판 삭제
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
          db.insert(SAMPLE_PLATES)
            .into('plates')
            .then(result => {
              console.log('SAMPLE_PLATES added');
            });
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

    db.select('id')
      .from('products')
      .where('product_name', 'like', `%${product_name}%`)
      .then(results => {
        const ids = results.map(result => result.id);

        db('plates')
          .where('plate_round', 'like', `%${plate_round}%`)
          .andWhere('plate_length', 'like', `%${plate_length}%`)
          .andWhere('plate_material', 'like', `%${plate_material}%`)
          .andWhere(function() {
            this.whereIn('product_1', ids)
              .orWhereIn('product_2', ids)
              .orWhereIn('product_3', ids);
          })
          .orderBy('plate_round', 'asc')
          .then(plates => {
            if (plates.length) {
              const ids = plates.map(plate => plate.id);
              const data = {
                count: plates.length,
                ids,
                plates: plates.slice(offset, offset + limit)
              };
              res.json(onRequestSuccess(data));
            } else {
              const data = { count: 0, ids: [], plates: [] };
              res.json(onRequestSuccess(data));
            }
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
      // 최초 생성일자 입력
      data.forEach(plate => {
        plate.plate_created_at = new Date();
      });
      db.insert(data)
        .into('plates')
        .returning('*')
        .then(plates => res.json(onRequestSuccess(plates)))
        .catch(error =>
          res.status(400).json(onRequestFail('error adding plates'))
        );
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
