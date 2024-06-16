"use client";
import { profileApiRequest } from "@/apiRequest/profile";
import AvatarUser from "@/app/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ResponseProfile } from "@/type";
import { useEffect, useState } from "react";
const Header = () => {
  const [profile, setProfile] = useState<ResponseProfile | undefined>();
  useEffect(() => {
    (async function getProfile() {
      const res = await profileApiRequest.profileClient();
      setProfile(res?.result);
    })();
  }, []);

  return (
    <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
      <div className="w-full flex-1"></div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <div className="flex flex-row items-center gap-2">
            {profile?.role ? profile?.role : "No Role"}
            <AvatarUser />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Settings</DropdownMenuItem>
          <DropdownMenuItem>Support</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
};

export default Header;
