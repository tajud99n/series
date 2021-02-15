const logger = require("../config/logger");
const http_responder = require("../utils/http_response");
const { StatusCodes } = require("http-status-codes");
const { validateRequest } = require("../utils/utils");
const { CreateEpisodeSchema, AddCharacterSchema } = require("../utils/schema_definition");
const EpisodeService = require("../services/EpisodeService");
const CharacterService = require("../services/CharacterService");

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

/**
 * @name addCharacter
 * @desc create a character
 * Route: POST: '/api/v1/episode/add-character'
 * @param {object} request
 * @param {object} response
 * @returns {json} json
 */
exports.addCharacter = async (request, response) => {
	try {
		// validate request object
		const errors = await validateRequest(request.body, AddCharacterSchema);
		if (errors) {
			return http_responder.errorResponse(
				response,
				errors,
				StatusCodes.BAD_REQUEST
			);
		}

		const { episodeId, characterId } = request.body
		
		// check if episode exist
		const checkEpisode = await EpisodeService.findEpisodeById(episodeId)
		if (!checkEpisode) {
			return http_responder.errorResponse(
				response,
				"invalid episodeId",
				StatusCodes.BAD_REQUEST
			);
		}

		// check if character exist
		const checkCharacter = await CharacterService.findCharacterById(characterId)
		if (!checkCharacter) {
			return http_responder.errorResponse(
				response,
				"invalid characterId",
				StatusCodes.BAD_REQUEST
			);
		}

		// check if character has been added to episode
		const check = await EpisodeService.findCharacterInEpisode({ episodeId, characterId })
		if (check) {
			return http_responder.errorResponse(
				response,
				"charcacter already exist in episode",
				StatusCodes.BAD_REQUEST
			);
		}

		// add character to episode
		const addCharacter = await EpisodeService.addCharacterToEpisode({ episodeId, characterId });

		// Eager load characters in an episode
		const episodeCharacters = await EpisodeService.getEpisodeCharacters(episodeId);
		const characters = [];

		episodeCharacters.forEach(element => {
			characters.push(element.dataValues.character)
		});

		
		return http_responder.successResponse(
			response,
			{
				episode: episodeCharacters[0].episode,
				characters,
			},
			"character added to episode successfully",
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