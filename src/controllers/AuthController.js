const logger = require("../config/logger");
const http_responder = require("../utils/http_response");
const { StatusCodes } = require("http-status-codes");
const {
	validateRequest,
	validatePassword,
	createToken,
} = require("../utils/utils");
const { CredentialSchema } = require("../utils/schema_definition");
const UserService = require("../services/UserService");

/**
 * @name loginUser
 * @desc A user with correct credentials you should be able login
 * Route: POST: '/api/v1/login'
 * @param {object} request
 * @param {object} response
 * @returns {json} json
 */
exports.loginUser = async (request, response) => {
	try {
		const errors = await validateRequest(request.body, CredentialSchema);
		if (errors) {
			return http_responder.errorResponse(
				response,
				errors,
				StatusCodes.BAD_REQUEST
			);
		}

		// check if user exists
		const email = request.body.email.toLowerCase();

		const user = await UserService.findUserByEmail(email);
		if (!user) {
			return http_responder.errorResponse(
				response,
				"invalid login credentials",
				StatusCodes.NOT_FOUND
			);
		}

		// verify password and generate token
		const passwordMatch = await validatePassword(
			request.body.password,
			user.password
		);
		if (!passwordMatch) {
			return http_responder.errorResponse(
				response,
				"invalid login credentials",
				StatusCodes.UNAUTHORIZED
			);
		}

		const { dataValues } = user;
		delete dataValues.password;
		const token = await createToken({ id: dataValues.id });

		return http_responder.successResponse(
			response,
			{ user: { ...dataValues }, token },
			"user login successful",
			StatusCodes.OK
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
