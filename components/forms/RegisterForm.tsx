"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";

import CustomFormField from "../CustomFormField";
import SubmitButton from "../SubmitButton";

import { Mail, User } from "lucide-react";
import { PatientFormValidation } from "@/lib/validation";
import { createUser } from "@/lib/actions/patient.actions";
import { FormFieldType } from "./PatientForm";

import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

import { Doctors, GenderOptions, PatientFormDefaultValues } from "@/constants";

import "react-datepicker/dist/react-datepicker.css";
import "react-phone-number-input/style.css";
import { SelectItem } from "../ui/select";

type PatientFormValues = z.infer<typeof PatientFormValidation>;

const RegisterForm = ({ user }: { user: User }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<PatientFormValues>({
    resolver: zodResolver(PatientFormValidation),
    defaultValues: {
      ...PatientFormDefaultValues,
      name: user?.name ?? "",
      email: user?.email ?? "",
      phone: user?.phone ?? "",
      birthDate: undefined,
      gender: "Male",
    },
  });

  const formatPhone = (phone: string): string => {
    let digits = phone.replace(/\D/g, "");

    if (digits.startsWith("0")) {
      digits = `234${digits.slice(1)}`;
    }

    if (!digits.startsWith("234")) {
      throw new Error("Invalid Nigerian number");
    }

    return `+${digits}`;
  };

  // ✅ properly typed submit
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
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="flex-1 space-y-12">
      <section className="space-y-4">
        <h1 className="text-[32px] font-bold leading-9">Welcome 👋</h1>
        <p className="text-base text-gray-400">
          Let us know more about you to get started.
        </p>
      </section>

      <section className="space-y-6">
        <div className="mb-9 space-y-1">
          <h2 className="text-xl text-white">Personal Information</h2>
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
                  className="flex gap-4"
                  value={field.value ?? ""}
                  onValueChange={field.onChange}
                >
                  {GenderOptions.map((option) => {
                    const id = `gender-${option}`;

                    return (
                      <div
                        key={option}
                        className="flex flex-1 items-center gap-2 rounded-md border border-dashed border-[#363A3D] bg-[#1A1D21] p-3"
                      >
                        <RadioGroupItem value={option} id={id} />
                        <Label htmlFor={id} className="cursor-pointer">
                          {option}
                        </Label>
                      </div>
                    );
                  })}
                </RadioGroup>
              )}
            />
          </div>
        </div>

        <div className="flex flex-col gap-4 xl:flex-row">
          <div className="flex-1">
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="address"
              label="Address"
              placeholder="9, Medical Street, Lagos"
              icon={Mail}
            />
          </div>

          <div className="flex-1">
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="occupation"
              label="Occupation"
              placeholder="Please Enter Your Occupation"
              icon={User}
            />
          </div>
        </div>

        <div className="flex flex-col gap-4 xl:flex-row">
          <div className="flex-1">
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="emergencyContactName"
              label="Emergency Contact Name"
              placeholder="Please Enter Emergency Contact Name"
              icon={User}
            />
          </div>

          <div className="flex-1">
            <CustomFormField
              fieldType={FormFieldType.PHONE_INPUT}
              control={form.control}
              name="emergencyContactNumber"
              label="Emergency Contact Phone Number"
            />
          </div>
        </div>
      </section>
      
      <section className="space-y-6">
        <div className="mb-9 space-y-1">
          <h2 className="sub-header">Medical Information</h2>
        </div>

        {/* PRIMARY CARE PHYSICIAN */}
        <CustomFormField
          fieldType={FormFieldType.SELECT}
          control={form.control}
          name="primaryPhysician"
          label="Primary care physician"
          placeholder="Select a physician"
        >
          {Doctors.map((doctor, i) => (
            <SelectItem key={doctor.name + i} value={doctor.name}>
              <div className="flex cursor-pointer items-center gap-2">
                {/* <Image
                  src={doctor.image}
                  width={32}
                  height={32}
                  alt="doctor"
                  className="rounded-full border border-dark-500"
                /> */}
                <p>{doctor.name}</p>
              </div>
            </SelectItem>
          ))}
        </CustomFormField>

        {/* INSURANCE & POLICY NUMBER */}
        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="insuranceProvider"
            label="Insurance provider"
            placeholder="BlueCross BlueShield"
          />

          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="insurancePolicyNumber"
            label="Insurance policy number"
            placeholder="ABC123456789"
          />
        </div>

        {/* ALLERGY & CURRENT MEDICATIONS */}
        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            fieldType={FormFieldType.TEXTAREA}
            control={form.control}
            name="allergies"
            label="Allergies (if any)"
            placeholder="Peanuts, Penicillin, Pollen"
          />

          <CustomFormField
            fieldType={FormFieldType.TEXTAREA}
            control={form.control}
            name="currentMedication"
            label="Current medications"
            placeholder="Ibuprofen 200mg, Levothyroxine 50mcg"
          />
        </div>

        {/* FAMILY MEDICATION & PAST MEDICATIONS */}
        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            fieldType={FormFieldType.TEXTAREA}
            control={form.control}
            name="familyMedicalHistory"
            label=" Family medical history (if relevant)"
            placeholder="Mother had brain cancer, Father has hypertension"
          />

          <CustomFormField
            fieldType={FormFieldType.TEXTAREA}
            control={form.control}
            name="pastMedicalHistory"
            label="Past medical history"
            placeholder="Appendectomy in 2015, Asthma diagnosis in childhood"
          />
        </div>
      </section>

      <SubmitButton isLoading={isLoading}>Get Started</SubmitButton>
    </form>
  );
};

export default RegisterForm;
