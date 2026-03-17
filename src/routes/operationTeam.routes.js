const { Router } = require("express");
const { getMember } = require("../controllers/operationTeam.controller");

const router = Router();

router.get("/member", getMember);

module.exports = router;
