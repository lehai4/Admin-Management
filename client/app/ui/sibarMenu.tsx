"use client";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import {
  Bell,
  Home,
  Layers3,
  Package,
  Package2,
  Settings2,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navBar = [
  {
    domain: "/",
    pathname: "Dashboard",
    icon: <Home className="h-4 w-4" />,
  },
  {
    domain: "/product",
    pathname: "Product",
    icon: <Package className="h-4 w-4" />,
  },
  {
    domain: "/category",
    pathname: "Category",
    icon: <Layers3 className="h-4 w-4" />,
  },
];
const SibarMenu = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <Package2 className="h-6 w-6" />
              <span className="">Acme Inc</span>
            </Link>
            <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
              <Bell className="h-4 w-4" />
              <span className="sr-only">Toggle notifications</span>
            </Button>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-md font-medium lg:px-4 gap-4">
              {navBar.map((nav, index) => (
                <Link
                  href={`${nav.domain}`}
                  key={index}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${
                    pathname === nav.domain
                      ? "text-primary bg-muted"
                      : "text-muted-foreground"
                  }`}
                >
                  {nav.icon}
                  {nav.pathname}
                </Link>
              ))}
            </nav>
          </div>
          <div className="mt-auto p-4">
            <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
              <Button size="icon">
                <Settings2 className="h-4 w-4 rounded-full" />
              </Button>
            </CardContent>
          </div>
        </div>
      </div>
      {children}
    </div>
  );
};

export default SibarMenu;
