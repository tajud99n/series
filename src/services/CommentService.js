const models = require("../models");

const CommentService = {
	async createComment(data) {
		return models.comments.create(data);
	},

	async getEpisodeComments(episodeId, filter) {
		return models.comments.findAndCountAll({
			where: {
				episodeId,
			},
			offset: filter.offSet,
			limit: filter.limit,
			order: [
				["ipAddressLocation", "DESC"],
				["created", "DESC"],
			],
		});
	},
};

module.exports = CommentService;
