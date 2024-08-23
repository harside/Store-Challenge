const sequelize = require('../config/databases/postgres');

const Store = require('./stores.models')(sequelize);

module.exports = {
  Store,
};
