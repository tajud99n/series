const { Router } = require("express");
const user = require("./user");
const AuthController = require("../../controllers/AuthController");
const location = require("./location");

const router = Router();

router.use("/user", user);
router.use("/location", location);
router.post("/login", AuthController.loginUser);

module.exports = router;
