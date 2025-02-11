"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Loading from "../components/loading";
import { useFontLoading } from "@/util/hooks/useFontLoading";
import PasswordModal from "../components/PasswordModal";

export function RouteMiddleware({ children }: { children: React.ReactNode }) {
  const [setIsPasswordModalOpen] = useState(false);
  const loading = useFontLoading();

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <div>{children}</div>
    </>
  );
}
