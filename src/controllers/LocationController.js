const logger = require("../config/logger");
const http_responder = require("../utils/http_response");
const { StatusCodes } = require("http-status-codes");
const { validateRequest } = require("../utils/utils");
const { CreateLocationSchema } = require("../utils/schema_definition");
const LocationService = require("../services/LocationService");


/**
 * @name createLocation
 * @desc create a new location
 * Route: POST: '/api/v1/location'
 * @param {object} request
 * @param {object} response
 * @returns {json} json
 */
exports.createLocation = async (request, response) => {
	try {
		// validate request object
		const errors = await validateRequest(request.body, CreateLocationSchema);
		if (errors) {
			return http_responder.errorResponse(
				response,
				errors,
				StatusCodes.BAD_REQUEST
			);
		}
		const { name, longitude, latitude } = request.body;

		const locationObject = {
            name: name.toLowerCase(),
            longitude,
            latitude
		};

		// create location
		const location = await LocationService.createLocation(locationObject);
		const { dataValues } = location;


		// * return newly created location
		return http_responder.successResponse(
			response,
			{ location: { ...dataValues } },
			"location created successfully",
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
