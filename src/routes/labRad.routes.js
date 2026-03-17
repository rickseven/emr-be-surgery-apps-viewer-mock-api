const { Router } = require("express");
const { getBloodData } = require("../controllers/labRad.controller");

const router = Router();

router.get("/get-blood-data-by-patient", getBloodData);

module.exports = router;
