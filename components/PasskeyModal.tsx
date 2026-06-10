"use client";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { decryptKey, encryptKey } from "@/lib/utils";

const ADMIN_PASSKEY = process.env.NEXT_PUBLIC_ADMIN_PASSKEY ?? "";

export const PasskeyModal = () => {
  const router = useRouter();
  const path = usePathname();
  const [passkey, setPasskey] = useState("");
  const [error, setError] = useState("");

  const encryptedKey =
    typeof window !== "undefined"
      ? window.localStorage.getItem("accessKey")
      : null;
  const accessKey = encryptedKey ? decryptKey(encryptedKey) : null;
  const isVerified = accessKey === ADMIN_PASSKEY;
  const [open, setOpen] = useState(!isVerified);

  useEffect(() => {
    if (isVerified) {
      router.push("/admin");
    }
  }, [isVerified, path, router]);

  const closeModal = () => {
    setOpen(false);
    router.push("/");
  };

  const validatePasskey = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();

    if (passkey === ADMIN_PASSKEY) {
      localStorage.setItem("accessKey", encryptKey(passkey));
      setOpen(false);
      router.push("/admin");
    } else {
      setError("Invalid passkey. Please try again.");
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent className="w-full space-y-5 bg-black/95 border border-black outline-none">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex w-full items-start justify-between">
            Admin Access Verification
            <Image
              src="/assets/Icons/close.svg"
              alt="close"
              width={20}
              height={20}
              onClick={closeModal}
              className="cursor-pointer"
            />
          </AlertDialogTitle>
          <AlertDialogDescription>
            To access the admin page, please enter the passkey.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="flex flex-col gap-3">
          <InputOTP
            maxLength={6}
            value={passkey}
            onChange={(value) => setPasskey(value)}
            className="w-full"
          >
            <InputOTPGroup className="flex w-full gap-2">
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <InputOTPSlot
                  key={i}
                  index={i}
                  className="flex-1 h-16 text-2xl font-bold border border-dark-500 rounded-lg"
                />
              ))}
            </InputOTPGroup>
          </InputOTP>

          {error && <p className="text-red-400 text-sm text-center">{error}</p>}
        </div>

        <AlertDialogFooter>
          <AlertDialogAction
            onClick={validatePasskey}
            className="bg-green-500 text-white w-full"
          >
            Enter Admin Passkey
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
