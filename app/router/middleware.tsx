"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Loading from "../components/loading";
import { useFontLoading } from "@/util/hooks/useFontLoading";
import PasswordModal from "../components/PasswordModal";
// import FontFaceObserver from "fontfaceobserver";
// import PasswordModal from "../components/PasswordModal";

export function RouteMiddleware({ children }: { children: React.ReactNode }) {
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const loading = useFontLoading();

  // 检查项目路由权限
  useEffect(() => {
    if (pathname?.startsWith("/projects")) {
      const hasAuth = document.cookie.includes("projectAuth=true");
      if (!hasAuth) {
        setIsPasswordModalOpen(true);
        router.replace("/");
      }
    }
  }, [pathname, router]);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <div>{children}</div>
      <PasswordModal isOpen={isPasswordModalOpen} onClose={() => setIsPasswordModalOpen(false)} />
    </>
  );
}
