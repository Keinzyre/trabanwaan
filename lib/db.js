import { MongoClient } from "mongodb";
export async function connectToDataBase() {
  const client = await MongoClient.connect(process.env.MONGO_CLIENT_KEY);
  return client;
}
