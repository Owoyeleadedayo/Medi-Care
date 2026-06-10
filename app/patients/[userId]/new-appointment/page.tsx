import Image from "next/image";
import Link from "next/link";
import { getPatient, getUser } from "@/lib/actions/patient.actions";
import { CalendarCheck } from "lucide-react";
import { AppointmentForm } from "@/components/forms/AppointmentForm";

const NewAppointment = async ({ params }: SearchParamProps) => {
  const { userId } = await params;
  const user = await getUser(userId);
  const patient = await getPatient(userId);

  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar relative flex-1 overflow-y-auto px-[5%]">
        <div className="mx-auto flex size-full flex-1 flex-col py-10 max-w-215">
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

          <div className="flex flex-1 flex-col items-start justify-center mx-0 xl:mx-18">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold text-white md:text-4xl">
                Hello{" "}
                <span className="font-semibold text-green-400">
                  {patient?.name ?? "Patient"}
                </span>
              </h2>
              <p className="text-base text-gray-400">
                You can now book your first appointment with one of our
                physicians in 10 seconds.
              </p>
            </div>
          </div>

          <div className="flex  flex-col gap-6  xl:flex-row mx-18">
            <AppointmentForm
              userId={userId}
              type="create"
              patientId={patient.$id}
            />
          </div>

          <p className="text-sm text-gray-500 text-center py-8">
            © 2026 Medi-Care. All rights reserved.
          </p>
        </div>
      </section>

      <Image
        src="/assets/register.png"
        alt="appointment image"
        height={1000}
        width={1000}
        className="hidden h-full object-cover md:block max-w-124"
      />
    </div>
  );
};

export default NewAppointment;
