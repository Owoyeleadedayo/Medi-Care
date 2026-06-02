"use server";

import { ID, Query } from "node-appwrite";
import {
  BUCKET_ID,
  DATABASE_ID,
  databases,
  ENDPOINT,
  PATIENT_COLLECTION_ID,
  PROJECT_ID,
  storage,
  users,
} from "../appwrite.server";

import { parseStringify } from "../utils";
import { InputFile } from "node-appwrite/file";

export const createUser = async (user: CreateUserParams) => {
  // Declare cleanPhone outside try so it's accessible in catch block too
  let cleanPhone = user.phone.replace(/\D/g, "");
  if (cleanPhone.startsWith("0")) {
    cleanPhone = `234${cleanPhone.slice(1)}`;
  }
  // If already prefixed with country code (from PhoneInput E.164 output), keep it
  if (!cleanPhone.startsWith("+")) {
    cleanPhone = `+${cleanPhone}`;
  }

  console.log("PHONE SENT TO APPWRITE:", cleanPhone);

  try {
    const newUser = await users.create(
      ID.unique(),
      user.email,
      cleanPhone,
      "TempPass123!",
      user.name,
    );

    return {
      $id: newUser.$id,
      email: newUser.email,
      name: newUser.name,
      phone: newUser.phone,
    };
  } catch (error: unknown) {
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      (error as { code?: number }).code === 409
    ) {
      // User already exists — look up by email first, then phone
      const emailDocs = await users.list([Query.equal("email", [user.email])]);
      if (emailDocs?.total > 0) {
        return {
          $id: emailDocs.users[0].$id,
          email: emailDocs.users[0].email,
          name: emailDocs.users[0].name,
          phone: emailDocs.users[0].phone,
        };
      }

      const phoneDocs = await users.list([Query.equal("phone", [cleanPhone])]);
      if (phoneDocs?.total > 0) {
        return {
          $id: phoneDocs.users[0].$id,
          email: phoneDocs.users[0].email,
          name: phoneDocs.users[0].name,
          phone: phoneDocs.users[0].phone,
        };
      }

      return null;
    }

    throw error;
  }
};

export const getUser = async (userId: string) => {
  try {
    const user = await users.get(userId);
    return parseStringify(user);
  } catch (error) {
    console.log(error);
  }
};

export const registerPatient = async (
  patient: RegisterUserParams,
  identificationDocument?: FormData,
) => {
  try {
    let file;

    if (identificationDocument) {
      const blobFile = identificationDocument.get("blobFile") as File;

      const arrayBuffer = await blobFile.arrayBuffer();

      const inputFile = InputFile.fromBuffer(
        Buffer.from(arrayBuffer),
        identificationDocument.get("fileName") as string,
      );

      file = await storage.createFile(BUCKET_ID!, ID.unique(), inputFile);
    }

    const newPatient = await databases.createDocument(
      DATABASE_ID!,
      PATIENT_COLLECTION_ID!,
      ID.unique(),
      {
        identificationDocumentId: file?.$id ?? null,
        identificationDocumentUrl: file
          ? `${ENDPOINT}/storage/buckets/${BUCKET_ID}/files/${file.$id}/view?project=${PROJECT_ID}`
          : null,
        ...patient,
      },
    );

    return JSON.parse(JSON.stringify(newPatient));
  } catch (error) {
    console.log("REGISTER PATIENT ERROR:", error);
  }
};