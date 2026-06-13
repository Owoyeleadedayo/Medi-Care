"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import CustomFormField from "../CustomFormField";
import SubmitButton from "../SubmitButton";

import { Mail, User } from "lucide-react";
import { PatientFormValidation } from "@/lib/validation";
import { registerPatient } from "@/lib/actions/patient.actions";
import { FormFieldType } from "./PatientForm";

import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

import {
  Doctors,
  GenderOptions,
  IdentificationTypes,
  PatientFormDefaultValues,
} from "@/constants";

import "react-datepicker/dist/react-datepicker.css";
import "react-phone-number-input/style.css";
import { SelectItem } from "../ui/select";
import FileUploader from "../FileUploader";

const RegisterForm = ({ user }: { user: User }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof PatientFormValidation>>({
    resolver: zodResolver(PatientFormValidation),
    defaultValues: {
      ...PatientFormDefaultValues,
      name: user?.name ?? "",
      email: user?.email ?? "",
      phone: user?.phone ?? "",
    },
  });

  const { reset } = form;

  useEffect(() => {
    reset({
      ...PatientFormDefaultValues,
      name: user?.name ?? "",
      email: user?.email ?? "",
      phone: user?.phone ?? "",
    });
  }, [user, reset]);

  const onSubmit = async (values: z.infer<typeof PatientFormValidation>) => {
    setIsLoading(true);
    setError(null);
    let formData: FormData | undefined;
    if (
      values.identificationDocument &&
      values.identificationDocument.length > 0
    ) {
      const file = values.identificationDocument[0] as File;
      formData = new FormData();
      formData.append("blobFile", file);
      formData.append("fileName", file.name);
    }

    try {
      const patient: RegisterUserParams = {
        name: values.name,
        email: values.email,
        phone: values.phone,
        birthDate: new Date(values.birthDate ?? new Date()),
        gender: values.gender.toLowerCase() as Gender,
        address: values.address,
        occupation: values.occupation,
        emergencyContactName: values.emergencyContactName,
        emergencyContactNumber: values.emergencyContactNumber,
        primaryPhysician: values.primaryPhysician,
        insuranceProvider: values.insuranceProvider,
        insurancePolicyNumber: values.insurancePolicyNumber,
        allergies: values.allergies ?? "",
        currentMedication: values.currentMedication ?? "",
        familyMedicalHistory: values.familyMedicalHistory ?? "",
        pastMedicalHistory: values.pastMedicalHistory ?? "",
        identificationType: values.identificationType ?? "",
        identificationNumber: values.identificationNumber ?? "",
        treatmentConsent: values.treatmentConsent,
        disclosureConsent: values.disclosureConsent,
        privacyConsent: values.privacyConsent,
      };

      const newPatient = await registerPatient(patient, formData);

      if (newPatient) {
        router.push(`/patients/${user.$id}/new-appointment`);
      } else {
        setError(
          "Registration failed. Please check your details and try again.",
        );
      }
    } catch (err: unknown) {
      console.error("RegisterForm submit error:", err);
      const msg =
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.";
      setError(msg);
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
        <div className="mb-5 space-y-1">
          <h2 className="text-2xl text-white">Personal Information</h2>
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
                    const value = option.toLowerCase();

                    return (
                      <div
                        key={option}
                        className="flex flex-1 items-center gap-2 rounded-md border border-dashed border-[#363A3D] bg-[#1A1D21] p-3"
                      >
                        <RadioGroupItem value={value} id={id} />
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
        <div className="mb-5 space-y-1">
          <h2 className="text-2xl text-white">Medical Information</h2>
        </div>

        {/* PRIMARY CARE PHYSICIAN */}
        <CustomFormField
          fieldType={FormFieldType.SELECT}
          control={form.control}
          name="primaryPhysician"
          label="Primary care physician"
          placeholder="Select a physician"
        >
          {Doctors.map((doctor) => (
            <SelectItem
              key={doctor.name}
              value={doctor.name}
              className="text-white"
            >
              {doctor.name}
            </SelectItem>
          ))}
        </CustomFormField>

        {/* INSURANCE */}
        <div className="flex flex-col gap-6 xl:flex-row">
          <div className="flex-1">
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="insuranceProvider"
              label="Insurance provider" 
              placeholder="BlueCross BlueShield"
            />
          </div>

          <div className="flex-1">
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="insurancePolicyNumber"
              label="Insurance policy number"
              placeholder="ABC123456789"
            />
          </div>
        </div>

        {/* ALLERGIES / MEDICATION */}
        <div className="flex flex-col gap-6 xl:flex-row">
          <div className="flex-1">
            <CustomFormField
              fieldType={FormFieldType.TEXTAREA}
              control={form.control}
              name="allergies"
              label="Allergies (if any)"
              placeholder="Peanuts, Penicillin, Pollen"
            />
          </div>

          <div className="flex-1">
            <CustomFormField
              fieldType={FormFieldType.TEXTAREA}
              control={form.control}
              name="currentMedication"
              label="Current medications"
              placeholder="Ibuprofen 200mg, Levothyroxine 50mcg"
            />
          </div>
        </div>

        {/* HISTORY */}
        <div className="flex flex-col gap-6 xl:flex-row">
          <div className="flex-1">
            <CustomFormField
              fieldType={FormFieldType.TEXTAREA}
              control={form.control}
              name="familyMedicalHistory"
              label="Family medical history"
              placeholder="Mother had hypertension"
            />
          </div>

          <div className="flex-1">
            <CustomFormField
              fieldType={FormFieldType.TEXTAREA}
              control={form.control}
              name="pastMedicalHistory"
              label="Past medical history"
              placeholder="Asthma, appendectomy"
            />
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <div className="mb-5 space-y-1">
          <h2 className="text-2xl text-white">
            Identification and Verification
          </h2>
        </div>

        <CustomFormField
          fieldType={FormFieldType.SELECT}
          control={form.control}
          name="identificationType"
          label="Identification Type"
          placeholder="Select identification type"
        >
          {IdentificationTypes.map((type, i) => (
            <SelectItem key={type + i} value={type}>
              {type}
            </SelectItem>
          ))}
        </CustomFormField>

        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="identificationNumber"
          label="Identification Number"
          placeholder="123456789"
        />

        <CustomFormField
          fieldType={FormFieldType.SKELETON}
          control={form.control}
          name="identificationDocument"
          label="Scanned Copy of Identification Document"
          renderSkeleton={(field) => (
            <FileUploader
              files={(field.value as File[]) || []}
              onChange={field.onChange}
            />
          )}
        />
      </section>

      <section className="space-y-6">
        <div className="mb-5 space-y-1">
          <h2 className="text-2xl text-white">Consent and Privacy</h2>
        </div>

        <CustomFormField
          fieldType={FormFieldType.CHECKBOX}
          control={form.control}
          name="treatmentConsent"
          label="I consent to receive treatment for my health condition."
        />

        <CustomFormField
          fieldType={FormFieldType.CHECKBOX}
          control={form.control}
          name="disclosureConsent"
          label="I consent to the use and disclosure of my health
            information for treatment purposes."
        />

        <CustomFormField
          fieldType={FormFieldType.CHECKBOX}
          control={form.control}
          name="privacyConsent"
          label="I acknowledge that I have reviewed and agree to the privacy policy"
        />
      </section>

      {error && (
        <div className="rounded-md bg-red-500/10 border border-red-500/30 px-4 py-3">
          <p className="text-sm text-red-400">{error}</p>
        </div>
      )}

      <SubmitButton isLoading={isLoading}>Submit and Continue</SubmitButton>
    </form>
  );
};

export default RegisterForm;
