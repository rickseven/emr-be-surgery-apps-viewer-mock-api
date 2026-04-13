const { Router } = require("express");
const { getTransfusions, upsertTransfusion } = require("../controllers/transfusion.controller");

const router = Router();

router.get("/", getTransfusions);
router.post("/", upsertTransfusion);

module.exports = router;
