'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("characterEpisodes", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			characterId: {
				type: Sequelize.INTEGER,
				allowNull: false,
				onDelete: "CASCADE",
				references: {
					model: "characters",
					key: "id",
					as: "characterId",
				},
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
    await queryInterface.dropTable('characterEpisodes');
  }
};