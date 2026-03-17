const { Router } = require("express");
const {
  getPreInductionDocument,
  getPreAnesthesiaDocument,
} = require("../controllers/listDocumentSurgery.controller");

const router = Router();

router.get(
  "/get-pre-induction-document/:operationScheduleId",
  getPreInductionDocument
);

router.get(
  "/get-pre-anesthesia-document/:operationScheduleId",
  getPreAnesthesiaDocument
);

module.exports = router;
