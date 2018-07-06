const db = require('../database');

const requirePermission = (permission_id, permission_type) => {
  return new Promise((resolve, reject) => {
    if (permission_id === undefined) reject('You have no permission!');

    db.select('*')
      .from('permission')
      .where('id', '=', permission_id)
      .then(permission => {
        if (permission[0][permission_type]) {
          resolve(true);
        } else {
          reject('You have no permission!');
        }
      })
      .catch(error => reject('You have no permission!'));
  });
};

// can_read_users
const canReadUsers = (req, res, next) => {
  requirePermission(req.user.permission_id, 'can_read_users')
    .then(isPermitted => {
      if (isPermitted) next();
    })
    .catch(error => res.status(401).json(error));
}

// can_write_users
const canWriteUsers = (req, res, next) => {
  requirePermission(req.user.permission_id, 'can_write_users')
    .then(isPermitted => {
      if (isPermitted) next();
    })
    .catch(error => res.status(401).json(error));
};

// can_read_accounts
const canReadAccounts = (req, res, next) => {
  requirePermission(req.user.permission_id, 'can_read_accounts')
    .then(isPermitted => {
      if (isPermitted) next();
    })
    .catch(error => res.status(401).json(error));
}

// can_write_accounts
const canWriteAccounts = (req, res, next) => {
  requirePermission(req.user.permission_id, 'can_write_accounts')
    .then(isPermitted => {
      if (isPermitted) next();
    })
    .catch(error => res.status(401).json(error));
}

// can_read_products
const canReadProducts = (req, res, next) => {
  requirePermission(req.user.permission_id, 'can_read_products')
    .then(isPermitted => {
      if (isPermitted) next();
    })
    .catch(error => res.status(401).json(error));
}

// can_write_products
const canWriteProducts = (req, res, next) => {
  requirePermission(req.user.permission_id, 'can_write_products')
    .then(isPermitted => {
      if (isPermitted) next();
    })
    .catch(error => res.status(401).json(error));
}

// can_read_plates
const canReadPlates = (req, res, next) => {
  requirePermission(req.user.permission_id, 'can_read_plates')
    .then(isPermitted => {
      if (isPermitted) next();
    })
    .catch(error => res.status(401).json(error));
}

// can_write_plates
const canWritePlates = (req, res, next) => {
  requirePermission(req.user.permission_id, 'can_write_plates')
    .then(isPermitted => {
      if (isPermitted) next();
    })
    .catch(error => res.status(401).json(error));
}

// can_read_orders
const canReadOrders = (req, res, next) => {
  requirePermission(req.user.permission_id, 'can_read_orders')
    .then(isPermitted => {
      if (isPermitted) next();
    })
    .catch(error => res.status(401).json(error));
}

// can_write_orders
const canWriteOrders = (req, res, next) => {
  requirePermission(req.user.permission_id, 'can_write_orders')
    .then(isPermitted => {
      if (isPermitted) next();
    })
    .catch(error => res.status(401).json(error));
}

// can_read_permission
const canReadPermission = (req, res, next) => {
  requirePermission(req.user.permission_id, 'can_read_permission')
    .then(isPermitted => {
      if (isPermitted) next();
    })
    .catch(error => res.status(401).json(error));
}

// can_write_permission
const canWritePermission = (req, res, next) => {
  requirePermission(req.user.permission_id, 'can_write_permission')
    .then(isPermitted => {
      if (isPermitted) next();
    })
    .catch(error => res.status(401).json(error));
}

module.exports = {
  canReadUsers,
  canWriteUsers,
  canReadAccounts,
  canWriteAccounts,
  canReadProducts,
  canWriteProducts,
  canReadPlates,
  canWritePlates,
  canReadOrders,
  canWriteOrders,
  canReadPermission,
  canWritePermission
};
