"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import authApiRequest from "@/apiRequest/auth";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { formLoginSchema } from "@/type";
import { useRouter } from "next/navigation";
import { useUserContext } from "@/context/userProvider";
import { profileApiRequest } from "@/apiRequest/profile";

export function LoginForm() {
  const { setUser } = useUserContext();
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formLoginSchema>>({
    resolver: zodResolver(formLoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formLoginSchema>) => {
    try {
      const res = await authApiRequest.login(values);
      if (res?.result.statusCode === 401) {
        toast({
          title: "Error",
          description: res?.result.message,
          variant: "destructive",
        });
        return;
      }

      const { accessToken, refreshToken } = res?.result;

      await authApiRequest.requestApiToNextServer({
        accessToken,
        refreshToken,
      });
      const response = await profileApiRequest.profileClient();
      setUser(response?.result);

      toast({
        title: "Done",
        description: "Login Successfully",
        variant: "default",
      });
      router.push("/");
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.message,
        variant: "destructive",
      });
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8"
        noValidate
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="email..." {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="password..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="mt-4 text-center text-sm w-full flex flex-col gap-4">
          <Button type="submit" className="btn btn-submit w-full">
            Login
          </Button>
          <Button variant="outline" className="btn btn-submit w-full">
            Login with Google
          </Button>
        </div>
      </form>
    </Form>
  );
}
