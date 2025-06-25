# Bot de Estadísticas de HaxBall

Un bot para recopilar y consultar estadísticas de jugadores de partidas de HaxBall.

## Características

- Recopila estadísticas de jugadores de partidas de HaxBall
- Almacena las estadísticas en formato JSON
- Proporciona endpoints de API para consultar estadísticas
- Construido con TypeScript, Node.js y Express.js

## Estructura del Proyecto

```text
haxball-stats-bot/
├── src/
│   ├── server.ts            # Configuración del servidor Express
│   ├── routes/              
│   │   └── stats.routes.ts  # Rutas para endpoints de estadísticas
│   ├── controllers/         
│   │   └── stats.controller.ts # Lógica para manejar solicitudes de estadísticas
│   └── models/              
│       └── playerstats.ts   # Modelo de datos de estadísticas de jugadores
├── data/
│   └── stats.json           # Almacenamiento JSON para estadísticas
├── tsconfig.json            # Configuración de TypeScript
├── package.json             # Dependencias del proyecto
└── README.md                # Documentación del proyecto
```

## Instalación

```bash
npm install
```

## Desarrollo

```bash
npm run dev
```

## Compilación para Producción

```bash
npm run build
npm start
```

## Endpoints de la API

- `GET /api/stats` - Obtener todas las estadísticas de jugadores
- `GET /api/stats/:playerId` - Obtener estadísticas de un jugador específico
- `POST /api/stats` - Añadir nuevas estadísticas de jugador
- `PUT /api/stats/:playerId` - Actualizar estadísticas de jugador
- `DELETE /api/stats/:playerId` - Eliminar estadísticas de jugador
