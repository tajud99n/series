'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Comment.belongsTo(models.episodes);
    }
  };
  Comment.init(
		{
			episodeId: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			comment: {
				type: DataTypes.STRING(250),
				allowNull: false,
			},
			ipAddressLocation: {
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
			modelName: "comments",
		}
	);
  return Comment;
};