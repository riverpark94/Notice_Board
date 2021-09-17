'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("Replys", "userId", {
      type: Sequelize.INTEGER,
    });
    await queryInterface.addConstraint("Replys", {
      fields: ["userId"],
      type: "foreign key",
      name: "User_write_Reply_fk",
      references: {
        table: "Users",
        field: "id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });

    await queryInterface.addColumn("Replys", "boardId", {
      type: Sequelize.INTEGER,
    });
    await queryInterface.addConstraint("Replys", {
      fields: ["boardId"],
      type: "foreign key",
      name: "Reply_in_this_Post_fk",
      references: {
        table: "Boards",
        field: "id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });

    await queryInterface.addColumn("Replys", "parentId", {
      type: Sequelize.INTEGER,
    });
    await queryInterface.addConstraint("Replys", {
      fields: ["parentId"],
      type: "foreign key",
      name: "nested_reply_fk",
      references: {
        table: "Replys",
        field: "id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("Replys", "userId");
    await queryInterface.removeColumn("Replys", "boardId");
    await queryInterface.removeColumn("Replys", "parentId");
  },
};
