const fs = require("fs");
const path = require("path");
const moment = require("moment-timezone");

const ITEMS_JSON_PATH = path.join(
  __dirname,
  "../data/patientMonitoring/items.json"
);

const RESULTS_JSON_PATH = path.join(
  __dirname,
  "../data/patientMonitoring/results.json"
);

const getPatientMonitoringItems = (req, res) => {
  const { operationScheduleId, observationDate } = req.params;

  console.log(`  -> operationScheduleId: ${operationScheduleId}`);
  console.log(`  -> observationDate: ${observationDate}`);

  const raw = fs.readFileSync(ITEMS_JSON_PATH, "utf-8").replace(/^\uFEFF/, "");
  const payload = JSON.parse(raw);

  const targetDate = moment(observationDate, ["YYYY-MM-DD", moment.ISO_8601], true);
  if (!targetDate.isValid()) {
    return res.status(400).json({
      isSuccessful: false,
      message: "Invalid observationDate format. Use YYYY-MM-DD or ISO 8601",
    });
  }

  const filteredItems = payload.items.filter((item) => {
    if (!item.observation_date) {
      return true;
    }

    const itemDate = moment(item.observation_date, ["YYYY-MM-DD", moment.ISO_8601], true);
    return itemDate.isValid() && itemDate.format("YYYY-MM-DD") === targetDate.format("YYYY-MM-DD");
  });

  const filteredPayload = {
    items: filteredItems,
  };

  return res.json({
    isSuccessful: true,
    message: "Success",
    payload: filteredPayload,
  });
};

const getPatientMonitoringResults = (req, res) => {
  const { operationScheduleId, observationDate } = req.params;

  console.log(`  -> operationScheduleId: ${operationScheduleId}`);
  console.log(`  -> observationDate: ${observationDate}`);

  const raw = fs.readFileSync(RESULTS_JSON_PATH, "utf-8").replace(/^\uFEFF/, "");
  const payload = JSON.parse(raw);

  const targetDate = moment(observationDate, ["YYYY-MM-DD", moment.ISO_8601], true);
  if (!targetDate.isValid()) {
    return res.status(400).json({
      isSuccessful: false,
      message: "Invalid observationDate format. Use YYYY-MM-DD or ISO 8601",
    });
  }

  const filteredResults = payload.results.filter((result) => {
    const resultDate = moment(result.observation_date, moment.ISO_8601, true);
    return resultDate.isValid() && resultDate.format("YYYY-MM-DD") === targetDate.format("YYYY-MM-DD");
  });

  const filteredPayload = {
    latest_modified_date: payload.latest_modified_date,
    is_discharged: typeof payload.is_discharged === "boolean" ? payload.is_discharged : false,
    is_verified: typeof payload.is_verified === "boolean" ? payload.is_verified : false,
    results: filteredResults,
  };

  setTimeout(() => {
    return res.json({
      isSuccessful: true,
      message: "Success",
      payload: filteredPayload,
    });
  }, 3000);
};

const upsertItem = (req, res) => {
  const { operation_schedule_id, item } = req.body;

  console.log(`  -> operation_schedule_id: ${operation_schedule_id}`);
  console.log(`  -> item_id: ${item?.item_id}`);
  console.log(`  -> observation_date: ${item?.observation_date}`);

  if (!item) {
    return res.status(400).json({
      isSuccessful: false,
      message: "Field 'item' is required",
    });
  }

  const raw = fs.readFileSync(ITEMS_JSON_PATH, "utf-8").replace(/^\uFEFF/, "");
  const data = JSON.parse(raw);

  if (item.item_id === 0) {
    // Add: generate new item_id
    const maxId = data.items.reduce((max, i) => Math.max(max, i.item_id), 0);
    const newItem = { ...item, item_id: maxId + 1 };
    data.items.push(newItem);
    fs.writeFileSync(ITEMS_JSON_PATH, JSON.stringify(data, null, 2), "utf-8");
    return res.json({
      isSuccessful: true,
      message: "Item added successfully",
      payload: newItem,
    });
  } else {
    // Update
    const index = data.items.findIndex((i) => i.item_id === item.item_id);
    if (index === -1) {
      return res.status(404).json({
        isSuccessful: false,
        message: `Item with item_id ${item.item_id} not found`,
      });
    }
    data.items[index] = { ...data.items[index], ...item };
    fs.writeFileSync(ITEMS_JSON_PATH, JSON.stringify(data, null, 2), "utf-8");
    return res.json({
      isSuccessful: true,
      message: "Item updated successfully",
      payload: data.items[index],
    });
  }
};

