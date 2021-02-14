'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Episodes", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			name: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			releaseDate: {
				type: Sequelize.DATE,
				allowNull: false,
			},
			episodeCode: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			created: {
				type: Sequelize.DATE,
				allowNull: false,
			},
		});
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Episodes');
  }
};