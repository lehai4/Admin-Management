"use client";

import authApiRequest from "@/apiRequest/auth";
import { clientAccessToken } from "@/lib/http";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

const LogoutPage = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const accessToken = searchParams.get("accessToken");

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    if (accessToken === clientAccessToken.value) {
      let force = true;
      (async function Logout() {
        await authApiRequest
          .logoutFromNextClientToNextServer(force, signal)
          .then((res) => {
            router.push("/login");
          });
      })();
    }
    return () => {
      controller.abort();
    };
  }, [accessToken, router, pathname]);
  return (
    <div>
      <h1 className="text-red-500 font-lg">Logout</h1>
    </div>
  );
};

export default LogoutPage;
