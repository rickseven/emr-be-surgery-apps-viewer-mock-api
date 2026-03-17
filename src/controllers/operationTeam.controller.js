const fs = require("fs");
const path = require("path");

const MEMBER_JSON_PATH = path.join(
  __dirname,
  "../data/operationTeam/member.json"
);

const getMember = (req, res) => {
  const { operation_schedule_id, team_role_id } = req.query;

  console.log(
    `  -> operation_schedule_id: ${operation_schedule_id}, team_role_id: ${team_role_id}`
  );

  console.log(`  -> simulating loading delay of 5 seconds...`);
  const memberData = JSON.parse(fs.readFileSync(MEMBER_JSON_PATH, "utf-8"));
  setTimeout(() => {
    return res.json(memberData);
  }, 5000);
};

module.exports = {
  getMember,
};
