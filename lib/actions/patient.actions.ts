"use server";

import { ID, Query } from "node-appwrite";
import { users } from "../appwrite.server";
import { parseStringify } from "../utils";

export const createUser = async (user: CreateUserParams) => {
  try {
    console.log("PHONE BEFORE CLEAN:", user.phone);

    let cleanPhone = user.phone.replace(/\D/g, "");

    if (cleanPhone.startsWith("0")) {
      cleanPhone = `234${cleanPhone.slice(1)}`;
    }

    cleanPhone = `+${cleanPhone}`;

    console.log("PHONE SENT TO APPWRITE:", cleanPhone);

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
      const documents = await users.list([Query.equal("email", [user.email])]);

      const existing = documents?.users[0];

      return existing
        ? {
            $id: existing.$id,
            email: existing.email,
            name: existing.name,
            phone: existing.phone,
          }
        : null;
    }

    throw error;
  }
};

export const getUser = async (userId: string) => {
  try{
    const user = await users.get(userId);
    return parseStringify(user)
  }catch(error){
    console.log(error);
  }
}