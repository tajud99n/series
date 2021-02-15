'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("characters", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			firstName: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			lastName: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			status: {
				type: Sequelize.ENUM("ACTIVE", "DEAD", "UNKNOWN"),
				allowNull: false,
			},
			stateOfOrigin: {
				type: Sequelize.STRING,
			},
			gender: {
				type: Sequelize.ENUM("MALE", "FEMALE"),
				allowNull: false,
			},
			locationId: {
				type: Sequelize.INTEGER,
				references: {
					model: "locations",
					key: "id",
					as: "location",
				},
			},
			created: {
				allowNull: false,
				type: Sequelize.DATE,
			},
		});
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('characters');
  }
};