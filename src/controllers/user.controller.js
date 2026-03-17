const fs = require("fs");
const path = require("path");

const MEMBER_JSON_PATH = path.join(__dirname, "../data/operationTeam/member.json");

const readMemberData = () => {
  const raw = fs.readFileSync(MEMBER_JSON_PATH, "utf-8");
  return JSON.parse(raw);
};

const userCheck = (req, res) => {
  const { user_name, password, operation_schedule_id, task_id, team_role_id, device_id, app_id } = req.body;

  console.log(`  -> user_name: ${user_name}`);
  console.log(`  -> operation_schedule_id: ${operation_schedule_id}`);
  console.log(`  -> task_id: ${task_id}`);

  const { payload: members } = readMemberData();
  const member = members.find(
    (m) => m.user_name === user_name && m.password === password
  );

  if (!member) {
    console.log(`  -> Login failed: invalid username or password`);
    return res.json({
      status: null,
      isSuccessful: false,
      message: "Username atau password salah",
      type: "",
      errorCode: 401,
      errors: ["Invalid username or password"],
      payload: null,
      isDownloadFile: false,
      content: "",
      fileName: "",
      contentType: "",
    });
  }

  console.log(`  -> Login success for: ${member.full_name}`);

  return res.json({
    status: null,
    isSuccessful: true,
    message: "",
    type: "",
    errorCode: 0,
    errors: [],
    payload: {
      organization_id: 4,
      hope_organization_id: 2,
      mobile_organization_id: "39764039-37b9-4176-a025-ef7b2e124ba4",
      ax_organization_id: "2001",
      role_id: "79b02b7e-0f4c-4167-9dfa-17f9f7b4f5a0",
      role_name: "NurseOT",
      user_id: "daf93d2c-207a-484a-8e0c-52bbbfa2e5d2",
      user_name: member.user_name,
      full_name: member.full_name,
      hope_user_id: member.doctor_id,
      email: "",
      birthday: "1900-01-01T00:00:00",
      hp: null,
      user_role_id: 70095,
    },
    isDownloadFile: false,
    content: "",
    fileName: "",
    contentType: "",
  });
};

module.exports = {
  userCheck,
};
