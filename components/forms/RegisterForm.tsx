"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import CustomFormField from "../CustomFormField";
import { Mail, User } from "lucide-react";
import SubmitButton from "../SubmitButton";
import { useState } from "react";
import { PatientFormValidation } from "@/lib/validation";
import { useRouter } from "next/navigation";
import { createUser } from "@/lib/actions/patient.actions";
import { FormFieldType } from "./PatientForm";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { GenderOptions, PatientFormDefaultValues } from "@/constants";
import "react-datepicker/dist/react-datepicker.css";
import "react-phone-number-input/style.css";

const RegisterForm = ({ user }: { user: User }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  type PatientFormValues = z.infer<typeof PatientFormValidation>;

  const form = useForm<PatientFormValues>({
    resolver: zodResolver(PatientFormValidation),
    defaultValues: {
      ...PatientFormDefaultValues,
      name: user?.name ?? "",
      email: user?.email ?? "",
      phone: user?.phone ?? "",
      birthDate: null,
      gender: "Male",
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

 const onSubmit = async (values: PatientFormValues) => {
   setIsLoading(true);

   try {
     const payload = {
       ...values,
       phone: formatPhone(values.phone),
     };

     const newUser = await createUser(payload);

     if (newUser) {
       router.push(`/patients/${newUser.$id}/register`);
     }
   } catch (err) {
     console.log(err);
   } finally {
     setIsLoading(false);
   }
 };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="flex-1 space-y-12">
      <section className="space-y-4">
        <h1 className="text-[32px] leading-9 font-bold">Welcome 👋</h1>
        <p className="text-base text-gray-400">
          Let us know more about you to get started.
        </p>
      </section>

      <section className="space-y-6 b">
        <div className="mb-9 space-y-1">
          <h2 className="text-xl text-[#FFF]">Personal Information</h2>
        </div>
        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="name"
          label="Full Name"
          placeholder="Please Enter Your Full Name"
          icon={User}
        />

        <div className="flex flex-col gap-4 xl:flex-row">
          <div className="flex-1">
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="email"
              label="Email"
              placeholder="Please Enter Your Email Address"
              icon={Mail}
            />
          </div>

          <div className="flex-1">
            <CustomFormField
              fieldType={FormFieldType.PHONE_INPUT}
              control={form.control}
              name="phone"
              label="Phone Number"
            />
          </div>
        </div>

        <div className="flex flex-col gap-4 xl:flex-row">
          <div className="flex-1">
            <CustomFormField
              fieldType={FormFieldType.DATE_PICKER}
              control={form.control}
              name="birthDate"
              label="Date of Birth"
            />
          </div>

          <div className="flex-1">
            <CustomFormField
              fieldType={FormFieldType.SKELETON}
              control={form.control}
              name="gender"
              label="Gender"
              renderSkeleton={(field) => (
                <RadioGroup
                  className="flex h-11 gap-6 xl:justify-between"
                  value={field.value}
                  onValueChange={(value) => field.onChange(value)}
                >
                  {GenderOptions.map((option, i) => (
                    <div
                      key={option + i}
                      className="flex h-full flex-1 items-center gap-2 rounded-md border border-dashed border-dark-500 bg-dark-400 p-3"
                    >
                      <RadioGroupItem value={option} id={option} />
                      <Label htmlFor={option} className="cursor-pointer">
                        {option}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              )}
            />
          </div>
        </div>
      </section>

      <SubmitButton isLoading={isLoading}>Get Started</SubmitButton>
    </form>
  );
};

export default RegisterForm;
