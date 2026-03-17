const fs = require("fs");
const path = require("path");

const PHASE_JSON_PATH = path.join(__dirname, "../data/phase/phase.json");

const readPhaseData = () => {
  const raw = fs.readFileSync(PHASE_JSON_PATH, "utf-8");
  return JSON.parse(raw);
};

const getPhase = (req, res) => {
  const { operation_schedule_id } = req.params;

  console.log(`  -> operation_schedule_id: ${operation_schedule_id}`);

  const phases = readPhaseData();

  return res.json({
    isSuccessful: true,
    message: "",
    type: "",
    errorCode: 0,
    payload: phases,
  });
};

module.exports = {
  getPhase,
};
