"use strict";
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
				references: {
					model: "characters",
					key: "id",
				},
			},
			episodeId: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: "episodes",
					key: "id",
				},
			},
		});
	},
	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable("characterEpisodes");
	},
};
