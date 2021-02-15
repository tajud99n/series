const logger = require("../config/logger");
const http_responder = require("../utils/http_response");
const { StatusCodes } = require("http-status-codes");
const { validateRequest } = require("../utils/utils");
const { AddCommentSchema } = require("../utils/schema_definition");
const EpisodeService = require("../services/EpisodeService");
const CommentService = require("../services/CommentService");

/**
 * @name addComment
 * @desc create a new comment
 * Route: POST: '/api/v1/episode/:id/comment'
 * @param {object} request
 * @param {object} response
 * @returns {json} json
 */
exports.addComment = async (request, response) => {
	try {
		const { comment, ipAddressLocation } = request.body;
		const { episodeId } = request.params;

		// validate request object
		const errors = await validateRequest(
			{ episodeId, comment, ipAddressLocation },
			AddCommentSchema
		);
		if (errors) {
			return http_responder.errorResponse(
				response,
				errors,
				StatusCodes.BAD_REQUEST
			);
		}

		// check if episode exist
		const checkEpisode = await EpisodeService.findEpisodeById(episodeId);
		if (!checkEpisode) {
			return http_responder.errorResponse(
				response,
				"invalid episodeId",
				StatusCodes.BAD_REQUEST
			);
		}

		// create comment
		const createComment = await CommentService.createComment({
			episodeId,
			comment,
			ipAddressLocation,
		});
        const { dataValues } = createComment
        
		return http_responder.successResponse(
			response,
			{
				comment: {...dataValues},
			},
			"comment added to episode successfully",
			StatusCodes.CREATED
		);
	} catch (error) {
		logger.error(error);
		return http_responder.errorResponse(
			response,
			"internal_server_error",
			StatusCodes.INTERNAL_SERVER_ERROR
		);
	}
};
