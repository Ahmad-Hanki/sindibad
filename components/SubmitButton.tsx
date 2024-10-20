"use client";

import { useFormStatus } from "react-dom";
import { Button, ButtonProps } from "./ui/button";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

type VariantType =
  | "default"
  | "destructive"
  | "outline"
  | "secondary"
  | "ghost"
  | "link";

interface DeleteButtonProps extends ButtonProps {
  // Extend ButtonProps
  submit: string;
  submitting: string;
  variant?: VariantType;
  className?: string;
}

const SubmitButton = ({
  className,
  submit,
  variant = "default",
  submitting,
  ...props
}: DeleteButtonProps) => {
  const { pending } = useFormStatus();

  if (!pending)
    return (
      <Button
        type={"submit"}
        variant={variant}
        className={cn("py-4", className)}
        {...props}
      >
        {submit}
      </Button>
    );

  return (
    <Button
      variant={variant}
      disabled
      className={cn("py-4 flex items-center gap-1", className)}
      {...props}
    >
      <Loader2 className="animate-spin transition-all h-4 w-4" />
      <p>{submitting}</p>
    </Button>
  );
};

export default SubmitButton;
