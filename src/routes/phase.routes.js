const { Router } = require("express");
const { getPhase } = require("../controllers/phase.controller");

const router = Router();

router.get("/:operation_schedule_id", getPhase);
router.get("/multiple-procedure/:operation_schedule_id", getPhase);

module.exports = router;
