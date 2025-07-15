"use client";

import { usePathname } from "next/navigation";
import MainLayout from "./MainLayout";

export default function ChildrenLayout({ children }) {
  const pathname = usePathname();

  const renderHeader = (children) => {
    if (pathname.startsWith("/auth")) return children;
    if (pathname.startsWith("/admin")) return children;
    return <MainLayout>{children}</MainLayout>;
  };

  return <>{renderHeader(children)}</>;
}