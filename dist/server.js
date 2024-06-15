"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = exports.server = void 0;
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const debug_1 = __importDefault(require("debug"));
const app = (0, express_1.default)();
exports.app = app;
/**
 * Get port from environment and store in Express.
 */
const port = normalizePort(process.env.PORT || '8081');
app.set('port', port);
/**
 * Create HTTP server.
 */
const server = http_1.default.createServer(app);
exports.server = server;
/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.info(`==> 🌎  Listening on port ${port}, ${(new Date()).toTimeString()}`));
server.on('error', onError);
server.on('listening', onListening);
process.on('SIGINT', (num) => {
    console.log('Received SIGINT signal. Closing server...');
    // Close the server
    server.close(() => {
        console.log('Server closed.');
        process.exit(0);
    });
});
/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val) {
    const port = parseInt(val, 10);
    if (isNaN(port)) {
        // named pipe
        return val;
    }
    if (port >= 0) {
        // port number
        return port;
    }
    return false;
}
/**
 * Event listener for HTTP server "error" event.
 */
function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }
    const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;
    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(`${bind} requires elevated privileges`);
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(`${bind} is already in use`);
            process.exit(1);
            break;
        default:
            throw error;
    }
}
/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
    const addr = server.address();
    const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;
    (0, debug_1.default)(`Listening on ${bind}`);
}
//# sourceMappingURL=server.js.map