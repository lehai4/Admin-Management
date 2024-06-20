"use client";
import { profileApiRequest } from "@/apiRequest/profile";
import { ResponseProfile } from "@/type";
import { useEffect, useState } from "react";
const PageProfile = () => {
  const [profile, setProfile] = useState<ResponseProfile | undefined>();

  useEffect(() => {
    const getProfile = async () => {
      const res = await profileApiRequest.profileClient();
      setProfile(res?.result);
    };
    getProfile();
  }, []);
  return (
    <div>
      <h1 className="text-[30px] font-semibold">Profile</h1>
      <div className="h-[1px] w-full bg-muted"></div>
      <div className="flex flex-col gap-2 py-2">
        <h3>Name: {profile?.name}</h3>
        <p>Email: {profile?.email}</p>
        <p>Address: {profile?.address}</p>
        <p>Role: {profile?.role}</p>
      </div>
    </div>
  );
};

export default PageProfile;
