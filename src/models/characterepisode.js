'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CharacterEpisode extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      CharacterEpisode.belongsTo(models.characters);
      CharacterEpisode.belongsTo(models.episodes);
    }
  };
  CharacterEpisode.init(
		{
			characterId: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			episodeId: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
		},
		{
			sequelize,
			modelName: "characterEpisodes",
		}
	);
  return CharacterEpisode;
};