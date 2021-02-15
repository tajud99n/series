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
			// include: [{
				// model: models.episodes,
				
					where: {
						episodeId
			},
			include: [models.characters, models.episodes]
					
			// }]
		});
	},
};

module.exports = EpisodeService;
