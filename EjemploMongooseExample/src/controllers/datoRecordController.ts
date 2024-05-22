//Este controlador le pega al servicio que se comunica con la BD de mongo

import { Request, Response } from 'express';
import * as datoRecordService from '../services/DatoRecordService';

export const getAllDatoRecords = async (req: Request, res: Response) => {
  const records = await datoRecordService.getAllDatoRecords();
  res.json(records);
};

export const createDatoRecord = async (req: Request, res: Response) => {
  const record = await datoRecordService.createDatoRecord(req.body);
  res.status(201).json(record);
};


