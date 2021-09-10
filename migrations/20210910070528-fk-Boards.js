'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("Boards", "userId");
    await queryInterface.addColumn("Boards", "userId", {
      type: Sequelize.INTEGER,
    });
    await queryInterface.addConstraint("Boards", {
      fields: ["userId"],
      type: "foreign key",
      name: "User_write_Post_fk",
      references: {
        table: "Users",
        field: "id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("Boards", "userId");
  },
};
