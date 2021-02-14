"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Location extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			Location.hasMany(models.characters);
		}
	}
	Location.init(
		{
			name: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			latitude: {
				type: DataTypes.DECIMAL,
				allowNull: false,
			},
			longitude: {
				type: DataTypes.DECIMAL,
				allowNull: false,
			},
			created: {
				type: DataTypes.DATE,
				allowNull: false,
				defaultValue: DataTypes.NOW,
			},
		},
		{
            timestamps: false,
			sequelize,
			modelName: "locations",
		}
	);
	return Location;
};
