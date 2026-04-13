const { Router } = require("express");
const { getGas } = require("../controllers/gas.controller");

const router = Router();

router.get("/", getGas);

module.exports = router;
