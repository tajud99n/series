const express = require("express");
const { StatusCodes } = require("http-status-codes");
const http_responder = require("../utils/http_response");

const router = express.Router();

router.get("/health", (req, res) => {
	return http_responder.successResponse(res, null, "Series Server is up & Running", StatusCodes.OK, null);
});

router.get("/", (req, res) => {
	return http_responder.successResponse(res, null, null, StatusCodes.OK, null);
});

module.exports = router;
