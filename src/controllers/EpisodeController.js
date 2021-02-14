const logger = require("../config/logger");
const http_responder = require("../utils/http_response");
const { StatusCodes } = require("http-status-codes");
const { validateRequest } = require("../utils/utils");
const { CreateEpisodeSchema } = require("../utils/schema_definition");
const EpisodeService = require("../services/EpisodeService");

/**
 * @name createEpisode
 * @desc create a new episode
 * Route: POST: '/api/v1/episode'
 * @param {object} request
 * @param {object} response
 * @returns {json} json
 */
exports.createEpisode = async (request, response) => {
	try {
		// validate request object
		const errors = await validateRequest(request.body, CreateEpisodeSchema);
		if (errors) {
			return http_responder.errorResponse(
				response,
				errors,
				StatusCodes.BAD_REQUEST
			);
		}
		const { name, releaseDate, episodeCode } = request.body;

		const episodeObject = {
			name: name.toLowerCase(),
			releaseDate: new Date(releaseDate),
			episodeCode,
		};

		// create episode
		const episode = await EpisodeService.createEpisode(episodeObject);
		const { dataValues } = episode;

		// * return newly created Character
		return http_responder.successResponse(
			response,
			{ episode: { ...dataValues } },
			"episode created successfully",
			StatusCodes.CREATED
		);
	} catch (error) {
		console.log(error);
		logger.error(error);
		return http_responder.errorResponse(
			response,
			"internal_server_error",
			StatusCodes.INTERNAL_SERVER_ERROR
		);
	}
};
