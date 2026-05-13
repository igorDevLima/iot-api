import { Request, Response } from 'express';
import { prisma } from '../../common/database/database';
import { SensorData } from '../../common/types/types';

export class SensorController {
  // POST /api/sensors - Enviar dados do ESP
  static async createSensorData(req: Request, res: Response) {
    try {
      const data: SensorData = req.body;
      
      const sensorData = await prisma.sensorData.create({
        data: {
          umidade: data.umidade,
          temperatura: data.temperatura,
          relay_on: data.relay_on,
          proximity: data.proximity,
          device_id: data.device_id,
        },
      });

      res.status(201).json({
        success: true,
        data: sensorData,
        message: 'Dados salvos com sucesso!'
      });
    } catch (error) {
      console.error('Erro ao salvar dados:', error);
      res.status(500).json({
        success: false,
        message: 'Erro interno do servidor'
      });
    }
  }

  // GET /api/sensors - Últimos dados
  static async getLatestSensorData(req: Request, res: Response) {
    try {
      const latest = await prisma.sensorData.findFirst({
        orderBy: { created_at: 'desc' }
      });

      res.json({
        success: true,
        data: latest || null
      });
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
      res.status(500).json({
        success: false,
        message: 'Erro interno do servidor'
      });
    }
  }

  // GET /api/sensors/last/:limit - Últimos N registros
  static async getLastNRecords(req: Request, res: Response) {
    try {
      const limitParam = Array.isArray(req.params.limit) ? req.params.limit[0] : req.params.limit;
      const limit = parseInt(limitParam ?? '10', 10) || 10;
      
      const records = await prisma.sensorData.findMany({
        take: limit,
        orderBy: { created_at: 'desc' }
      });

      res.json({
        success: true,
        count: records.length,
        data: records
      });
    } catch (error) {
      console.error('Erro ao buscar registros:', error);
      res.status(500).json({
        success: false,
        message: 'Erro interno do servidor'
      });
    }
  }

  // GET /api/sensors/chart?hours=24 - Dados para gráfico
  static async getChartData(req: Request, res: Response) {
    try {
      const hours = parseInt(req.query.hours as string) || 24;
      const since = new Date(Date.now() - hours * 60 * 60 * 1000);

      const data = await prisma.sensorData.findMany({
        where: {
          created_at: {
            gte: since
          }
        },
        orderBy: { created_at: 'asc' }
      });

      res.json({
        success: true,
        data,
        period: `${hours}h`
      });
    } catch (error) {
      console.error('Erro ao buscar dados do gráfico:', error);
      res.status(500).json({
        success: false,
        message: 'Erro interno do servidor'
      });
    }
  }
}