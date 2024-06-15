"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = exports.dbConnect = exports.connectToDatabase = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
//const dbConnectionString: string = process.env.MONGO_URI;
//mongoose.set("debug", true);
mongoose_1.default.set("bufferCommands", true);
mongoose_1.default.set("strictQuery", true);
mongoose_1.default.Promise = global.Promise;
const options = {
    autoIndex: true,
    useUnifiedTopology: true,
    useNewUrlParser: true,
};
const connectToDatabase = async (dbConnectionString, dbName) => {
    const newOptions = {
        ...options,
        ...(dbName !== undefined && { dbName: dbName }),
    };
    try {
        const connection = await mongoose_1.default.connect(dbConnectionString, newOptions);
        console.log("\ndatabase connected. Ready state:", connection.connection.readyState);
        return connection;
    }
    catch (error) {
        console.log("CONNECTION ERROR:", error);
        throw error;
    }
};
exports.connectToDatabase = connectToDatabase;
const dbConnect = async (dbConnectionString, dbName) => {
    const newOptions = {
        ...options,
        ...(dbName !== undefined && { dbName: dbName }),
    };
    try {
        const connection = mongoose_1.default.createConnection(dbConnectionString, newOptions);
        connection.on("connected", () => {
            console.log("\ndatabase connected. Ready state:", connection.readyState);
        });
        connection.on("error", (error) => {
            console.error("Connection error:", error);
        });
        if (dbName) {
            connection.useDb(dbName);
        }
        return connection;
    }
    catch (error) {
        console.error("CONNECTION ERROR:", error);
        throw error;
    }
};
exports.dbConnect = dbConnect;
const db = (dbName) => mongoose_1.default.connections.find((connection) => connection.name === dbName);
exports.default = db;
//# sourceMappingURL=db1.js.map