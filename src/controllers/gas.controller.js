const fs = require("fs");
const path = require("path");

const JSON_PATH = path.join(__dirname, "../data/gas/gas.json");

const getGas = (req, res) => {
  const raw = fs.readFileSync(JSON_PATH, "utf-8").replace(/^\uFEFF/, "");
  const data = JSON.parse(raw);

  return res.json({
    isSuccessful: true,
    message: "",
    type: "",
    errorCode: 0,
    payload: {
      gas: data.gas,
    },
  });
};

module.exports = { getGas };
