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
				type: DataTypes.ENUM("ACTVE", "DEAD", "UNKNOWN"),
				allowNull: false,
			},
			stateOfOrigin: {
				type: Sequelize.STRING,
			},
			gender: {
				type: DataTypes.ENUM("MALE", "FEMALE"),
				allowNull: false,
			},
			location: {
				type: Sequelize.INTEGER,
				allowNull: false,
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