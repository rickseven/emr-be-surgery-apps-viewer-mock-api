const { Router } = require("express");
const { getFluids } = require("../controllers/fluid.controller");

const router = Router();

router.get("/", getFluids);

module.exports = router;
