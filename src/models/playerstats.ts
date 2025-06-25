/**
 * Interfaz de jugador para las estadisticas de HaxBall
 * Esta interfaz define la estructura de los datos de estadisticas de un jugador
 */
export interface PlayerStats {
  id: string;          // Unique player identifier
  name: string;        // Player name
  goals: number;       // Number of goals scored
  assists: number;     // Number of assists
  ownGoals: number;    // Number of own goals
  wins: number;        // Number of wins
  losses: number;      // Number of losses
  gamesPlayed: number; // Total games played
  saves: number;       // Number of saves (goalkeeper stat)
  touches: number;     // Number of ball touches
  possession: number;  // Ball possession time in seconds
  lastUpdated: string; // ISO date string of last update
}

/**
 * Crear un nuevo objeto player stats con valores predeterminados
 * @param id Player ID
 * @param name Player name
 * @returns New PlayerStats object
 */
export function createNewPlayerStats(id: string, name: string): PlayerStats {
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
