const { Router } = require("express");
const operationTeamRoutes = require("./operationTeam.routes");
const operationTaskRoutes = require("./operationTask.routes");
const patientListRoutes = require("./patientList.routes");
const taskAnswerRoutes = require("./taskAnswer.routes");
const phaseRoutes = require("./phase.routes");
const labRadRoutes = require("./labRad.routes");
const userRoutes = require("./user.routes");
const listDocumentSurgeryRoutes = require("./listDocumentSurgery.routes");
const patientMonitoringRoutes = require("./patientMonitoring.routes");
const transfusionRoutes = require("./transfusion.routes");
const fluidRoutes = require("./fluid.routes");
const gasRoutes = require("./gas.routes");
const drugRoutes = require("./drug.routes");

const router = Router();

router.use("/OperationTeam", operationTeamRoutes);
router.use("/OperationTask", operationTaskRoutes);
router.use("/PatientList", patientListRoutes);
router.use("/TaskAnswer", taskAnswerRoutes);
router.use("/Phase", phaseRoutes);
router.use("/LabRad", labRadRoutes);
router.use("/User", userRoutes);
router.use("/ListDocumentSurgery", listDocumentSurgeryRoutes);
router.use("/PatientMonitoring", patientMonitoringRoutes);
router.use("/Master/Transfusion", transfusionRoutes);
router.use("/Master/Fluid", fluidRoutes);
router.use("/Master/Gas", gasRoutes);
router.use("/Master/Drug", drugRoutes);

module.exports = router;
