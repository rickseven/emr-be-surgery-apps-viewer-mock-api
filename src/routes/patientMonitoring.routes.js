const { Router } = require("express");
const {
  getPatientMonitoringItems,
  getPatientMonitoringResults,
  upsertItem,
  upsertResults,
  verification,
  deleteItem,
} = require("../controllers/patientMonitoring.controller");

const router = Router();

router.get("/items/:operationScheduleId/:observationDate", getPatientMonitoringItems);
router.get("/results/:operationScheduleId/:observationDate", getPatientMonitoringResults);
router.post("/items", upsertItem);
router.post("/results", upsertResults);
router.post("/verification", verification);
router.delete("/items/:itemId/:operationScheduleId", deleteItem);

module.exports = router;
