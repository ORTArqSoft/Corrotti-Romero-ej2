import MedicalRecord from '../models/medicalRecord';

export const getAllMedicalRecords = async () => {
  return await MedicalRecord.find();
};

export const createMedicalRecord = async (recordData: any) => {
  const record = new MedicalRecord(recordData);
  return await record.save();
};

export const getRecordsByDate = async (startDate: Date, endDate: Date) => {
  return await MedicalRecord.find({
    visitDate: { $gte: startDate, $lte: endDate }
  });
};

export const getConsultationCountsByDoctor = async () => {
  return await MedicalRecord.aggregate([
    {
      $group: {
        _id: "$doctorName",
        count: { $sum: 1 }
      }
    },
    {
      $sort: { count: -1 }
    }
  ]);
};
