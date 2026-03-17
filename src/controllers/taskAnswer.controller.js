const fs = require("fs");
const path = require("path");

const ANSWER_JSON_PATH = path.join(
  __dirname,
  "../data/taskAnswer/answer.json"
);

const readAnswerData = () => {
  const raw = fs.readFileSync(ANSWER_JSON_PATH, "utf-8");
  return JSON.parse(raw);
};

const writeAnswerData = (data) => {
  fs.writeFileSync(ANSWER_JSON_PATH, JSON.stringify(data, null, 2), "utf-8");
};

const buildResponse = (data) => {
  return {
    isSuccessful: true,
    message: "",
    type: "",
    errorCode: 0,
    payload: {
      taskanswerid: "00000000-0000-0000-0000-000000000000",
      operationscheduleid: data.operationscheduleid || "00000000-0000-0000-0000-000000000000",
      operationprocedureid: "00000000-0000-0000-0000-000000000000",
      isdischarge: false,
      taskid: data.taskid || 0,
      status: null,
      answer: data.answer || {},
      is_draft: data.is_draft || false,
      implan: null,
      spesiment: null,
      total_jumlah_spesiment: 0,
      coretan_laporan_operasi: null,
      last_save: data.last_save || null,
    },
  };
};

const getTaskAnswer = (req, res) => {
  const { operation_schedule_id, task_id } = req.query;

  console.log(`  -> operation_schedule_id: ${operation_schedule_id}`);
  console.log(`  -> task_id: ${task_id}`);
  console.log(`  -> simulating loading delay of 5 seconds...`);

  setTimeout(() => {
    const answer = readAnswerData();
    return res.json(buildResponse(answer));
  }, 5000);
};

const createTaskAnswer = (req, res) => {
  const { operationscheduleid, DeviceId, taskid, answer, is_draft, isactive } = req.body;

  console.log(`  -> operationscheduleid: ${operationscheduleid}`);
  console.log(`  -> taskid: ${taskid}`);
  console.log(`  -> is_draft: ${is_draft}`);
  console.log(`  -> simulating loading delay of 5 seconds...`);

  const dataToSave = {
    operationscheduleid: operationscheduleid || "",
    DeviceId: DeviceId || "",
    taskid: taskid || 0,
    answer: answer || {},
    is_draft: is_draft || false,
    isactive: isactive !== undefined ? isactive : true,
    last_save: new Date().toISOString(),
  };
  writeAnswerData(dataToSave);
  console.log(`  -> Answer saved`);

  setTimeout(() => {
    const savedData = readAnswerData();
    return res.json(buildResponse(savedData));
  }, 5000);
};

module.exports = {
  getTaskAnswer,
  createTaskAnswer,
};
