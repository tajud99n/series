'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Character extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Character.belongsTo(models.locations)
      Character.hasMany(models.characterEpisodes);
    }
  };
  Character.init(
		{
			firstName: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			lastName: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			status: {
				type: DataTypes.ENUM("ACTVE", "DEAD", "UNKNOWN"),
				allowNull: false,
			},
			stateOfOrigin: {
				type: DataTypes.STRING,
			},
			gender: {
				type: DataTypes.ENUM("MALE", "FEMALE"),
				allowNull: false,
			},
			locationId: {
				type: DataTypes.INTEGER,
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
			modelName: "characters",
		}
	);
  return Character;
};