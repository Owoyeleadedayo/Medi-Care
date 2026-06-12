import clsx from "clsx";
import Image from "next/image";

type StatCardProps = {
  type: "appointments" | "pending" | "cancelled";
  count: number;
  label: string;
  icon: string;
};

const backgroundImages = {
  appointments: "/assets/images/appointments-bg.png",
  pending: "/assets/images/pending-bg.png",
  cancelled: "/assets/images/cancelled-bg.png",
};

export const StatCard = ({ count = 0, label, icon, type }: StatCardProps) => {
  return (
    <div
      className={clsx(
        "flex flex-1 flex-col gap-6 rounded-2xl bg-cover p-6 shadow-lg",
        {
          "bg-appointments": type === "appointments",
          "bg-pending": type === "pending",
          "bg-cancelled": type === "cancelled",
        },
      )}
      style={{ backgroundImage: `url(${backgroundImages[type]})` }}
    >
      <div className="flex items-center gap-4">
        <Image
          src={icon}
          height={32}
          width={32}
          alt={label}
          className="size-8 w-fit"
        />
        <h2 className="text-[32px] leading-9 font-bold text-white">
          {count}
        </h2>
      </div>

      <p className="text-[14px] leading-4.5 font-normal text-white">
        {label}
      </p>
    </div>
  );
};
