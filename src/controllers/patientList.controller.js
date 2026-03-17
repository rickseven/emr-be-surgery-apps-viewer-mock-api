const getPatientHeader = (req, res) => {
  const { operation_schedule_id } = req.params;
  const { deviceId } = req.query;

  console.log(`  -> operation_schedule_id: ${operation_schedule_id}`);
  console.log(`  -> deviceId: ${deviceId}`);

  return res.json({
    isSuccessful: true,
    message: "",
    type: "",
    errorCode: 0,
    payload: {
      operation_schedule_id,
      operation_schedule_date: "2026-02-04T00:00:00",
      incision_time: "22:00:00",
      anesthetia_type_name: "Lokal",
      is_cito: true,
      organization: {
        organizationId: 2,
        companyName: "SILOAM HOSPITALS LIPPO VILLAGE",
        address:
          "JALAN SILOAM NO.6 TANGERANG\r\nTELP : 021 - 5460055\r\nFAX  : 021 - 54210090",
      },
      admissionData: [
        {
          admission_type_id: 2,
          admission_number: 2000019817601,
          admission_date: "2025-04-30T09:55:42.1966673",
          admission_no: "IPA2504300001",
          admission_type: "Inpatient",
        },
      ],
      patientData: [
        {
          patient_id: 2000005414480,
          name: "MIKHAEL KEN RIKO",
          birth_date: "2022-02-07T00:00:00",
          gender: 1,
          mr_number: 1202225,
          jenis_pembayaran: "Private",
          bedno: "ICU-327",
          wardname: "ICU - BETHANY 3F",
        },
      ],
      doctorOperator: [
        {
          doctor_id: 2000000732,
          doctor_name:
            "Prof. Dr. Dr. dr. Eka J. Wahjoepramono, SpBS, K",
          procedure_name_id: 0,
          procedure_name: "TES TIMELINE 4",
          operation_procedure_id: "815ff494-7011-4d9b-9373-2abd30cfc467",
        },
      ],
      multipleDoctorOperator: [
        {
          doctor_id: 2000000732,
          doctor_name:
            "Prof. Dr. Dr. dr. Eka J. Wahjoepramono, SpBS, K",
          procedure_name: "TES TIMELINE 4",
          procedure_surgery: [
            {
              procedure_name_id: 0,
              procedure_name: "TES TIMELINE 4",
              operation_procedure_id:
                "815ff494-7011-4d9b-9373-2abd30cfc467",
            },
          ],
        },
      ],
      viewUpdateUrlIframe:
        "/healthrecord/Pages/FormViewer/MedicationAllergies?orgid=2&ptnid=2000005414480&usrid=2000000605&SttId=1&EncId=00000000-0000-0000-0000-000000000000&ButtonFlag=SUBMIT",
      radDataUrl:
        "/viewerresult/Form/result?idPatient=2000005414480&idOrganization=2&vwMode=rad",
      labDataUrl:
        "/viewerresult/Form/result?idPatient=2000005414480&idOrganization=2&vwMode=lab",
      docDataUrl:
        "/ipd-doctor/Form/General/Viewer/DocumentRepository.aspx?organization_id=2&user_id=0&admission_id=2000019817601&patient_id=2000005414480&ward_id=0&user_name=3n16&doctor_id=0&user_type=1",
      patientHistoryUrl:
        "/viewer/form/formviewer/patienthistory/PH_MR?OrganizationId=2&PatientId=2000005414480&PrintBy=3n16&DoctorId=0",
      docDataSurgeryCareUrl:
        "/otscheduling/Form/General/DocumentRepositorySurgeryCare.aspx?patient_id=2000005414480&admission_id=2000019817601&organization_id=2",
      healthInfoData: {
        patient_id: 2000005414480,
        isALG: true,
        isTBC: false,
        isHCS: false,
        isHBS: false,
        isHAD: false,
        isPRT: false,
        isRHN: false,
        isMRS: false,
        isCOVID: false,
      },
      taskPercentageVerified: {
        total_verified: 21,
        current_verified: 1,
      },
      schedule_timeline_id: "df271666-f8f4-4f14-8dfe-891a39d5e195",
      is_multiple_procedure: false,
      is_discharge: false,
      is_hint_medicalsupplies: [
        {
          doctor_id: 2000000732,
          is_hint_medicalsupplies: true,
        },
      ],
      config_header: [
        {
          name: "laporan_operasi",
          value: "TIME_OUT",
          isdisabled: true,
          note: "",
        },
        {
          name: "document_viewer",
          value: "False",
          isdisabled: true,
          note: "",
        },
        {
          name: "pasien_dipindahkan",
          value: "",
          isdisabled: false,
          note: "",
        },
      ],
      all_signout_verified: false,
    },
  });
};

module.exports = {
  getPatientHeader,
};
