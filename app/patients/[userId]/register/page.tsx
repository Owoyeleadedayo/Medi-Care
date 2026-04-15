import RegisterForm from "@/components/forms/RegisterForm";
import { getUser } from "@/lib/actions/patient.actions";
import Image from "next/image";

const Registration = async ({ params: { userId } }: SearchParamProps) => {
  const user = await getUser(userId);
  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar relative flex-1 overflow-y-auto px-[5%]">
        <div className="mx-auto flex size-full flex-1 flex-col py-10 max-w-162.5">
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
          <RegisterForm user={user} />
          <p className="justify-items-end text-base text-gray-300 xl:text-left py-12">
            © 2026 Medi-Care. All rights reserved.
          </p>
        </div>
      </section>

      <Image
        src="/assets/register.png"
        alt="patient form image"
        height={1000}
        width={1000}
        className="hidden h-full object-cover md:block max-w-124"
      />
    </div>
  );
};

export default Registration;
