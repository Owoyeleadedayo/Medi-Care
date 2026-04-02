"use client";
import PatientForm from "@/components/forms/PatientForm";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex h-screen max-h-screen">
      {/* TODO: OTP verification | Passkey Modal */}
      <section className="relative flex-1 overflow-y-auto px-[5%] my-auto">
        <div className="mx-auto flex size-full flex-col py-10 max-w-124">
          <div className="flex max-w-50 gap-3">
            <Image
              src="/assets/Icons/logoFull.png"
              alt="Medi-Care Logo"
              width={1000}
              height={1000}
              className="mb-12 h-10 w-fit"
            />
            <h1 className="text-2xl font-semibold text-light-200 mb-4">
              Medi-Care
            </h1>
          </div>
          <PatientForm />

          <div className="flex text-[14px] leading-4.5 font-normal mt-20 justify-between">
            <p className="justify-items-end text-base text-gray-300 xl:text-left">
              © 2026 Medi-Care. All rights reserved.
            </p>
            <Link href="/?admin=true" className="text-green-500 text-base">
              Admin
            </Link>
          </div>
        </div>
      </section>

      <Image
        src="/assets/doc.jpg"
        alt="patient form image"
        height={1000}
        width={1000}
        className="hidden h-full object-cover md:block max-w-[50%]"
      />
    </div>
  );
}