//Este controlador le pega al servicio que se comunica con la BD de mongo

import { Request, Response } from 'express';
import * as medicalRecordService from '../services/medicalRecordService';

export const getAllMedicalRecords = async (req: Request, res: Response) => {
  const records = await medicalRecordService.getAllMedicalRecords();
  res.json(records);
};

export const createMedicalRecord = async (req: Request, res: Response) => {
  const record = await medicalRecordService.createMedicalRecord(req.body);
  res.status(201).json(record);
};

export const getRecordsByDate = async (req: Request, res: Response) => {
  const { startDate, endDate } = req.query;
  const records = await medicalRecordService.getRecordsByDate(new Date(startDate as string), new Date(endDate as string));
  res.json(records);
};

export const getConsultationCountsByDoctor = async (req: Request, res: Response) => {
  const counts = await medicalRecordService.getConsultationCountsByDoctor();
  res.json(counts);
};
