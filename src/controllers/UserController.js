const logger = require("../config/logger");
const http_responder = require("../utils/http_response");
const { StatusCodes } = require("http-status-codes");
const { validateRequest, hashPassword, createToken } = require("../utils/utils");
const { CreateUserSchema } = require("../utils/schema_definition");
const UserService = require("../services/UserService");


/**
 * @name createUser
 * @desc A user with correct credentials you should be able login
 * Route: POST: '/api/v1/user'
 * @param {object} request
 * @param {object} response
 * @returns {json} json
 */
exports.createUser = async (request, response) => {
    try {
    // validate request object
    const errors = await validateRequest(request.body, CreateUserSchema);
    if (errors) {
        return http_responder.errorResponse(response, errors, StatusCodes.BAD_REQUEST);
    }
    const { name, email, password } = request.body;

    // check if user exists
    const existingUser = await UserService.findUserByEmail(email.toLowerCase());
    if (existingUser) {
        return http_responder.errorResponse(response, "user already exists", StatusCodes.BAD_REQUEST);
    }
    
    const hashedPassword = await hashPassword(password)
    
    const userObject = {
        name: name.toLowerCase(),
        email: email.toLowerCase(),
        password: hashedPassword
    }
    
    // create user
    const user = await UserService.createUser(userObject);
    const { dataValues } = user;
    delete dataValues.password;

    // * create token
    const token = await createToken({ id: dataValues.id });

    // * return newly created user
    return http_responder.successResponse(response, { user: {...dataValues}, token }, "user created successfully", StatusCodes.CREATED);
    } catch (error) {
        logger.error(error);
        return http_responder.errorResponse(response, "internal_server_error", StatusCodes.INTERNAL_SERVER_ERROR);
    }
}
