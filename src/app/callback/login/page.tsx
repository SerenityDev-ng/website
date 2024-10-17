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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import { auth_image } from "@/assets/images";
import naijaStates from "naija-state-local-government";
import instance from "@/lib/axios-instance";
import { toast } from "sonner";
import { UserResponse } from "../../../../types";
import { Loader2 } from "lucide-react";
import { useAuthStore } from "@/hooks/store/user";

const formSchema = z.object({
  full_name: z.string().min(2, {
    message: "First name must be at least 2 characters.",
  }),
  address: z.string().min(2, { message: "Address is required." }),
  state: z.string().min(1, {
    message: "Please select a state.",
  }),
  location_area: z.string().min(1, {
    message: "Location area is required.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone_number: z.string().regex(/^\+?[1-9]\d{1,14}$/, {
    message: "Please enter a valid phone number.",
  }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters." }),
  sex: z.string().min(4, { message: "Please choose a gender" }),
});

export default function SignInForm() {
  const setUser = useAuthStore((state) => state.setUser);
  const { mutate, isPending } = useMutation({
    mutationKey: ["signUp"],
    mutationFn: async (data: z.infer<typeof formSchema>) => {
      try {
        const response = await instance.post("/auth/user_sign_up", data);
        return response.data as UserResponse;
      } catch (error: any) {
        toast.error(error.response.data.message);
      }
    },
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      full_name: "",
      address: "",
      state: "",
      sex: "",
      location_area: "",
      email: "",
      phone_number: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    mutate(values, {
      onSuccess: (data) => {
        if (data) {
          setUser(data.data);
        }
        toast.success("Welcome to Serenity!");
      },
      onError: (error: any) => {
        toast.error(error.response.data.message);
      },
    });
  }

  return (
    <div className="flex min-h-screen justify-center p-4">
      <div className="w-full rounded-lg bg-white p-8">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="mt-8 space-y-8">
            <h1 className=" text-4xl xl:text-[72px] font-semibold">
              Hello there!
            </h1>
            <p className="pt-5 text-xl xl:text-[55px] text-primary font-league-spartan font-semibold">
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
                name="full_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#4E4848]">Full name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
                name="phone_number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#4E4848]">
                      Phone number
                    </FormLabel>
                    <FormControl>
                      <Input {...field} type="tel" />
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
                      <Input {...field} type="password" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="state"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#4E4848]">State</FormLabel>
                    <Select
                      onValueChange={(value: string) => {
                        field.onChange(value);
                      }}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a State" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {naijaStates.states().map((state: string) => (
                          <SelectItem key={state} value={state}>
                            {state}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="location_area"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#4E4848]">
                      Location area
                    </FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#4E4848]">Address</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="sex"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#4E4848]">Gender</FormLabel>
                    <Select
                      onValueChange={(value: string) => {
                        field.onChange(value);
                      }}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a gender" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                      </SelectContent>
                    </Select>
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
                  Sign up
                  {isPending && (
                    <Loader2 className="w-6 h-6 ml-2 animate-spin" />
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
