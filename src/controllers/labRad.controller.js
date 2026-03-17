const getBloodData = (req, res) => {
  const { patient_id } = req.query;
  const golonganDarahOptions = ["A", "B", "AB", "O"];
  const rhesusOptions = ["Positif", "Negatif"];

  const golongan_darah =
    golonganDarahOptions[Math.floor(Math.random() * golonganDarahOptions.length)];
  const rhesus =
    rhesusOptions[Math.floor(Math.random() * rhesusOptions.length)];

  console.log(`  -> patient_id: ${patient_id}`);
  console.log(`  -> golongan_darah: ${golongan_darah}, rhesus: ${rhesus}`);

  return res.json({
    isSuccessful: true,
    message: "",
    type: "",
    errorCode: 0,
    payload: { golongan_darah, rhesus },
  });
};

module.exports = {
  getBloodData,
};
