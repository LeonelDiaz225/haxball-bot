import { Request, Response } from "express";
import fs from "fs";
import path from "path";
import { PlayerStats, createNewPlayerStats } from "../models/playerstats";

// Ruta del archivo de datos
const DATA_FILE = path.join(__dirname, "../../data/stats.json");

/**
 * Asegura que el archivo de datos existe, lo crea con un array vacío si no
 */
const ensureDataFile = (): void => {
  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify([], null, 2), "utf8");
  }
};

/**
 * Lee las estadisticas de los jugadores desde el archivo JSON
 * @returns Array of PlayerStats objects
 */
const readStatsData = (): PlayerStats[] => {
  ensureDataFile();
  const data = fs.readFileSync(DATA_FILE, "utf8");
  try {
    return JSON.parse(data);
  } catch (error) {
    console.error("Error parsing stats data:", error);
    return [];
  }
};

/**
 * Escribe las estadisticas de los jugadores al archivo JSON
 * @param stats Array of PlayerStats objects to write
 */
const writeStatsData = (stats: PlayerStats[]): void => {
  ensureDataFile();
  fs.writeFileSync(DATA_FILE, JSON.stringify(stats, null, 2), "utf8");
};

/**
 * Obtiene todas las estadisticas de los jugadores
 */
export const getAllStats = (req: Request, res: Response): void => {
  try {
    const stats = readStatsData();
    res.status(200).json(stats);
  } catch (error) {
    console.error("Error getting all stats:", error);
    res.status(500).json({ error: "Failed to retrieve player statistics" });
  }
};

/**
 * Obtiene las estadisticas de un jugador por ID
 */
export const getPlayerStats = (req: Request, res: Response): void => {
  try {
    const { playerId } = req.params;
    const stats = readStatsData();
    const playerStats = stats.find((player) => player.id === playerId);

    if (!playerStats) {
      res.status(404).json({ error: "Player not found" });
      return;
    }

    res.status(200).json(playerStats);
  } catch (error) {
    console.error("Error getting player stats:", error);
    res.status(500).json({ error: "Failed to retrieve player statistics" });
  }
};

/**
 * Agrega nuevas estadisticas de un jugador
 */
export const addPlayerStats = (req: Request, res: Response): void => {
  try {
    const { id, name } = req.body;

    if (!id || !name) {
      res.status(400).json({ error: "Player ID and name are required" });
      return;
    }

    const stats = readStatsData();

    // Chequea si el jugador ya existe
    if (stats.some((player) => player.id === id)) {
      res.status(409).json({ error: "Player already exists" });
      return;
    }

    // Crea un nuevo objeto de player stats
    const newPlayerStats = createNewPlayerStats(id, name);

    // Agrega propiedades adicionales si existen en el cuerpo de la solicitud
    Object.keys(req.body).forEach((key) => {
      if (key !== "id" && key !== "name" && key in newPlayerStats) {
        (newPlayerStats as any)[key] = req.body[key];
      }
    });

    stats.push(newPlayerStats);
    writeStatsData(stats);

    res.status(201).json(newPlayerStats);
  } catch (error) {
    console.error("Error adding player stats:", error);
    res.status(500).json({ error: "Failed to add player statistics" });
  }
};

/**
 * Actualiza las estadisticas de un jugador por ID
 */
export const updatePlayerStats = (req: Request, res: Response): void => {
  try {
    const { playerId } = req.params;
    const stats = readStatsData();
    const playerIndex = stats.findIndex((player) => player.id === playerId);

    if (playerIndex === -1) {
      res.status(404).json({ error: "Player not found" });
      return;
    }

    // Actualiza las estadisticas del jugador
    const updatedStats = {
      ...stats[playerIndex],
      ...req.body,
      id: playerId, // Asegura que el ID no se cambie
      lastUpdated: new Date().toISOString(),
    };

    stats[playerIndex] = updatedStats;
    writeStatsData(stats);

    res.status(200).json(updatedStats);
  } catch (error) {
    console.error("Error updating player stats:", error);
    res.status(500).json({ error: "Failed to update player statistics" });
  }
};

/**
 * Borra las estadisticas de un jugador por ID
 */
export const deletePlayerStats = (req: Request, res: Response): void => {
  try {
    const { playerId } = req.params;
    const stats = readStatsData();
    const playerIndex = stats.findIndex((player) => player.id === playerId);

    if (playerIndex === -1) {
      res.status(404).json({ error: "Player not found" });
      return;
    }

    stats.splice(playerIndex, 1);
    writeStatsData(stats);

    res.status(200).json({ message: "Player statistics deleted successfully" });
  } catch (error) {
    console.error("Error deleting player stats:", error);
    res.status(500).json({ error: "Failed to delete player statistics" });
  }
};
