const fs = require("fs");
const path = require("path");

const MEMBER_JSON_PATH = path.join(
  __dirname,
  "../data/operationTeam/member.json"
);

const readMemberData = () => {
  const raw = fs.readFileSync(MEMBER_JSON_PATH, "utf-8");
  return JSON.parse(raw);
};

const writeMemberData = (data) => {
  fs.writeFileSync(MEMBER_JSON_PATH, JSON.stringify(data, null, 2), "utf-8");
};

const generateRandomDoctorId = () => {
  return 2000000000 + Math.floor(Math.random() * 9999);
};

const generateRandomFullName = (userName) => {
  const prefixes = ["dr.", "Dr.", "Ns.", ""];
  const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
  const formatted = userName
    .split(".")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
  return prefix ? `${prefix} ${formatted}` : formatted;
};

const ROLE_LABELS = {
  perawat_ipd: "Perawat IPD",
  perawat_ok: "Perawat OK",
  dokter_bedah: "Dokter Bedah",
  dokter_anestesi: "Dokter Anestesi",
};

const TASK_LABELS = {
  1: "Checklist Persiapan Operasi",
  2: "Sign In",
  3: "Time Out",
  4: "Sign Out",
};

const formatDateTime = (date) => {
  const yy = String(date.getFullYear()).slice(-2);
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  const hh = String(date.getHours()).padStart(2, "0");
  const min = String(date.getMinutes()).padStart(2, "0");
  return `${dd} ${mm} ${yy} ${hh}:${min}`;
};

const createOperationTask = (req, res) => {
  const { task_id, user_role, user_name, password } = req.body;

  console.log(`  -> user_name: ${user_name}`);

  const memberData = readMemberData();
  let member = memberData.payload.find((m) => m.user_name === user_name);

  if (!member) {
    member = {
      user_name,
      full_name: generateRandomFullName(user_name),
      doctor_id: generateRandomDoctorId(),
      password: password || "",
    };
    memberData.payload.push(member);
    writeMemberData(memberData);
    console.log(`  -> New user added: ${user_name}`);
  } else {
    if (member.password !== password) {
      console.log(`  -> Invalid password for user: ${user_name}`);
      console.log(`  -> simulating loading delay of 5 seconds...`);
      return setTimeout(() => {
        return res.json({
          status: null,
          isSuccessful: false,
          message: "Username or Password is incorrect!",
          type: "",
          errorCode: 0,
          errors: [],
          payload: {},
          isDownloadFile: false,
          content: "",
          fileName: "",
          contentType: "",
        });
      }, 5000);
    }
  }

  const roleLabel = ROLE_LABELS[user_role] || user_role;
  const taskLabel = TASK_LABELS[task_id] || `Task ${task_id}`;
  const timestamp = formatDateTime(new Date());

  console.log(`  -> simulating loading delay of 5 seconds...`);
  setTimeout(() => {
    return res.json({
      status: null,
      isSuccessful: true,
      message: `${taskLabel}, berhasil diverifikasi ${roleLabel} ${member.full_name} pada ${timestamp}`,
      type: "",
      errorCode: 0,
      errors: [],
      payload: {
        task_id,
        user_role,
        user_name: member.user_name,
        password,
        doctor_name: member.full_name,
      },
      isDownloadFile: false,
      content: "",
      fileName: "",
      contentType: "",
    });
  }, 5000);
};

module.exports = {
  createOperationTask,
};
