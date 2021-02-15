const models = require("../models");

const CommentService = {
	async createComment(data) {
		return models.comments.create(data);
	},
};

module.exports = CommentService;
