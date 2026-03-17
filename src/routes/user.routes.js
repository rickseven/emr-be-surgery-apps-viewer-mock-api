const { Router } = require("express");
const { userCheck } = require("../controllers/user.controller");

const router = Router();

router.post("/user-check", userCheck);

module.exports = router;
