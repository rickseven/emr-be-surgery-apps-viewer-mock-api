const { Router } = require("express");
const {
  getPatientMonitoringItems,
  getPatientMonitoringResults,
  upsertItem,
  upsertResults,
} = require("../controllers/patientMonitoring.controller");

const router = Router();

router.get("/items/:operationScheduleId/:observationDate", getPatientMonitoringItems);
router.get("/results/:operationScheduleId/:observationDate", getPatientMonitoringResults);
router.post("/items", upsertItem);
router.post("/results", upsertResults);

module.exports = router;
