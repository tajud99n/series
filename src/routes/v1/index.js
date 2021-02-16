const { Router } = require("express");
const user = require("./user");
const AuthController = require("../../controllers/AuthController");
const location = require("./location");
const character = require("./character");
const episode = require("./episode");
const CharacterController = require("../../controllers/CharacterController");

const router = Router();

router.use("/user", user);
router.use("/character", character);
router.use("/episode", episode);
router.use("/location", location);
router.post("/login", AuthController.loginUser);
router.get("/search", CharacterController.search);

module.exports = router;
