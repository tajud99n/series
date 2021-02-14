'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Episode extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Episode.hasMany(models.comments)
      Episode.hasMany(models.characterEpisodes);
    }
  };
  Episode.init(
		{
			name: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			releaseDate: {
				type: DataTypes.DATE,
				allowNull: false,
			},
			episodeCode: {
				type: DataTypes.STRING,
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
			modelName: "episodes",
		}
	);
  return Episode;
};