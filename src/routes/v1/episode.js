const { Router } = require("express");
const EpisodeController = require("../../controllers/EpisodeController");
const { authToken, authUser } = require("../../middlewares/auth");
const CommentController = require("../../controllers/CommentController");

const router = Router();

router.post("/", authToken, authUser, EpisodeController.createEpisode);
router.post("/add-character", authToken, authUser, EpisodeController.addCharacter);
router.post("/:episodeId/comment", authToken, authUser, CommentController.addComment);

module.exports = router;
