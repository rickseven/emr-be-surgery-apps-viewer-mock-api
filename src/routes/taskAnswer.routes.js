const { Router } = require("express");
const {
  getTaskAnswer,
  createTaskAnswer,
} = require("../controllers/taskAnswer.controller");

const router = Router();

router.get("/", getTaskAnswer);
router.post("/", createTaskAnswer);

module.exports = router;