const upsertResults = (req, res) => {
  const { operationscheduleid, results, is_discharged, is_verified } = req.body;

  console.log(`  -> operationscheduleid: ${operationscheduleid}`);
  console.log(`  -> results count: ${results?.length}`);

  if (!Array.isArray(results) || results.length === 0) {
    return res.status(400).json({
      isSuccessful: false,
      message: "Field 'results' must be a non-empty array",
    });
  }

  const raw = fs.readFileSync(RESULTS_JSON_PATH, "utf-8").replace(/^\uFEFF/, "");
  const data = JSON.parse(raw);

  const updated = [];
  const added = [];

  for (const result of results) {
    // Pastikan observation_date selalu diubah ke waktu lokal Asia/Jakarta
    let obsDate = result.observation_date
      ? moment.tz(result.observation_date, "Asia/Jakarta").format("YYYY-MM-DDTHH:mm:ss")
      : moment().tz("Asia/Jakarta").format("YYYY-MM-DDTHH:mm:ss");
    const resultWithTz = { ...result, observation_date: obsDate };
    if (result.result_id === 0) {
      const maxId = data.results.reduce((max, r) => Math.max(max, r.result_id), 0);
      const newResult = { ...resultWithTz, result_id: maxId + 1 };
      data.results.push(newResult);
      added.push(newResult);
    } else {
      const index = data.results.findIndex((r) => r.result_id === result.result_id);
      if (index !== -1) {
        data.results[index] = { ...data.results[index], ...resultWithTz };
        updated.push(data.results[index]);
      } else {
        const maxId = data.results.reduce((max, r) => Math.max(max, r.result_id), 0);
        const newResult = { ...resultWithTz, result_id: maxId + 1 };
        data.results.push(newResult);
        added.push(newResult);
      }
    }
  }

  // Set latest_modified_date ke waktu sekarang di zona Asia/Jakarta
  const latest_modified_date = moment().tz("Asia/Jakarta").format("YYYY-MM-DDTHH:mm:ss");
  data.latest_modified_date = latest_modified_date;
  if (typeof is_discharged === "boolean") {
    data.is_discharged = is_discharged;
  }
  if (typeof is_verified === "boolean") {
    data.is_verified = is_verified;
  }

  fs.writeFileSync(RESULTS_JSON_PATH, JSON.stringify(data, null, 2), "utf-8");

  setTimeout(() => {
    return res.json({
      isSuccessful: true,
      message: "",
      payload: {
        latest_modified_date,
        is_discharged: typeof data.is_discharged === "boolean" ? data.is_discharged : false,
        is_verified: typeof data.is_verified === "boolean" ? data.is_verified : false,
        results: data.results
      }
    });
  }, 3000); // Dummy timer: 3 detik
};

const verification = (req, res) => {
  const { user_name, password, operation_schedule_id } = req.body;

  console.log(`  -> user_name: ${user_name}`);
  console.log(`  -> operation_schedule_id: ${operation_schedule_id}`);

  if (!user_name || !password || !operation_schedule_id) {
    return res.status(400).json({
      status: null,
      isSuccessful: false,
      message: "Fields 'user_name', 'password', and 'operation_schedule_id' are required",
      type: "",
      errorCode: 400,
      payload: null,
    });
  }

  return res.json({
    status: null,
    isSuccessful: true,
    message: "",
    type: "",
    errorCode: 0,
  });
};

module.exports = { getPatientMonitoringItems, getPatientMonitoringResults, upsertItem, upsertResults, verification };
