const { Router } = require("express");
const EpisodeController = require("../../controllers/EpisodeController");
const { authToken, authUser } = require("../../middlewares/auth");

const router = Router();

router.post("/", authToken, authUser, EpisodeController.createEpisode);
router.post("/add-character", authToken, authUser, EpisodeController.addCharacter);

module.exports = router;
