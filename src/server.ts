import express, { Express, Request, Response, NextFunction } from 'express';
import path from 'path';
import fs from 'fs';
import statsRoutes from './routes/stats.routes';

// Iniciar Express app
const app: Express = express();
const PORT: number = parseInt(process.env.PORT || '3000', 10);

// Crear directorio de datos si no existe
const dataDir = path.join(__dirname, '../data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Loguear las peticiones
app.use((req: Request, _res: Response, next: NextFunction) => {
  console.log(`${req.method} ${req.path} - ${new Date().toISOString()}`);
  next();
});

// Routes
app.get('/', (_req: Request, res: Response) => {
  res.status(200).send('HaxBall Stats Bot API esta corriendo!');
});

// Stats API routes
app.use('/api/stats', statsRoutes);

// Error handling middleware
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error('Error:', err.message);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`API disponible en http://localhost:${PORT}/api/stats`);
});
