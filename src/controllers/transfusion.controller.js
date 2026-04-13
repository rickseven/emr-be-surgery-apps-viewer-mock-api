const fs = require("fs");
const path = require("path");

const JSON_PATH = path.join(__dirname, "../data/transfusion/transfusion.json");

const sendError = (res, status, message, errorCode) => {
  return res.status(status).json({
    isSuccessful: false,
    message,
    type: "",
    errorCode,
    payload: null,
  });
};

const loadTransfusionData = () => {
  const raw = fs.readFileSync(JSON_PATH, "utf-8").replace(/^\uFEFF/, "");
  return JSON.parse(raw);
};

const normalizeName = (value) => value.trim().toLowerCase();

const getTransfusions = (req, res) => {
  try {
    const data = loadTransfusionData();

    return res.json({
      isSuccessful: true,
      message: "",
      type: "",
      errorCode: 0,
      payload: {
        transfusions: data.transfusions,
      },
    });
  } catch (error) {
    return sendError(res, 500, "Failed to load transfusion data", 500);
  }
};

const upsertTransfusion = (req, res) => {
  const body = req.body || {};
  const rawId = body.transfusion_id ?? body.id;
  const name = typeof body.name === "string" ? body.name.trim() : "";
  const id = Number(rawId);

  if (!Number.isInteger(id) || id < 0) {
    return sendError(res, 400, "Invalid id/transfusion_id. Must be integer >= 0", 400);
  }

  if (!name) {
    return sendError(res, 400, "Invalid name. Name is required", 400);
  }

  try {
    const data = loadTransfusionData();
    let result;
    const normalizedInputName = normalizeName(name);

    if (id === 0) {
      const existing = data.transfusions.find(
        (t) => typeof t.name === "string" && normalizeName(t.name) === normalizedInputName
      );

      if (existing) {
        return res.json({
          isSuccessful: true,
          message: "",
          type: "",
          errorCode: 0,
          payload: {
            transfusions: existing,
          },
        });
      }

      const maxId = data.transfusions.reduce((max, t) => Math.max(max, t.id), 0);
      result = { id: maxId + 1, name };
      data.transfusions.push(result);
    } else {
      const index = data.transfusions.findIndex((t) => t.id === id);
      if (index === -1) {
        return sendError(res, 404, "Transfusion not found", 404);
      }
      data.transfusions[index].name = name;
      result = data.transfusions[index];
    }

    fs.writeFileSync(JSON_PATH, JSON.stringify(data, null, 2), "utf-8");

    return res.json({
      isSuccessful: true,
      message: "",
      type: "",
      errorCode: 0,
      payload: {
        transfusions: result,
      },
    });
  } catch (error) {
    return sendError(res, 500, "Failed to save transfusion data", 500);
  }
};

module.exports = { getTransfusions, upsertTransfusion };
