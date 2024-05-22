import mongoose from 'mongoose';

const medicalRecordSchema = new mongoose.Schema({
  patientName: { type: String, required: true },
  doctorName: { type: String, required: true },
  visitDate: { type: Date, required: true },
  diagnosis: { type: String, required: true }
});

const MedicalRecord = mongoose.model('MedicalRecord', medicalRecordSchema);
export default MedicalRecord;
