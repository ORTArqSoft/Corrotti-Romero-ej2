import DatoRecord from '../models/datoModel';

export const getAllDatoRecords = async () => {
  return await DatoRecord.find();
};

export const createDatoRecord = async (recordData: typeof DatoRecord) => {
  const record = new DatoRecord(recordData);
  return await record.save();
};

