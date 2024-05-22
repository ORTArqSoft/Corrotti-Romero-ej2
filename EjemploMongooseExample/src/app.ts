import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import * as datoRecordController from "./controllers/datoRecordController";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
//Este es el router de express que define las URL. Expone la URL y lo deriva a un metodo del controller. A su vez el controller le va con los servicios de MONGO

app.get("/dato-records", datoRecordController.getAllDatoRecords);
app.post("/dato-records", datoRecordController.createDatoRecord);

console.log("process.env.MONGO_URI ", process.env.MONGO_URI);
mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
