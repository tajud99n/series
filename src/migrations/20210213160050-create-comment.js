'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("comments", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			comment: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			ipAddressLocation: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			created: {
				type: Sequelize.DATE,
				allowNull: false,
			},
			episodeId: {
				type: Sequelize.INTEGER,
				allowNull: false,
				onDelete: "CASCADE",
				references: {
					model: "episodes",
					key: "id",
					as: "episodeId",
				},
			},
		});
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('comments');
  }
};