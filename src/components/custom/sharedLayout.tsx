"use client";

import { usePathname } from "next/navigation";
import React from "react";

export default function SharedLayout({
  header,
  children,
}: {
  header: React.ReactNode;
  children: React.ReactNode;
}) {
  const pathName = usePathname();
  const nonLayoutRoutes = ["/login", "/register"];
  const shouldRenderLayout = !nonLayoutRoutes.includes(pathName);
  return (
    <main>
      {shouldRenderLayout ? (
        <>
          {header}
          <main>{children}</main>
        </>
      ) : (
        <main>{children}</main>
      )}
    </main>
  );
}