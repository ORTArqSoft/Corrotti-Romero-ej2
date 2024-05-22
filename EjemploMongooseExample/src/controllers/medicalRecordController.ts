//Este controlador le pega al servicio que se comunica con la BD de mongo

import { Request, Response } from 'express';
import * as medicalRecordService from '../services/DatoRecordService';

export const getAllDatoRecords = async (req: Request, res: Response) => {
  const records = await medicalRecordService.getAllMedicalRecords();
  res.json(records);
};

export const createDatoRecord = async (req: Request, res: Response) => {
  const record = await medicalRecordService.createMedicalRecord(req.body);
  res.status(201).json(record);
};


