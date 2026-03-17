const { Router } = require("express");
const {
  createOperationTask,
} = require("../controllers/operationTask.controller");

const router = Router();

router.post("/", createOperationTask);

module.exports = router;
