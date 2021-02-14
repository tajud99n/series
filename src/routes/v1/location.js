const { Router } = require("express");
const LocationController = require("../../controllers/LocationController");
const { authToken, authUser } = require("../../middlewares/auth");

const router = Router();

router.post("/", authToken, authUser, LocationController.createLocation);

module.exports = router;
