import mongoose, { Connection, ConnectOptions, Mongoose } from "mongoose";

//const dbConnectionString: string = process.env.MONGO_URI;

//mongoose.set("debug", true);
mongoose.set("bufferCommands", true);
mongoose.set("strictQuery", true);

mongoose.Promise = global.Promise;

const options = {
  autoIndex: true,
  useUnifiedTopology: true,
  useNewUrlParser: true,
};

export const connectToDatabase = async (
  dbConnectionString: string,
  dbName?: string
): Promise<Mongoose> => {
  const newOptions = {
    ...options,
    ...(dbName !== undefined && { dbName: dbName }),
  };

  try {
    const connection: Mongoose = await mongoose.connect(
      dbConnectionString,
      newOptions
    );
    console.log(
      "\ndatabase connected. Ready state:",
      connection.connection.readyState
    );
    
    return connection;
  } catch (error) {
    console.log("CONNECTION ERROR:", error);
    throw error;
  }
};

export const dbConnect = async (
  dbConnectionString: string,
  dbName?: string
): Promise<Connection> => {
  const newOptions = {
    ...options,
    ...(dbName !== undefined && { dbName: dbName }),
  };

  try {
    const connection: Connection = mongoose.createConnection(
      dbConnectionString,
      newOptions,
    );

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
  } catch (error) {
    console.error("CONNECTION ERROR:", error);
    throw error;
  }
};

const db = (dbName: string): Connection =>
  mongoose.connections.find((connection) => connection.name === dbName);
/*db.on("error", (error) => {
  console.error("CONNECTION ERROR:", error);
});

db.once("open", () => {
  console.log("\ndatabase connected. Ready state:", db.readyState);
});*/

export { db as default };
