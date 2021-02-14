const { Router } = require("express");
const EpisodeController = require("../../controllers/EpisodeController");
const { authToken, authUser } = require("../../middlewares/auth");

const router = Router();

router.post("/", authToken, authUser, EpisodeController.createEpisode);

module.exports = router;
