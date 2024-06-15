"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.collection = exports.collections = exports.default = exports.connectToDatabase = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const dbConnectionString = process.env.MONGO_URI;
//mongoose.set("debug", true);
mongoose_1.default.set("bufferCommands", true);
mongoose_1.default.set("strictQuery", true);
mongoose_1.default.Promise = global.Promise;
const options = {
    useNewUrlParser: true,
    autoIndex: true,
    //promiseLibrary: global.Promise,
    useUnifiedTopology: true,
};
const connectToDatabase = async () => {
    try {
        const connection = await mongoose_1.default.connect(dbConnectionString, options);
        console.log("\ndatabase connected. Ready state:", connection.connection.readyState);
        return connection;
    }
    catch (error) {
        console.log("CONNECTION ERROR:", error);
        throw error;
    }
};
exports.connectToDatabase = connectToDatabase;
const connectToDatabase1 = async () => {
    try {
        const connection = mongoose_1.default.createConnection(dbConnectionString, options);
        connection.on('connected', () => {
            console.log('Database connected.');
        });
        connection.on('error', (error) => {
            console.error('Connection error:', error);
        });
        return connection;
    }
    catch (error) {
        console.error('CONNECTION ERROR:', error);
        throw error;
    }
};
const db = mongoose_1.default.connection;
exports.default = db;
exports.collections = db.collections;
exports.collection = db.collection;
//# sourceMappingURL=db.js.map