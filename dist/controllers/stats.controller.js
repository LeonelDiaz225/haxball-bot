"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePlayerStats = exports.updatePlayerStats = exports.addPlayerStats = exports.getPlayerStats = exports.getAllStats = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const playerstats_1 = require("../models/playerstats");
// Ruta del archivo de datos
const DATA_FILE = path_1.default.join(__dirname, '../../data/stats.json');
/**
 * Asegura que el archivo de datos existe, lo crea con un array vacío si no
 */
const ensureDataFile = () => {
    if (!fs_1.default.existsSync(DATA_FILE)) {
        fs_1.default.writeFileSync(DATA_FILE, JSON.stringify([], null, 2), 'utf8');
    }
};
/**
 * Lee las estadisticas de los jugadores desde el archivo JSON
 * @returns Array of PlayerStats objects
 */
const readStatsData = () => {
    ensureDataFile();
    const data = fs_1.default.readFileSync(DATA_FILE, 'utf8');
    try {
        return JSON.parse(data);
    }
    catch (error) {
        console.error('Error parsing stats data:', error);
        return [];
    }
};
/**
 * Escribe las estadisticas de los jugadores al archivo JSON
 * @param stats Array of PlayerStats objects to write
 */
const writeStatsData = (stats) => {
    ensureDataFile();
    fs_1.default.writeFileSync(DATA_FILE, JSON.stringify(stats, null, 2), 'utf8');
};
/**
 * Obtiene todas las estadisticas de los jugadores
 */
const getAllStats = (req, res) => {
    try {
        const stats = readStatsData();
        res.status(200).json(stats);
    }
    catch (error) {
        console.error('Error getting all stats:', error);
        res.status(500).json({ error: 'Failed to retrieve player statistics' });
    }
};
exports.getAllStats = getAllStats;
/**
 * Obtiene las estadisticas de un jugador por ID
 */
const getPlayerStats = (req, res) => {
    try {
        const { playerId } = req.params;
        const stats = readStatsData();
        const playerStats = stats.find(player => player.id === playerId);
        if (!playerStats) {
            res.status(404).json({ error: 'Player not found' });
            return;
        }
        res.status(200).json(playerStats);
    }
    catch (error) {
        console.error('Error getting player stats:', error);
        res.status(500).json({ error: 'Failed to retrieve player statistics' });
    }
};
exports.getPlayerStats = getPlayerStats;
/**
 * Agrega nuevas estadisticas de un jugador
 */
const addPlayerStats = (req, res) => {
    try {
        const { id, name } = req.body;
        if (!id || !name) {
            res.status(400).json({ error: 'Player ID and name are required' });
            return;
        }
        const stats = readStatsData();
        // Chequea si el jugador ya existe
        if (stats.some(player => player.id === id)) {
            res.status(409).json({ error: 'Player already exists' });
            return;
        }
        // Crea un nuevo objeto de player stats
        const newPlayerStats = (0, playerstats_1.createNewPlayerStats)(id, name);
        // Agrega propiedades adicionales si existen en el cuerpo de la solicitud
        Object.keys(req.body).forEach(key => {
            if (key !== 'id' && key !== 'name' && key in newPlayerStats) {
                newPlayerStats[key] = req.body[key];
            }
        });
        stats.push(newPlayerStats);
        writeStatsData(stats);
        res.status(201).json(newPlayerStats);
    }
    catch (error) {
        console.error('Error adding player stats:', error);
        res.status(500).json({ error: 'Failed to add player statistics' });
    }
};
exports.addPlayerStats = addPlayerStats;
/**
 * Actualiza las estadisticas de un jugador por ID
 */
const updatePlayerStats = (req, res) => {
    try {
        const { playerId } = req.params;
        const stats = readStatsData();
        const playerIndex = stats.findIndex(player => player.id === playerId);
        if (playerIndex === -1) {
            res.status(404).json({ error: 'Player not found' });
            return;
        }
        // Actualiza las estadisticas del jugador
        const updatedStats = {
            ...stats[playerIndex],
            ...req.body,
            id: playerId, // Asegura que el ID no se cambie
            lastUpdated: new Date().toISOString()
        };
        stats[playerIndex] = updatedStats;
        writeStatsData(stats);
        res.status(200).json(updatedStats);
    }
    catch (error) {
        console.error('Error updating player stats:', error);
        res.status(500).json({ error: 'Failed to update player statistics' });
    }
};
exports.updatePlayerStats = updatePlayerStats;
/**
 * Borra las estadisticas de un jugador por ID
 */
const deletePlayerStats = (req, res) => {
    try {
        const { playerId } = req.params;
        const stats = readStatsData();
        const playerIndex = stats.findIndex(player => player.id === playerId);
        if (playerIndex === -1) {
            res.status(404).json({ error: 'Player not found' });
            return;
        }
        stats.splice(playerIndex, 1);
        writeStatsData(stats);
        res.status(200).json({ message: 'Player statistics deleted successfully' });
    }
    catch (error) {
        console.error('Error deleting player stats:', error);
        res.status(500).json({ error: 'Failed to delete player statistics' });
    }
};
exports.deletePlayerStats = deletePlayerStats;
