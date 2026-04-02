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

  async function onSubmit({name, email, phone}: z.infer<typeof UserFormValidation>) {
    setIsLoading(true);
    try {
      // const userData = {
      //   name,
      //   email,
      //   phone,
      // };
      // const user = await createUser (userData);

      // if(user) router.push(`/patient/${user.id}/register`);

    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsLoading(false);
    }
    
  }

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
        label="Email"
        placeholder="Please Enter Your Email Address"
        icon={Mail}
      />

      <CustomFormField
        fieldType={FormFieldType.PHONE_INPUT}
        control={form.control}
        name="phone"
        label="Phone Number"
      />

      <SubmitButton isLoading={isLoading}>Get Started</SubmitButton>
    </form>
  );
};

export default PatientForm;
