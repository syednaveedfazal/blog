import { cn } from "@/lib/utils";
import React, { HTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export const Container = ({ className, children, ...props }: Props) => (
  <div className={cn("container pt-4", className)} {...props}>
    {children}
  </div>
);
