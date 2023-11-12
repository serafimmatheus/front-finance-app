"use client";

import { useRouter } from "next/navigation";
import { ReactNode } from "react";

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  type: "primary" | "secondary";
  rota?: string;
  isLoad?: boolean;
  ctaType?: "submit" | "button";
}

export function MyButton({
  children,
  type,
  rota,
  isLoad,
  ctaType = "submit",
  ...rest
}: ButtonProps) {
  const route = useRouter();
  const bgColor = type === "primary" ? "bg-green-500" : "bg-gray-400";
  const textColor = type === "primary" ? "text-gray-100" : "text-gray-100";

  function handleClick() {
    if (rota) {
      route.push(rota);
    }
  }

  return (
    <button
      {...rest}
      onClick={handleClick}
      disabled={isLoad}
      type={ctaType}
      className={`${bgColor} ${textColor} rounded-xl p-4 text-xs`}
    >
      {children}
    </button>
  );
}
