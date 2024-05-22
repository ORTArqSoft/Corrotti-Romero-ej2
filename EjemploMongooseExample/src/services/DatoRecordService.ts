import DatoRecord from '../models/datoModel';

export const getAllDatoRecords = async () => {
  return await DatoRecord.find();
};

export const createDatoRecord = async (recordData: any) => {
  const record = new DatoRecord(recordData);
  return await record.save();
};

