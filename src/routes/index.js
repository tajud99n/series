const express = require("express");

const api = require("./v1");

const router = express.Router();

router.use("/api/v1", api);

module.exports = router;
