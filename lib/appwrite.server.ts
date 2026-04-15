import * as sdk from "node-appwrite";

export const {
  PROJECT_ID,
  API_KEY,
  MEDICARE_DB,
  PATIENT_ID,
  DOCTOR_ID,
  APPOINTMENT_ID,
  NEXT_PUBLIC_BUCKET_ID: BUCKET_ID,
  NEXT_PUBLIC_ENDPOINT: ENDPOINT,
} = process.env;

const client = new sdk.Client();

client
  .setEndpoint(process.env.NEXT_PUBLIC_ENDPOINT!) 
  .setProject(process.env.PROJECT_ID!)
  .setKey(process.env.API_KEY!);


export const database = new sdk.Databases(client);
export const storage = new sdk.Storage(client);
export const users = new sdk.Users(client);
export const messaging = new sdk.Messaging(client);
 