const logger = require("../config/logger");
const http_responder = require("../utils/http_response");
const { StatusCodes } = require("http-status-codes");
const { validateRequest } = require("../utils/utils");
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
		const { firstName, lastName, status, stateOfOrigin, gender, locationId } = request.body;

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
