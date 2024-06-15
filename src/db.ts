import mongoose, { Connection, ConnectOptions, Mongoose } from "mongoose";

const dbConnectionString = process.env.MONGO_URI;

//mongoose.set("debug", true);
mongoose.set("bufferCommands", true);
mongoose.set("strictQuery", true);

mongoose.Promise = global.Promise;

const options = {
  useNewUrlParser: true,
  autoIndex: true,
  //promiseLibrary: global.Promise,
  useUnifiedTopology: true,
};

const connectToDatabase = async (): Promise<Mongoose> => {
  try {
    const connection: Mongoose = await mongoose.connect(
      dbConnectionString,
      options
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

const connectToDatabase1 = async (): Promise<Connection> => {
  try {
    const connection: Connection = mongoose.createConnection(
      dbConnectionString,
      options
    );

    connection.on('connected', () => {
      console.log('Database connected.');
    });

    connection.on('error', (error) => {
      console.error('Connection error:', error);
    });

    return connection;
  } catch (error) {
    console.error('CONNECTION ERROR:', error);
    throw error;
  }
};

const db: Connection = mongoose.connection;

/*db.on("error", (error) => {
  console.error("CONNECTION ERROR:", error);
});

db.once("open", () => {
  console.log("\ndatabase connected. Ready state:", db.readyState);
});*/

export { connectToDatabase, db as default };
export const collections = db.collections;
export const collection = db.collection;
