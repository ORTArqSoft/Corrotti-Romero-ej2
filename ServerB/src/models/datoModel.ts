import mongoose from 'mongoose';

const datoRecordSchema = new mongoose.Schema({
  codigoUnicoDeMatch: { type: Number, required: true },
  nombre: { type: String, required: true },
  fecha: { type: Date, required: true },
  diagnosis: { type: String, required: true },
  dividendoGanaLocal: { type: Number, required: true },
  dividendoGanaVisitante : { type: Number, required: true },
  dividendoEmpate : { type: Number, required: true },
  deporte : { type: String, required: true },
});

const DatoRecord = mongoose.model('DatoRecord', datoRecordSchema);
export default DatoRecord;
