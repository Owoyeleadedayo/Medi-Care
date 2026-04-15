"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import CustomFormField from "../CustomFormField";
import { Mail, User } from "lucide-react";
import SubmitButton from "../SubmitButton";
import { useState } from "react";
import { UserFormValidation } from "@/lib/validation";
import { useRouter } from "next/navigation";
import { createUser } from "@/lib/actions/patient.actions";

export enum FormFieldType {
  INPUT = "input",
  TEXTAREA = "textarea",
  PHONE_INPUT = "phone_input",
  CHECKBOX = "checkbox",
  DATE_PICKER = "date_picker",
  SELECT = "select",
  SKELETON = "skeleton",
}

const PatientForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });

  const formatPhone = (phone: string): string => {
    if (!phone) throw new Error("Phone number is required");

    let digits = phone.replace(/\D/g, "");

    if (digits.startsWith("0")) {
      digits = `234${digits.slice(1)}`;
    }

    if (!digits.startsWith("234")) {
      throw new Error("Invalid Nigerian number");
    }

    const formatted = `+${digits}`;

    if (!/^\+[1-9]\d{7,14}$/.test(formatted)) {
      throw new Error("Invalid phone format");
    }

    return formatted;
  };

  const onSubmit = async (values: z.infer<typeof UserFormValidation>) => {
    setIsLoading(true);

    try {
      const user = {
        name: values.name,
        email: values.email,
        phone: formatPhone(values.phone),
      };

      const newUser = await createUser(user);

      if (newUser) {
        router.push(`/patients/${newUser.$id}/register`);
      }
    } catch (error) {
      console.log(error);
    }

    setIsLoading(false);
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 flex-1">
      <section className="mb-8 space-y-2">
        <h1 className="text-[32px] text-gray-200 leading-9 font-bold md:text-[36px] md:leading-10">
          Hi there 👋
        </h1>
        <p className="text-base text-gray-300">
          Schedule your first appointment with us.
        </p>
      </section>

      <CustomFormField
        fieldType={FormFieldType.INPUT}
        control={form.control}
        name="name"
        label="Full Name"
        placeholder="Please Enter Your Full Name"
        icon={User}
      />

      <CustomFormField
        fieldType={FormFieldType.INPUT}
        control={form.control}
        name="email"
        placeholder="Please Enter Your Email Address"
        icon={Mail}
      />

      <CustomFormField
        fieldType={FormFieldType.PHONE_INPUT}
        control={form.control}
        name="phone"
      />

      <SubmitButton isLoading={isLoading}>Get Started</SubmitButton>
    </form>
  );
};

export default PatientForm;
