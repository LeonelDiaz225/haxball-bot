import { Router } from 'express';
import {
  getAllStats,
  getPlayerStats,
  addPlayerStats,
  updatePlayerStats,
  deletePlayerStats
} from '../controllers/stats.controller';

const router = Router();

/**
 * API Routes para las estadisticas de los jugadores
 */

// Obtener todas las estadisticas de jugadores
router.get('/', getAllStats);

// Obtener estadisticas de un jugador por ID
router.get('/:playerId', getPlayerStats);

// Agregar estadisticas de un jugador
router.post('/', addPlayerStats);

// Actualizar estadisticas de un jugador por ID
router.put('/:playerId', updatePlayerStats);

// Borrar estadisticas de un jugador por ID
router.delete('/:playerId', deletePlayerStats);

export default router;
