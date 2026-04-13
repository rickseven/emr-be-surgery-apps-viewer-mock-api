const fs = require("fs");
const path = require("path");

const JSON_PATH = path.join(__dirname, "../data/drug/drug.json");

const getDrugs = (req, res) => {
  const { operationScheduleId } = req.query;

  if (!operationScheduleId) {
    return res.status(400).json({
      isSuccessful: false,
      message: "Query param 'operationScheduleId' is required",
      type: "",
      errorCode: 400,
      payload: null,
    });
  }

  console.log(`  -> operationScheduleId: ${operationScheduleId}`);

  const raw = fs.readFileSync(JSON_PATH, "utf-8").replace(/^\uFEFF/, "");
  const data = JSON.parse(raw);

  return res.json({
    isSuccessful: true,
    message: "",
    type: "",
    errorCode: 0,
    payload: {
      drugs: data.drugs,
    },
  });
};

module.exports = { getDrugs };
