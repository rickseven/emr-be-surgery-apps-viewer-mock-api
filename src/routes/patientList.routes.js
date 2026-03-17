const { Router } = require("express");
const {
  getPatientHeader,
} = require("../controllers/patientList.controller");

const router = Router();

router.get(
  "/get-patient-header/:operation_schedule_id",
  getPatientHeader
);

module.exports = router;
