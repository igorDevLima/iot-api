import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import sensorRoutes from '../feat/sensor/sensorRoutes';

// Carregar variáveis de ambiente
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Rotas
app.use('/api', sensorRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Rota não encontrada' });
});

// Error handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: 'Algo deu errado!' });
});

app.listen(PORT, () => {
  console.log(`🚀 API rodando em http://localhost:${PORT}`);
  console.log(`📊 Prisma Studio: npx prisma studio`);
});