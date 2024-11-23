"use client";

import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import debounce from "lodash/debounce";
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
import { Loader2, Eye, EyeOff } from "lucide-react";
import { useAuthStore } from "@/hooks/store/user";
import { useRouter } from "next/navigation";
import search from "nominatim-browser";
import { useCallback, useState } from "react";
import axios from "axios";
import useDebounce from "@/hooks/debounce";
import Link from "next/link";

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
  latitude: z.number(),
  longitude: z.number(),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone_number: z.string({
    message: "Please enter a valid phone number.",
  }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters." }),
  sex: z.string().min(4, { message: "Please choose a gender" }),
});

interface LocationResult {
  display_name: string;
  lat: string;
  lon: string;
}

export default function SignInForm() {
  const [searchResults, setSearchResults] = useState<LocationResult[]>([]);
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const router = useRouter();
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
      latitude: 0,
      longitude: 0,
    },
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleLocationSearch = async (query: string) => {
    if (query.length < 3) return;

    setIsSearching(true);
    try {
      const results = await axios.get(
        `https://nominatim.openstreetmap.org/search?q=${form.getValues("location_area")}&format=jsonv2&countrycodes=ng`,
        {
          headers: {
            "User-Agent":
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3",
          },
        }
      );
      setSearchResults(results.data as LocationResult[]);
    } catch (error) {
      console.error("Location search error:", error);
    } finally {
      setIsSearching(false);
    }
  };

  const debouncedSearch = useCallback(
    debounce((query: string) => handleLocationSearch(query), 1000),
    []
  );

  const getCurrentLocation = () => {
    setIsGettingLocation(true);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const { latitude, longitude } = position.coords;

            // Reverse geocode the coordinates
            const response = await axios.get(
              `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`,
              {
                headers: {
                  "User-Agent":
                    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
                },
              }
            );

            const result = response.data;

            // Update form with location data
            form.setValue("latitude", latitude);
            form.setValue("longitude", longitude);
            form.setValue("location_area", result.display_name);

            setSearchResults([]);
          } catch (error) {
            console.error("Error getting location:", error);
            toast.error("Failed to get location details");
          } finally {
            setIsGettingLocation(false);
          }
        },
        (error) => {
          console.error("Geolocation error:", error);
          toast.error("Failed to get your location");
          setIsGettingLocation(false);
        }
      );
    } else {
      toast.error("Geolocation is not supported by your browser");
      setIsGettingLocation(false);
    }
  };
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    mutate(values, {
      onSuccess: (data) => {
        if (data) {
          setUser(data.data);
        }
        toast.success("Welcome to Serenity!");
        router.push("/");
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
                      <Input
                        {...field}
                        onChange={(e) =>
                          field.onChange(e.target.value.toLowerCase())
                        }
                        type="email"
                      />
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
                      <Input
                        {...field}
                        onChange={(e) =>
                          field.onChange(e.target.value.toString())
                        }
                        type="tel"
                      />
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
                      <div>
                        <Input
                          {...field}
                          onChange={(e) => {
                            field.onChange(e.target.value);
                            debouncedSearch(e.target.value);
                          }}
                        />
                        <Button
                          type="button"
                          variant="outline"
                          onClick={getCurrentLocation}
                          disabled={isGettingLocation}
                          className="mt-4"
                        >
                          {isGettingLocation ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            "Use Current Location"
                          )}
                        </Button>
                      </div>
                    </FormControl>
                    {searchResults.length > 0 && (
                      <div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg">
                        {searchResults.map((result, index) => (
                          <div
                            key={index}
                            className="p-2 cursor-pointer hover:bg-gray-100"
                            onClick={() => {
                              field.onChange(result.display_name);
                              form.setValue("latitude", parseFloat(result.lat));
                              form.setValue(
                                "longitude",
                                parseFloat(result.lon)
                              );
                              setSearchResults([]);
                            }}
                          >
                            {result.display_name}
                          </div>
                        ))}
                      </div>
                    )}
                    {isSearching && (
                      <div className="absolute right-3 top-9">
                        <Loader2 className="w-4 h-4 animate-spin" />
                      </div>
                    )}
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

              <div className="flex justify-center">
                <Link href="/callback/sign-in" className="hover:underline">
                  <p className="text-primary">
                    Already have an account? Sign In
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
