"use client";
import { clientAccessToken, clientRefreshToken } from "@/lib/http";
import { useState } from "react";

export function SessionProvider({
  children,
  accessToken = "",
  refreshToken = "",
}: {
  children: React.ReactNode;
  accessToken?: string;
  refreshToken?: string;
}) {
  useState(() => {
    clientAccessToken.value = accessToken;
    clientRefreshToken.value = refreshToken;
  });

  return <>{children}</>;
}
