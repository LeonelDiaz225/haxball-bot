"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createNewPlayerStats = createNewPlayerStats;
/**
 * Create a new player stats object with default values
 * @param id Player ID
 * @param name Player name
 * @returns New PlayerStats object
 */
function createNewPlayerStats(id, name) {
    return {
        id,
        name,
        goals: 0,
        assists: 0,
        ownGoals: 0,
        wins: 0,
        losses: 0,
        gamesPlayed: 0,
        saves: 0,
        touches: 0,
        possession: 0,
        lastUpdated: new Date().toISOString()
    };
}
