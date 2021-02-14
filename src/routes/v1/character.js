const { Router } = require("express");
const CharacterController = require("../../controllers/CharacterController");
const { authToken, authUser } = require("../../middlewares/auth");

const router = Router();

router.post("/", authToken, authUser, CharacterController.createCharacter);

module.exports = router;