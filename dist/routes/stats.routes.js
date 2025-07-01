"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const stats_controller_1 = require("../controllers/stats.controller");
const router = (0, express_1.Router)();
/**
 * API Routes para las estadisticas de los jugadores
 */
// Obtener todas las estadisticas de jugadores
router.get('/', stats_controller_1.getAllStats);
// Obtener estadisticas de un jugador por ID
router.get('/:playerId', stats_controller_1.getPlayerStats);
// Agregar estadisticas de un jugador
router.post('/', stats_controller_1.addPlayerStats);
// Actualizar estadisticas de un jugador por ID
router.put('/:playerId', stats_controller_1.updatePlayerStats);
// Borrar estadisticas de un jugador por ID
router.delete('/:playerId', stats_controller_1.deletePlayerStats);
exports.default = router;
