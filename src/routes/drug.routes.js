const { Router } = require("express");
const { getDrugs } = require("../controllers/drug.controller");

const router = Router();

router.get("/", getDrugs);

module.exports = router;
