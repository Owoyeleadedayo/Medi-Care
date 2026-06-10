import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Doctors } from "@/constants";
import { getAppointment } from "@/lib/actions/appointment.actions";
import { formatDateTime } from "@/lib/utils";

const RequestSuccess = async ({ searchParams, params }: SearchParamProps) => {
  const { userId } = await params;
  const resolvedSearchParams = await searchParams;

  const appointmentId =
    typeof resolvedSearchParams?.appointmentId === "string"
      ? resolvedSearchParams.appointmentId
      : "";

  const appointment = await getAppointment(appointmentId);

  const doctor = Doctors.find(
    (doc) => doc.name === appointment?.primaryPhysician,
  );

  return (
    <div className="flex h-screen max-h-screen px-[5%]">
      <div className="m-auto flex flex-1 flex-col items-center justify-between gap-10 py-10">
        <Link href="/">
          <Image
            src="/assets/Icons/logoFull.png"
            height={1000}
            width={1000}
            alt="logo"
            className="h-10 w-fit"
          />
        </Link>

        <section className="flex flex-col items-center">
          <Image
            src="/assets/gifs/success.gif"
            height={300}
            width={280}
            alt="success"
          />
          <h2 className="text-[24px] leading-9 font-bold md:text-[32px] md:leading-9 mb-6 max-w-150 text-center">
            Your <span className="text-green-500">appointment request</span> has
            been successfully submitted!
          </h2>
          <p>We&apos;ll be in touch shortly to confirm.</p>
        </section>

        <section className="flex w-full flex-col items-center gap-8 border-y-2 border-dark-400 py-8 md:w-fit md:flex-row">
          <p>Requested appointment details:</p>
          <div className="flex items-center gap-3">
            {doctor?.image && (
              <Image
                src={doctor.image}
                alt="doctor"
                width={100}
                height={100}
                className="size-6"
              />
            )}
            <p className="whitespace-nowrap">Dr. {doctor?.name}</p>
          </div>
          <div className="flex gap-2">
            <Image
              src="/assets/Icons/calendar.svg"
              height={24}
              width={24}
              alt="calendar"
            />
            <p>
              {appointment?.schedule
                ? formatDateTime(appointment.schedule).dateTime
                : "—"}
            </p>
          </div>
        </section>

        <Button variant="outline" className="bg-green-500 text-white border-none">
          <Link href={`/patients/${userId}/new-appointment`}>
            New Appointment
          </Link>
        </Button>

        <p className="copyright">© 2024 CarePluse</p>
      </div>
    </div>
  );
};

export default RequestSuccess;
