import { MongoClient } from "mongodb";

const mongoURL = process.env.MONGO_URL;
if (!mongoURL) {
  throw new Error("MONGO_URL is not defined in environment variables");
}

let dbInstance = null;

export const connectDB = async () => {
  try {
    const client = await MongoClient.connect(mongoURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    // dbInstance = client.db("RS_Data");
    dbInstance = client.db("RS_Data_Dummy");

    console.log("Connected to MongoDB Database");
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    throw error; // Rethrowing the error is important for handling it in the caller function
  }
};

export const getNextId = async (collection) => {
  const highestIdDoc = await collection
    .find()
    .sort({ id: -1 })
    .limit(1)
    .toArray();
  if (highestIdDoc.length > 0) {
    return highestIdDoc[0].id + 1;
  } else {
    return 1; // Start from 1 if the collection is empty
  }
};

export const mongoDB = () => {
  if (!dbInstance) {
    throw Error("Database not initialized. Call connectDB first.");
  }
  return dbInstance;
};
