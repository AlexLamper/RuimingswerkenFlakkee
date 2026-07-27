import { MongoClient, type Db } from "mongodb";

// Hergebruik de client over hot-reloads (dev) en tussen route-invocaties
// (serverless), anders lekt elke request een nieuwe verbinding.
const globalForMongo = globalThis as unknown as {
  _mongoClientPromise?: Promise<MongoClient>;
};

export function isDatabaseConfigured(): boolean {
  return Boolean(process.env.MONGODB_URI);
}

async function getClient(): Promise<MongoClient> {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error(
      "MONGODB_URI ontbreekt. Zet de connection string in .env.local en in de Vercel-omgeving."
    );
  }
  if (!globalForMongo._mongoClientPromise) {
    globalForMongo._mongoClientPromise = new MongoClient(uri)
      .connect()
      .catch((error) => {
        // Mislukte verbinding niet cachen, anders blijft elke volgende
        // request dezelfde afgewezen promise teruggeven.
        globalForMongo._mongoClientPromise = undefined;
        throw error;
      });
  }
  return globalForMongo._mongoClientPromise;
}

export async function getDb(): Promise<Db> {
  const client = await getClient();
  // Databasenaam mag ook in de URI staan; "ruimingswerken" is de fallback.
  return client.db(process.env.MONGODB_DB || "ruimingswerken");
}
