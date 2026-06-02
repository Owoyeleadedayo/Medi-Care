import Image from "next/image";
import Link from "next/link";
import { getUser } from "@/lib/actions/patient.actions";
import { CalendarCheck } from "lucide-react";

const NewAppointment = async ({ params }: SearchParamProps) => {
  const { userId } = await params;
  const user = await getUser(userId);

  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar relative flex-1 overflow-y-auto px-[5%]">
        <div className="mx-auto flex size-full flex-1 flex-col py-10 max-w-162.5">

          {/* Header */}
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

          {/* Success Card */}
          <div className="flex flex-1 flex-col items-center justify-center gap-8">
            <div className="flex flex-col items-center gap-4 text-center">
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-green-500/10 ring-2 ring-green-500/30">
                <CalendarCheck className="h-12 w-12 text-green-500" />
              </div>

              <div className="space-y-2">
                <h2 className="text-3xl font-bold text-white md:text-4xl">
                  Registration Complete!
                </h2>
                <p className="text-lg text-gray-300">
                  Welcome,{" "}
                  <span className="font-semibold text-green-400">
                    {user?.name ?? "Patient"}
                  </span>
                  . Your profile has been created.
                </p>
                <p className="text-base text-gray-400">
                  You can now book your first appointment with one of our
                  physicians.
                </p>
              </div>
            </div>

            {/* CTA */}
            <div className="flex flex-col items-center gap-4 w-full max-w-sm">
              <Link
                href="/"
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-green-500 px-6 py-3 text-base font-semibold text-white transition-all hover:bg-green-600 active:scale-[0.98]"
              >
                <CalendarCheck className="h-5 w-5" />
                Book an Appointment
              </Link>

              <Link
                href="/"
                className="text-sm text-gray-400 hover:text-gray-200 transition-colors"
              >
                ← Return to Home
              </Link>
            </div>
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
