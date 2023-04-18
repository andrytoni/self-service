'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.renameColumn('products', 'token', 'description');
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.renameColumn('products', 'description', 'token');
  },
};
