import React from 'react';
import { Button } from './ui/button';
import { LoaderIcon } from "lucide-react";
import { cn } from '@/lib/utils';

interface ButtonProps {
    isLoading: boolean;
    className?: string;
    children: React.ReactNode;
}

const SubmitButton = ({ isLoading, className, children}: ButtonProps) => {
  return (
    <>
      <Button
        type="submit"
        className={className ?? "bg-green-400 text-base text-white w-full"}
        disabled={isLoading}
      >
        {isLoading ? (
          <div className="flex items-center gap-2">
            <LoaderIcon
              role="status"
              aria-label="Loading"
              className={cn("size-4 animate-spin", className)}
            />{" "}
            Submitting...
          </div>
        ) : (
          children
        )}
      </Button>
    </>
  );
}

export default SubmitButton;
