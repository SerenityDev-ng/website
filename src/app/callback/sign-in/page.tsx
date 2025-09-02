"use client";

import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
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
import Image from "next/image";
import { auth_image } from "@/assets/images";
import instance from "@/lib/axios-instance";
import { toast } from "sonner";
import { UserResponse } from "../../../../types";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useAuthStore } from "@/hooks/store/user";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import api from "@/lib/axios-instance";

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters." }),
});

export default function SignInForm() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);
  const { mutate, isPending } = useMutation({
    mutationKey: ["signIn"],
    mutationFn: async (data: z.infer<typeof formSchema>) => {
      try {
        const response = await api.post("/api/auth/user_login", data);
        return response.data as UserResponse;
      } catch (error: any) {
        toast.error(error.response.data.message);
      }
    },
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    mutate(values, {
      onSuccess: (data) => {
        if (data) {
          setUser(data.data);
          toast.success("Welcome to Serenity!");
          router.push("/");
        }
      },
      onError: (error: any) => {
        toast.error(error.response.data.message);
      },
    });
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full rounded-lg bg-white p-8">
        <div className="grid gap-8 md:grid-cols-2 ">
          <div className="mt-8 space-y-8">
            <h1 className=" text-4xl xl:text-[72px] font-semibold dark:text-black">
              Hello there!
            </h1>
            <p className="pt-5 text-xl xl:text-[55px] text-primary  font-league-spartan font-semibold">
              Sign In to get started
            </p>
            <Image
              src={auth_image}
              alt="Rocket illustration"
              width={400}
              height={400}
              className=""
            />
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#4E4848]">Email</FormLabel>
                    <FormControl>
                      <Input {...field} type="email" />
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
                    <FormLabel className="text-[#4E4848]">Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          {...field}
                          type={showPassword ? "text" : "password"}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                        >
                          {showPassword ? (
                            <EyeOff className="h-5 w-5" />
                          ) : (
                            <Eye className="h-5 w-5" />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end ">
                <Button
                  disabled={isPending}
                  type="submit"
                  className=" bg-primary text-white hover:bg-primary px-20"
                >
                  Sign In
                  {isPending && (
                    <Loader2 className="w-6 h-6 ml-2 animate-spin" />
                  )}
                </Button>
              </div>

              <div className="flex justify-center">
                <Link href="/callback/sign-up" className="hover:underline">
                  <p className="text-primary">
                    Don&apos; have an account? Sign Up
                  </p>
                </Link>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
