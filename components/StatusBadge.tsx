import clsx from "clsx";
import Image from "next/image";

import { StatusIcon } from "@/constants";

export const StatusBadge = ({ status }: { status: Status }) => {
  return (
    <div
      className={clsx("flex w-fit items-center gap-2 rounded-full px-4 py-2", {
        "bg-[#0D2A1F]": status === "scheduled",
        "bg-[#152432]": status === "pending",
        "bg-[#3E1716]": status === "cancelled",
      })}
    >
      <Image
        src={StatusIcon[status]}
        alt="doctor"
        width={24}
        height={24}
        className="h-fit w-3"
      />
      <p
        className={clsx(
          "text-[12px] text-white leading-4 font-semibold capitalize",
          {
            "text-[#24AE7C]": status === "scheduled",
            "text-[#79B5EC]": status === "pending",
            "text-[#F37877]": status === "cancelled",
          },
        )}
      >
        {status}
      </p>
    </div>
  );
};
