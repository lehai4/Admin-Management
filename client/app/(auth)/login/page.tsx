import Link from "next/link";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LoginForm } from "@/app/ui/Form/loginForm";

const LoginPage = () => {
  return (
    <Card className="mx-auto max-w-sm top-[50%] translate-y-[-50%] relative">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <LoginForm />
        </div>
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?
          <Link href="#" className="underline">
            Sign up
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};
export default LoginPage;
