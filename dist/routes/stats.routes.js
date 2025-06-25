"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const stats_controller_1 = require("../controllers/stats.controller");
const router = (0, express_1.Router)();
/**
 * API Routes for player statistics
 */
// Get all player statistics
router.get('/', stats_controller_1.getAllStats);
// Get statistics for a specific player by ID
router.get('/:playerId', stats_controller_1.getPlayerStats);
// Add new player statistics
router.post('/', stats_controller_1.addPlayerStats);
// Update player statistics
router.put('/:playerId', stats_controller_1.updatePlayerStats);
// Delete player statistics
router.delete('/:playerId', stats_controller_1.deletePlayerStats);
exports.default = router;
