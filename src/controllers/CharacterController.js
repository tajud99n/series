const logger = require("../config/logger");
const http_responder = require("../utils/http_response");
const { StatusCodes } = require("http-status-codes");
const { validateRequest, meta } = require("../utils/utils");
const { CreateCharacterSchema } = require("../utils/schema_definition");
const CharacterService = require("../services/CharacterService");
const LocationService = require("../services/LocationService");

/**
 * @name createCharacter
 * @desc create a new character
 * Route: POST: '/api/v1/character'
 * @param {object} request
 * @param {object} response
 * @returns {json} json
 */
exports.createCharacter = async (request, response) => {
	try {
		// validate request object
		const errors = await validateRequest(request.body, CreateCharacterSchema);
		if (errors) {
			return http_responder.errorResponse(
				response,
				errors,
				StatusCodes.BAD_REQUEST
			);
		}
		const {
			firstName,
			lastName,
			status,
			stateOfOrigin,
			gender,
			locationId,
		} = request.body;

		// *if locationId is sent, check if location exist
		if (locationId) {
			const checkLocation = await LocationService.findLocationById(locationId);

			if (!checkLocation) {
				return http_responder.errorResponse(
					response,
					"invalid locationId",
					StatusCodes.BAD_REQUEST
				);
			}
		}

		const characterObject = {
			firstName: firstName.toLowerCase(),
			lastName: lastName.toLowerCase(),
			status,
			stateOfOrigin: stateOfOrigin ? stateOfOrigin.toLowerCase() : null,
			gender,
			locationId: locationId ? locationId : null,
		};

		// create Character
		const character = await CharacterService.createCharacter(characterObject);
		const { dataValues } = character;

		// * return newly created Character
		return http_responder.successResponse(
			response,
			{ character: { ...dataValues } },
			"character created successfully",
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

/**
 * @name getCharacters
 * @desc fetch all episodes
 * Route: GET: '/api/v1/character'
 * @param {object} request
 * @param {object} response
 * @returns {json} json
 */
exports.getCharacters = async (request, response) => {
	try {
		const filter = {};
		const sort = {};
		filter.limit = parseInt(request.query.limit)
			? parseInt(request.query.limit)
			: 10;
		const page = parseInt(request.query.page)
			? parseInt(request.query.page)
			: 1;
		filter.offSet = (page - 1) * filter.limit;
		sort.value = request.query.sortValue == "name" ? "firstName" : "gender";
		sort.order = request.query.sortOrder == "asc" ? "ASC" : "DESC";
		const query = {};
		switch (request.query.filterType) {
			case "gender":
				query.where = {
					gender: request.query.filterValue
						? [request.query.filterValue.toUpperCase()]
						: ["MALE", "FEMALE"],
				};
				break;
			case "location":
				query.where = {
					location: request.query.filterValue,
				};
				break;
			default:
				query.where = {
					status: request.query.filterValue
						? [request.query.filterValue.toUpperCase()]
						: ["ACTIVE", "UNKNOWN", "DEAD"],
				};
				break;
		}
		const { count, rows } = await CharacterService.getAllCharacters(
			filter,
			sort,
			query
		);

		return http_responder.successResponse(
			response,
			{ result: rows },
			"characters returned successfully",
			StatusCodes.OK,
			meta(count, filter.limit, page)
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

/**
 * @name search
 * @desc fetch all episodes
 * Route: GET: '/api/v1/search'
 * @param {object} request
 * @param {object} response
 * @returns {json} json
 */
exports.search = async (request, response) => {
	try {
		const { q } = request.query;
		const filter = {};
		filter.limit = parseInt(request.query.limit)
			? parseInt(request.query.limit)
			: 10;
		const page = parseInt(request.query.page)
			? parseInt(request.query.page)
			: 1;
		filter.offSet = (page - 1) * filter.limit;
		const { count, rows } = await CharacterService.searchCharacters(filter, q);
		const result = [];
		if (rows.length > 0) {
			for (const element of rows) {
				for (const ec of element.characterEpisodes) {
					result.push(ec.episode);
				}
			}
		}
		return http_responder.successResponse(
			response,
			{ result },
			"result returned successfully",
			StatusCodes.OK,
			meta(count, filter.limit, page)
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