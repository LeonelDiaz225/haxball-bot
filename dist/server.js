"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const stats_routes_1 = __importDefault(require("./routes/stats.routes"));
// Initialize express app
const app = (0, express_1.default)();
const PORT = parseInt(process.env.PORT || '3000', 10);
// Create data directory if it doesn't exist
const dataDir = path_1.default.join(__dirname, '../data');
if (!fs_1.default.existsSync(dataDir)) {
    fs_1.default.mkdirSync(dataDir, { recursive: true });
}
// Middleware
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Log all requests
app.use((req, _res, next) => {
    console.log(`${req.method} ${req.path} - ${new Date().toISOString()}`);
    next();
});
// Routes
app.get('/', (_req, res) => {
    res.status(200).send('HaxBall Stats Bot API is running!');
});
// Stats API routes
app.use('/api/stats', stats_routes_1.default);
// Error handling middleware
app.use((err, _req, res, _next) => {
    console.error('Error:', err.message);
    res.status(500).json({ error: 'Internal Server Error' });
});
// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`API available at http://localhost:${PORT}/api/stats`);
});
