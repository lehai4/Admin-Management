"use client";
import AvatarUser from "@/app/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUserContext } from "@/context/userProvider";
import { clientAccessToken, clientRefreshToken } from "@/lib/http";
import { useRouter } from "next/navigation";

const Header = () => {
  const router = useRouter();
  const { user, setUser } = useUserContext();
  const accessToken = clientAccessToken.value;
  const refreshToken = clientRefreshToken.value;

  const handleLogout = async () => {
    await fetch("/api/auth/logout", {
      method: "POST",
      body: JSON.stringify({ accessToken, refreshToken }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    setUser(undefined);
    router.push("/login");
  };
  return (
    <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
      <div className="w-full flex-1"></div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <div className="flex flex-row items-center gap-2">
            {user ? user?.role : "No role"}
            <AvatarUser />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Settings</DropdownMenuItem>
          <DropdownMenuItem>Support</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
};

export default Header;
