const { Router } = require("express");
const user = require("./user");
const AuthController = require("../../controllers/AuthController");

const router = Router();

router.use("/user", user);
router.post("/login", AuthController.loginUser);

module.exports = router;
