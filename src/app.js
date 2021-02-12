const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const logger = require("./config/logger");
const http_responder = require("./utils/http_response");
const { StatusCodes } = require("http-status-codes");
const routes = require("./routes");

// Init express
const app = express();

app.disable("x-powered-by");

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use(routes);

// handle errors
app.all("/*", (req, res) => {
    return http_responder.errorResponse(
        res,
        "not_found",
        StatusCodes.NOT_FOUND
    );
});

app.use((err, req, res) => {
    logger.error(JSON.stringify(err.stack));
    return http_responder.errorResponse(
        res,
        err.message,
        err.status || StatusCodes.INTERNAL_SERVER_ERROR
    );
});


module.exports = { app };
