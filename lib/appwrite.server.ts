import * as sdk from "node-appwrite";

// ─── Environment variables ────────────────────────────────────────────────────
const ENDPOINT = process.env.NEXT_PUBLIC_ENDPOINT!;
const PROJECT_ID = process.env.PROJECT_ID!;
const API_KEY = process.env.API_KEY!;

export const DATABASE_ID = process.env.DATABASE_ID || process.env.MEDICARE_DB;
export const PATIENT_COLLECTION_ID =
  process.env.PATIENT_COLLECTION_ID || process.env.PATIENT_ID;
export const DOCTOR_COLLECTION_ID =
  process.env.DOCTOR_COLLECTION_ID || process.env.DOCTOR_ID;
export const APPOINTMENT_COLLECTION_ID =
  process.env.APPOINTMENT_COLLECTION_ID || process.env.APPOINTMENT_ID;
export const BUCKET_ID = process.env.NEXT_PUBLIC_BUCKET_ID!;
export const ENDPOINT_URL = ENDPOINT;
export const PROJECT = PROJECT_ID;

console.log("APPWRITE CONFIG CHECK:", {
  endpoint: process.env.NEXT_PUBLIC_ENDPOINT,
  projectId: process.env.PROJECT_ID,
  apiKey: process.env.API_KEY ? "✅ set" : "❌ MISSING",
  databaseId: process.env.DATABASE_ID || process.env.MEDICARE_DB,
  appointmentCollectionId:
    process.env.APPOINTMENT_COLLECTION_ID || process.env.APPOINTMENT_ID,
});

// ─── Appwrite client ──────────────────────────────────────────────────────────
const client = new sdk.Client();
client.setEndpoint(ENDPOINT).setProject(PROJECT_ID).setKey(API_KEY);

export const databases = new sdk.Databases(client);
export const users = new sdk.Users(client);
export const messaging = new sdk.Messaging(client);
export const storage = new sdk.Storage(client);
