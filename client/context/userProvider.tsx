"use client";
import { ProfileType } from "@/type";
import React, { useState } from "react";

type UserContextType = {
  user: ProfileType | undefined;
  setUser: (user: ProfileType | undefined) => void;
};
const UserContext = React.createContext<UserContextType>({
  user: {
    id: "",
    email: "",
    name: "",
    address: "",
    role: "",
    createdAt: "",
    updatedAt: "",
  },
  setUser: (user: ProfileType | undefined) => {},
});

export const useUserContext = () => {
  const context = React.useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within in UserProvider");
  }
  return context;
};

export default function UserProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<ProfileType | undefined>();
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
