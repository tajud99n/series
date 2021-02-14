const { StatusCodes } = require("http-status-codes");
const http_responder = require("../utils/http_response");
const { verifyToken } = require("../utils/utils");
const UserService = require("../services/UserService");

/**
  * authToken
  * @desc A middleware to authenticate users token
  * @param {Object} request
  * @param {Object} response
  * @param {Function} next nextFunction middleware
  * @returns {void|Object} object
  */
const authToken = async (request, response, next) => {
    const bearerToken = request.headers["authorization"];
    if (!bearerToken) {
        return http_responder.errorResponse(response, "Access denied. No token provided.", StatusCodes.UNAUTHORIZED);
    }
    const token = bearerToken.split(' ')[1];
    // Verify token
    try {
        const decoded = await verifyToken(token);

        request.id = decoded.id;
        next();
    } catch (err) {
        return http_responder.errorResponse(response, "Invalid token. Please login", StatusCodes.UNAUTHORIZED);
    }
};

/**
  * authUser
  * @desc A middleware to authenticate users
  * @param {Object} request
  * @param {Object} response
  * @param {Function} next nextFunction middleware
  * @returns {void|Object} object
  */
const authUser = async (request, response, next) => {
	try {
        const user = await UserService.findUserById(request.id);
		if (!user || user.dataValues.isDeleted) {
			return http_responder.errorResponse(response, "Invalid token. Please login", StatusCodes.UNAUTHORIZED);
		}
		request.user = user.dataValues;
		next();
    } catch (err) {
        console.log
		return http_responder.errorResponse(response, "Invalid token. Please login", StatusCodes.UNAUTHORIZED);
	}
};

module.exports = { authToken, authUser }