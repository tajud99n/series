const { Sequelize } = require("../models");
const models = require("../models");

const EpisodeService = {
	async createEpisode(data) {
		return models.episodes.create(data);
	},

	async findEpisodeById(id) {
		return models.episodes.findByPk(id);
	},

	async findCharacterInEpisode(q) {
		return models.characterEpisodes.findOne({
			where: {
				episodeId: q.episodeId,
				characterId: q.characterId,
			},
		});
	},

	async addCharacterToEpisode(data) {
		return models.characterEpisodes.create(data);
	},

	async getEpisodeCharacters(episodeId) {
		return models.characterEpisodes.findAll({
			where: {
				episodeId,
			},
			include: [models.characters, models.episodes],
		});
	},

	async getAllEpisodes(filter) {
		return models.episodes.findAndCountAll({
			subQuery: false,
			attributes: {
				include: [
					[
						Sequelize.fn("COUNT", Sequelize.col("comments.episodeId")),
						"commentsCount",
					],
				],
			},
			include: [
				{
					model: models.comments,
					attributes: [],
				},
			],
			group: ["episodes.id"],
			offset: filter.offSet,
			limit: filter.limit,
			order: [["releaseDate", "ASC"]],
		});
	}
};

module.exports = EpisodeService;
