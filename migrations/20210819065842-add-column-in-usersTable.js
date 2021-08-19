'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface .addColumn( 'Users', 'salt', Sequelize.STRING )
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Users', 'salt');
  }
};
