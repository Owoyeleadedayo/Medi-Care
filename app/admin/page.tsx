import Image from "next/image";
import Link from "next/link";
import { StatCard } from "@/components/StatCard";
import { getRecentAppointmentList } from "@/lib/actions/appointment.actions";
import { DataTable } from "@/components/table/DataTable";
import { columns } from "@/components/table/columns";

const AdminPage = async () => {
  const appointments = await getRecentAppointmentList();

  if (!appointments) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-gray-400">
          Failed to load appointments. Please try again.
        </p>
      </div>
    );
  }

  return (
    <div className="px-6 xl:px-50 flex w-full max-w-full flex-col space-y-14">
      <header className="sticky top-3 z-20 flex items-center justify-between rounded-2xl bg-[#0D0F10] px-[5%] py-5 xl:px-12">
        <Link href="/" className="cursor-pointer">
          <Image
            src="/assets/Icons/logoFull.png"
            height={32}
            width={162}
            alt="logo"
            className="h-8 w-fit"
          />
        </Link>
        <p className="text-16 font-semibold">Admin Dashboard</p>
      </header>

      <main className="flex flex-col items-center space-y-6  pb-12 xl:space-y-12 xl:px-8">
        <section className="w-full space-y-4">
          <h1 className="text-32 font-bold md:text-36 md:font-bold">
            Welcome 👋
          </h1>
          <p className="text-dark-700">
            Start the day with managing new appointments
          </p>
        </section>

        <section className="flex w-full flex-col justify-between gap-5 sm:flex-row xl:gap-10">
          <StatCard
            type="appointments"
            count={appointments.scheduledCount}
            label="Scheduled appointments"
            icon="/assets/Icons/appointments.svg"
          />
          <StatCard
            type="pending"
            count={appointments.pendingCount}
            label="Pending appointments"
            icon="/assets/Icons/pending.svg"
          />
          <StatCard
            type="cancelled"
            count={appointments.cancelledCount}
            label="Cancelled appointments"
            icon="/assets/Icons/cancelled.svg"
          />
        </section>

        <DataTable columns={columns} data={appointments.documents} />
      </main>
    </div>
  );
};

export default AdminPage;
