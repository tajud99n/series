const models = require("../models");

const EpisodeService = {
	async createEpisode(data) {
		return models.episodes.create(data);
	},
};

module.exports = EpisodeService;
