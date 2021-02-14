const Joi = require("joi");

const CreateUserSchema = Joi.object({
	name: Joi.string().required().messages({
		"string.base": `name should be a string.`,
		"string.empty": `name is required.`,
		"any.required": `name is required.`,
	}),
	email: Joi.string().required().email().messages({
		"string.base": `email should be a string.`,
		"string.empty": `email is required.`,
		"string.email": `email should be a valid email pattern.`,
		"any.required": `email is required.`,
	}),
	password: Joi.string().required().min(5).messages({
		"string.base": `password should be a string.`,
		"string.empty": `password is required.`,
		"any.required": `password is required.`,
	}),
});

const CredentialSchema = Joi.object({
	email: Joi.string().required().email().messages({
		"string.base": `email should be a string.`,
		"string.empty": `email is required.`,
		"string.email": `email should be a valid email pattern.`,
		"any.required": `email is required.`,
	}),
	password: Joi.string().required().min(5).messages({
		"string.base": `password should be a string.`,
		"string.empty": `password is required.`,
		"any.required": `password is required.`,
	}),
});

const CreateLocationSchema = Joi.object({
	name: Joi.string().required().messages({
		"string.base": `name should be a string.`,
		"string.empty": `name is required.`,
		"any.required": `name is required.`,
	}),
	longitude: Joi.number().required().messages({
		"number.base": `longitude should be a number.`,
		"number.empty": `longitude is required.`,
		"any.required": `longitude is required.`,
	}),
	latitude: Joi.number().required().messages({
		"number.base": `latitude should be a number.`,
		"number.empty": `latitude is required.`,
		"any.required": `latitude is required.`,
	}),
});

const CreateCharacterSchema = Joi.object({
	firstName: Joi.string().required().messages({
		"string.base": `firstName should be a string.`,
		"string.empty": `firstName is required.`,
		"any.required": `firstName is required.`,
	}),
	lastName: Joi.string().required().messages({
		"string.base": `lastName should be a string.`,
		"string.empty": `lastName is required.`,
		"any.required": `lastName is required.`,
	}),
	status: Joi.string().valid("ACTIVE", "DEAD", "UNKNOWN").required().messages({
		"string.base": `status should be a string.`,
		"string.empty": `status is required.`,
		"any.required": `status is required.`,
		"any.only": `status should be value of ACTIVE or DEAD or UNKNOWN.`,
	}),
	stateOfOrigin: Joi.string().messages({
		"string.base": `stateOfOrigin should be a string.`,
		"string.empty": `stateOfOrigin is required.`,
	}),
	gender: Joi.string().valid("MALE", "FEMALE").required().messages({
		"string.base": `gender should be a string.`,
		"string.empty": `gender is required.`,
		"any.required": `gender is required.`,
		"any.only": `gender should be value of MALE or FEMALE.`,
	}),
	locationId: Joi.number().messages({
		"number.base": `locationId should be a number.`,
		"number.empty": `locationId is required.`,
		"any.required": `locationId is required.`,
	}),
});

const CreateEpisodeSchema = Joi.object({
	name: Joi.string().required().messages({
		"string.base": `name should be a string.`,
		"string.empty": `name is required.`,
		"any.required": `name is required.`,
	}),
	episodeCode: Joi.string().required().messages({
		"string.base": `episodeCode should be a string.`,
		"string.empty": `episodeCode is required.`,
		"any.required": `episodeCode is required.`,
	}),
	releaseDate: Joi.string().required().isoDate().messages({
		"string.base": `releaseDate should be a string.`,
		"string.empty": `releaseDate is required.`,
		"string.isoDate": `releaseDate must be a date with format Year-Month-Day.`,
		"any.required": `releaseDate is required.`,
	}),
});

module.exports = { CreateUserSchema, CredentialSchema, CreateLocationSchema, CreateCharacterSchema, CreateEpisodeSchema };