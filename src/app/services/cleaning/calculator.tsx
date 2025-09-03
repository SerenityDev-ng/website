"use client";

import { cleaning_man, laundry_side, vaccum_cleaning } from "@/assets/images";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { FaArrowRight } from "react-icons/fa";
import { Checkbox } from "@/components/ui/checkbox";
import { Cleaning, cleaning } from "@/lib/laundry";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import DrawerDialog from "@/app/_components/drawer-dialog";
import CleaningServiceForm from "@/app/_components/forms/cleaning";
import { useBookCleaning, useGetHouseTypes, type BookCleaningPayload } from "@/hooks/useBookCleaning";
import { useAuthStore } from "@/hooks/store/user";
import { DatePicker } from "@/components/ui/date-picker";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

type Props = {
  cleaningType: string;
};

const PRICING_DATA = {
  detailed: {
    flat: {
      oneTime: {
        selfcon: 25000,
        oneBedroomFlat: 35000,
        twoBedroomFlat: 40000,
        threeBedroomFlat: 55000,
        fourBedroomFlat: 65000,
        fiveBedroomFlat: 70000,
        mansion: 120000,
      },
      frequent: {
        selfcon: 25000,
        oneBedroomFlat: 35000,
        twoBedroomFlat: 40000,
        threeBedroomFlat: 55000,
        fourBedroomFlat: 65000,
        fiveBedroomFlat: 75000,
        mansion: 100000,
      },
    },
    duplex: {
      oneTime: {
        oneBedroomFlat: 50000,
        twoBedroomFlat: 55000,
        threeBedroomFlat: 75000,
        fourBedroomFlat: 110000,
        fiveBedroomFlat: 135000,
        mansion: 135000,
      },
      frequent: {
        oneBedroomFlat: 35000,
        twoBedroomFlat: 35000,
        threeBedroomFlat: 70000,
        fourBedroomFlat: 80000,
        fiveBedroomFlat: 90000,
        mansion: 100000,
      },
    },
  },
  deep: {
    flat: {
      oneBedroomFlat: 55000,
      twoBedroomFlat: 70000,
      threeBedroomFlat: 80000,
      fourBedroomFlat: 110000,
      fiveBedroomFlat: 120000,
    },
    duplex: {
      oneBedroomFlat: 50000,
      twoBedroomFlat: 70000,
      threeBedroomFlat: 120000,
      fourBedroomFlat: 125000,
      fiveBedroomFlat: 140000,
    },
  },
};

const CleaningCalculator = ({ cleaningType }: Props) => {
  const [open, setOpen] = useState(false);
  const [frequency, setFrequency] = useState("Once A Week");
  const [isOneTime, setIsOneTime] = useState(false);
  const [total, setTotal] = useState(0);
  const [selectedTitles, setSelectedTitles] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [buildingType, setBuildingType] = useState<"flat" | "duplex">("flat");
  const [cleaningHouse, setCleaningHouse] = useState<"detailed" | "deep">(
    "detailed"
  );
  const [time, setTime] = useState("8am - 12pm");
  const [selectedHouseTypeId, setSelectedHouseTypeId] = useState<string>("");
  const [appointmentDate, setAppointmentDate] = useState<Date | undefined>(undefined);
  const [selectedDays, setSelectedDays] = useState<string[]>([]);

  // Initialize hooks for booking and auth store
  const { mutateAsync: bookCleaning, isPending: isBooking } = useBookCleaning();
  const user = useAuthStore((state) => state.user);
  const { data: houseTypesResp, isLoading: houseTypesLoading } = useGetHouseTypes();
  const filteredHouseTypes = React.useMemo(
    () => (houseTypesResp?.data ?? []).filter((ht) => (buildingType === "duplex" ? ht.isDuplex : !ht.isDuplex)),
    [houseTypesResp, buildingType]
  );
  const selectedHouseType = React.useMemo(
    () => filteredHouseTypes.find((ht) => ht._id === selectedHouseTypeId),
    [filteredHouseTypes, selectedHouseTypeId]
  );

  // Helper to safely parse backend price strings like "120,000"
  const toNum = (v: string | number | undefined) =>
    typeof v === "number" ? v : Number(String(v ?? "0").replace(/,/g, ""));

  // removed deprecated matchedHouseType based on rooms/toilets
  // const matchedHouseType = React.useMemo(() => {
  //   const rooms = services.find((s) => s.title === "Bedrooms")?.quantity || 0;
  //   const toilets = services.find((s) => s.title === "Toilets")?.quantity || 0;
  //   const isDuplexFlag = buildingType === "duplex";
  //   const list = houseTypesResp?.data || [];
  //   const found = list.find((ht) => {
  //     const r = parseInt(ht.rooms, 10);
  //     const t = parseInt(ht.toilets, 10);
  //     return ht.isDuplex === isDuplexFlag && r === rooms && t === toilets;
  //   });
  //   return found;
  // }, [houseTypesResp, services, buildingType]);

  const calculateTotal = () => {
    if (!selectedHouseType) {
      toast.warning("Please select a house type", { position: "top-center" });
      return 0;
    }

    // Deep cleaning uses deepCleaning_price (fallback to onetime_price if missing)
    if (cleaningHouse === "deep") {
      const price = toNum(selectedHouseType.deepCleaning_price) || toNum(selectedHouseType.onetime_price);
      return price;
    }

    // Detailed cleaning: either one-time or monthly subscription
    if (isOneTime) {
      return toNum(selectedHouseType.onetime_price);
    }

    // Monthly subscription: adjust by weekly frequency (1x, 2x, 3x per week)
    const base = toNum(selectedHouseType.monthly_price);
    let multiplier = 1;
    if (frequency === "Twice A Week") multiplier = 2;
    if (frequency === "Three Times A Week") multiplier = 3;
    return base * multiplier;
  };

  // Removed legacy quantity-based handlers (updateServicesAndTotal, incrementExtraQuantity, decrementExtraQuantity)
  // Calculate total using house type-based calculation
const handleFetch = () => {
    if (!selectedHouseTypeId) {
      return toast.warning("Please select a house type", { position: "top-center" });
    }
    if (houseTypesLoading) {
      return toast.message("Fetching latest pricing... Please try again in a moment.", { position: "top-center" });
    }
    setIsLoading(true);
    const newTotal = calculateTotal();
    setTotal(Number(newTotal));
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timeout);
  };

  useEffect(() => {
    handleFetch();
  }, [time, frequency, isOneTime, cleaningHouse, buildingType]);

  const normalizeFrequency = (f: string) => {
    switch (f) {
      case "Three Times A Week":
        return "Three Times A Week";
      case "Twice A Week":
        return "Twice A Week";
      case "Once A Week":
        return "once_in_a_week";
      default:
        return "Once_A_Week";
    }
  };

  const parseTimeWindow = (t: string): { opening_time: string; closing_time: string } => {
    const lower = t.toLowerCase();
    if (lower.includes("8am")) {
      return { opening_time: "08:00", closing_time: "12:00" };
    }
    if (lower.includes("12pm")) {
      return { opening_time: "12:00", closing_time: "16:00" };
    }
    // Fallback to morning slot
    return { opening_time: "08:00", closing_time: "12:00" };
  };

  const handleCleaningFormSubmit = async (form: {
    email: string;
    name: string;
    location: string;
    house: "flat" | "duplex";
    serviceType: string;
    cleaningType: string;
    cleaningHouse: "detailed" | "deep";
    price: number;
    frequency: string;
    time: string;
    phone: string;
    videoUrls: string[];
    house_type_id?: string;
  }) => {
    try {
      // Basic guard: ensure a house type is selected for housekeeping
      if (cleaningType === "Housekeeping" && !form.house_type_id && !selectedHouseTypeId) {
        toast.warning("Please select a house type before booking", { position: "top-center" });
        return;
      }

      // Prefer the house_type_id coming from the form dropdown; otherwise, fall back to selected house type
      let houseTypeId = form.house_type_id || selectedHouseTypeId || "";
      if (!houseTypeId) {
        toast.warning("Please select a valid house type before booking.", { position: "top-center" });
        return;
      }

      // Guard for appointment date selection
      if (!appointmentDate) {
        toast.warning(isOneTime ? "Please select an appointment date" : "Please select a start date", { position: "top-center" });
        return;
      }

      // Guard for day selection for subscription orders
      if (!isOneTime && selectedDays.length === 0) {
        toast.warning("Please select at least one day for your subscription", { position: "top-center" });
        return;
      }

      // Validate correct number of days based on frequency
      if (!isOneTime) {
        const requiredDays = frequency === "Once A Week" ? 1 : frequency === "Twice A Week" ? 2 : 3;
        if (selectedDays.length !== requiredDays) {
          toast.warning(`Please select exactly ${requiredDays} day${requiredDays > 1 ? 's' : ''} for ${frequency.toLowerCase()}`, { position: "top-center" });
          return;
        }
      }

      let payload: any;

      if (isOneTime) {
        // One-time order payload
        payload = {
          house_type_id: houseTypeId,
          cleaningHouse: form.cleaningHouse,
          buildingType: form.house,
          appointment_date: appointmentDate?.toISOString().split('T')[0] || new Date().toISOString().split('T')[0],
          appointment_time: form.time === "8am - 12pm" ? "09:00" : "13:00",
          cleaning_address: {
            state: user?.profile?.state || "",
            address:
              user?.profile?.address?.address ||
              user?.profile?.location_area ||
              form.location ||
              "",
            longitude: user?.profile?.address?.longitude || "",
            latitude: user?.profile?.address?.latitude || "",
          },
          payment_method: "PAYMENT_GATEWAY",
          notes: ""
        };
      } else {
         // Subscription order payload
         const normalizedFreq = normalizeFrequency(form.frequency);
         const startTime = form.time === "8am - 12pm" ? "08:00" : "12:00";
         const endTime = form.time === "8am - 12pm" ? "12:00" : "16:00";
         
         // Calculate end date (3 months from start date)
         const startDate = appointmentDate || new Date();
         const endDate = new Date(startDate);
         endDate.setMonth(endDate.getMonth() + 3);
         
         // Create weekly schedule for each selected day
         const weeklySchedule = selectedDays.map(day => ({
           day: day,
           time_slots: [
             {
               start_time: startTime,
               end_time: endTime
             }
           ]
         }));
         
         payload = {
           house_type_id: houseTypeId,
           cleaningHouse: form.cleaningHouse,
           buildingType: form.house,
           frequency: normalizedFreq,
           subscription: {
             start_date: startDate.toISOString().split('T')[0],
             end_date: endDate.toISOString().split('T')[0],
             weekly_schedule: weeklySchedule
               },
             
           
           cleaning_address: {
             state: user?.profile?.state || "",
             address:
               user?.profile?.address?.address ||
               user?.profile?.location_area ||
               form.location ||
               ""
           },
           payment_method: "PAYMENT_GATEWAY",
           notes: ""
         };
      }

      const res = await bookCleaning(payload);
      if (res && (res as any).data?.payment_url) {
        const url = (res as any).data.payment_url as string;
        toast.success("Redirecting to payment...", { position: "top-center" });
        setOpen(false);
        if (typeof window !== "undefined") {
          window.location.href = url;
        }
      } else {
        toast.success("Cleaning booking created", { position: "top-center" });
        setOpen(false);
      }
    } catch (error: any) {
      const message = error?.response?.data?.message || "Failed to create booking";
      toast.error(message, { position: "top-center" });
    }
  };

  // New: directly create booking when clicking the Schedule Cleaning button
  const handleScheduleClick = async () => {
    try {
      // Guard for housekeeping: require a house type selection
      if (cleaningType === "Housekeeping" && !selectedHouseTypeId) {
        toast.warning("Please select a house type before booking", { position: "top-center" });
        return;
      }

      // Guard for appointment date selection
      if (!appointmentDate) {
        toast.warning(isOneTime ? "Please select an appointment date" : "Please select a start date", { position: "top-center" });
        return;
      }

      // Guard for day selection for subscription orders
      if (!isOneTime && selectedDays.length === 0) {
        toast.warning("Please select at least one day for your subscription", { position: "top-center" });
        return;
      }

      // Validate correct number of days based on frequency
      if (!isOneTime) {
        const requiredDays = frequency === "Once A Week" ? 1 : frequency === "Twice A Week" ? 2 : 3;
        if (selectedDays.length !== requiredDays) {
          toast.warning(`Please select exactly ${requiredDays} day${requiredDays > 1 ? 's' : ''} for ${frequency.toLowerCase()}`, { position: "top-center" });
          return;
        }
      }

      let payload: any;

      if (isOneTime) {
        // One-time order payload
        payload = {
          house_type_id: selectedHouseTypeId || "",
          cleaningHouse: cleaningHouse,
          buildingType: buildingType,
          appointment_date: appointmentDate?.toISOString().split('T')[0] || new Date().toISOString().split('T')[0],
          appointment_time: time === "8am - 12pm" ? "09:00" : "13:00",
          cleaning_address: {
            state: user?.profile?.state || "",
            address:
              user?.profile?.address?.address ||
              user?.profile?.location_area ||
              "",
            longitude: user?.profile?.address?.longitude || "",
            latitude: user?.profile?.address?.latitude || "",
          },
          payment_method: "PAYMENT_GATEWAY",
          notes: ""
        };
      } else {
        // Subscription order payload
        const normalizedFreq = normalizeFrequency(frequency);
        const startTime = time === "8am - 12pm" ? "08:00" : "12:00";
        const endTime = time === "8am - 12pm" ? "12:00" : "16:00";
        
        // Calculate end date (3 months from start date)
        const startDate = appointmentDate || new Date();
        const endDate = new Date(startDate);
        endDate.setMonth(endDate.getMonth() + 3);
        
        // Create weekly schedule for each selected day
        const weeklySchedule = selectedDays.map(day => ({
          day: day,
          time_slots: [
            {
              start_time: startTime,
              end_time: endTime
            }
          ]
        }));
        
        payload = {
          house_type_id: selectedHouseTypeId || "",
          cleaningHouse: cleaningHouse,
          buildingType: buildingType,
          frequency: normalizedFreq,
          subscription: {
            start_date: startDate.toISOString().split('T')[0],
            end_date: endDate.toISOString().split('T')[0],
            weekly_schedule: weeklySchedule
          },
          cleaning_address: {
            state: user?.profile?.state || "",
            address:
              user?.profile?.address?.address ||
              user?.profile?.location_area ||
              "",
            longitude: user?.profile?.address?.longitude || "",
            latitude: user?.profile?.address?.latitude || "",
          },
          payment_method: "PAYMENT_GATEWAY",
          notes: ""
        };
      }

      const res = await bookCleaning(payload);
      if (res && (res as any).data?.payment_url) {
        const url = (res as any).data.payment_url as string;
        toast.success("Redirecting to payment...", { position: "top-center" });
        setOpen(false);
        if (typeof window !== "undefined") {
          window.location.href = url;
        }
      } else {
        toast.success("Cleaning booking created", { position: "top-center" });
        setOpen(false);
      }
    } catch (error: any) {
      const message = error?.response?.data?.message || "Failed to create booking";
      toast.error(message, { position: "top-center" });
    }
  };

  return (
    <div className="pt-[123px] lg:pt-0 relative z-30">
      <aside
        className="pt-20 relative z-20 mx-auto max-w-[885px]"
        id="select-rooms"
      >
        <h1 className=" font-league-spartan font-medium text-[36px] text-center my-[35px]">
          Select your home type
        </h1>
        <div className="flex gap-4 justify-between pt-6 my-20 lg:my-[100px] font-league-spartan text-xl lg:text-[30px]">
          <Button
            onClick={() => setBuildingType("flat")}
            className={cn(
              "border border-[#4E4848] rounded-[10px] text-sm md:text-xl bg-white lg:p-[40px] lg:px-[60px]",
              buildingType === "flat"
                ? "border-primary border-2 bg-[#D4D1FC80] dark:bg-primary text-primary dark:text-white"
                : "bg-white dark:bg-[#4E4848] text-[#4E4848]  dark:text-white "
            )}
          >
            Flat / Bungalow
          </Button>

          <Button
            onClick={() => setBuildingType("duplex")}
            className={cn(
              "border border-[#4E4848] rounded-[10px] text-sm md:text-xl bg-white lg:p-[40px] lg:px-[60px]",
              buildingType === "duplex"
                ? "border-primary border-2 bg-[#D4D1FC80] dark:bg-primary text-primary dark:text-white"
                : "bg-white dark:bg-[#4E4848] text-[#4E4848]  dark:text-white "
            )}
          >
            Duplex / Terrace
          </Button>
        </div>
        {cleaningType === "Housekeeping" ? (
          <div className="flex gap-4 justify-between pt-6 my-20 lg:my-[100px] font-league-spartan text-xl lg:text-[30px]">
            <Button
              onClick={() => setCleaningHouse("detailed")}
              className={cn(
                "border border-[#4E4848] rounded-[10px] text-sm md:text-xl bg-white lg:p-[40px] lg:px-[60px]",
                cleaningHouse === "detailed"
                  ? "border-primary border-2 bg-[#D4D1FC80] dark:bg-primary text-primary dark:text-white"
                  : "bg-white dark:bg-[#4E4848] text-[#4E4848]  dark:text-white "
              )}
            >
              Surface Cleaning
            </Button>

            <Button
              onClick={() => setCleaningHouse("deep")}
              className={cn(
                "border border-[#4E4848] rounded-[10px] text-sm md:text-xl bg-white  lg:p-[40px] lg:px-[60px]",
                cleaningHouse === "deep"
                  ? "border-primary border-2 bg-[#D4D1FC80] dark:bg-primary text-primary dark:text-white"
                  : "bg-white dark:bg-[#4E4848] text-[#4E4848]  dark:text-white "
              )}
            >
              Deep Cleaning
            </Button>
          </div>
        ) : null}

        {cleaningType === "Housekeeping" ? (
          <section>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredHouseTypes.map((ht) => {
                const price = (() => {
                  if (cleaningHouse === "deep") {
                    return toNum(ht.deepCleaning_price) || toNum(ht.onetime_price);
                  }
                  if (isOneTime) return toNum(ht.onetime_price);
                  const base = toNum(ht.monthly_price);
                  let multiplier = 1;
                  if (frequency === "Twice A Week") multiplier = 2;
                  if (frequency === "Three Times A Week") multiplier = 3;
                  return base * multiplier;
                })();
                const isSelected = selectedHouseTypeId === ht._id;
                return (
                  <button
                    key={ht._id}
                    type="button"
                    onClick={() => {
                      setSelectedHouseTypeId(ht._id);
                    }}
                    className={cn(
                      "w-full text-left p-4 rounded-[10px] border transition-colors bg-[#F5F5F5] dark:bg-secondary text-black",
                      isSelected ? "bg-primary dark:bg-primary" : "border-[#E5E5E5]"
                    )}
                  >
                    <div className="font-league-spartan font-medium text-lg lg:text-2xl">{ht.house_title || ht.house_type}</div>
                    <div className="mt-2 text-xl">&#8358;{price}</div>
                  </button>
                );
              })}
            </div>

            <aside className="flex items-center justify-between gap-5 mt-5">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="one-time"
                  checked={isOneTime}
                  onCheckedChange={(checked) => setIsOneTime(checked as boolean)}
                />
                <label
                  htmlFor="one-time"
                  className="text-sm lg:text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  One-time service (unchecked for monthly subscription)
                </label>
              </div>
              <Button className="hover:bg-primary button-grad" onClick={handleFetch}>
                Calculate
              </Button>
            </aside>

            <div className="flex justify-between gap-3 items-center font-league-spartan font-medium text-2xl md:text-[36px] mt-20">
              <h1>Total {isOneTime || cleaningHouse === "deep" ? "(one-time)" : "(monthly)"}</h1>
              {isLoading ? (
                <p>
                  <Loader2 className="animate-spin dark:text-white" />
                </p>
              ) : (
                <p>&#8358;{total}</p>
              )}
            </div>

            <div className="pt-20">
              <h1 className="text-2xl md:text-[36px] font-league-spartan font-medium">Select Frequency</h1>

              {cleaningHouse !== "deep" && (
                <div className="flex gap-2 justify-start pt-6 max-w-[calc(100vw-30px)] overflow-x-auto">
                  <Button
                    onClick={() => setFrequency("Three Times A Week")}
                    className={cn(
                      "border border-[#4E4848] rounded-[10px] text-sm md:text-xl bg-white text-[#4E4848] hover:bg-white/80",
                      frequency === "Three Times A Week" ? "border-primary border-2 bg-secondary" : ""
                    )}
                  >
                    Three Times a Week
                  </Button>

                  <Button
                    onClick={() => setFrequency("Twice A Week")}
                    className={cn(
                      "border border-[#4E4848] rounded-[10px] text-sm md:text-xl bg-white text-[#4E4848] hover:bg-white/80",
                      frequency === "Twice A Week" ? "border-primary border-2 bg-secondary" : ""
                    )}
                  >
                    Twice a Week
                  </Button>
                  <Button
                    onClick={() => setFrequency("Once A Week")}
                    className={cn(
                      "border border-[#4E4848] rounded-[10px] text-sm md:text-xl bg-white text-[#4E4848] hover:bg-white/80",
                      frequency === "Once A Week" ? "border-primary border-2 bg-secondary" : ""
                    )}
                  >
                    Once a Week
                  </Button>
                </div>
              )}
            </div>

            <div className="pt-20">
              <h1 className=" text-2xl md:text-[36px] font-league-spartan font-medium">Cleaning Time</h1>

              <div className="flex gap-2 justify-start pt-6">
                <Button
                  onClick={() => setTime("8am - 12pm")}
                  className={cn(
                    "border border-[#4E4848] rounded-[10px] text-sm bg-white text-[#4E4848] hover:bg-white/90",
                    time === "8am - 12pm" && "border-primary bg-secondary"
                  )}
                >
                  8am - 12pm
                </Button>
                <Button
                  onClick={() => setTime("12pm - 4pm")}
                  className={cn(
                    "border border-[#4E4848] rounded-[10px] text-sm bg-white text-[#4E4848] hover:bg-white/90",
                    time === "12pm - 4pm" && "border-primary bg-secondary"
                  )}
                >
                  12pm - 4pm
                </Button>
              </div>
            </div>

            {/* Appointment Date Selection - For all booking types */}
            <div className="pt-20">
              <h1 className="text-2xl md:text-[36px] font-league-spartan font-medium">{isOneTime ? "Appointment Date" : "Start Date"}</h1>
              <div className="pt-6 max-w-[300px]">
                <DatePicker
                  date={appointmentDate}
                  onDateChange={setAppointmentDate}
                  placeholder={isOneTime ? "Select appointment date" : "Select start date"}
                  className="w-full"
                />
              </div>
            </div>

            {/* Day Selection - Only for subscription orders */}
            {!isOneTime && (
              <div className="pt-20">
                <h1 className="text-2xl md:text-[36px] font-league-spartan font-medium">Select Days</h1>
                <div className="pt-6 space-y-4">
                  {frequency === "Once A Week" && (
                    <div>
                      <Label className="text-lg font-medium">Choose day of the week:</Label>
                      <Select value={selectedDays[0] || ""} onValueChange={(value) => setSelectedDays([value])}>
                        <SelectTrigger className="w-full max-w-[300px] mt-2">
                          <SelectValue placeholder="Select a day" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Monday">Monday</SelectItem>
                          <SelectItem value="Tuesday">Tuesday</SelectItem>
                          <SelectItem value="Wednesday">Wednesday</SelectItem>
                          <SelectItem value="Thursday">Thursday</SelectItem>
                          <SelectItem value="Friday">Friday</SelectItem>
                          <SelectItem value="Saturday">Saturday</SelectItem>
                          <SelectItem value="Sunday">Sunday</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                  
                  {frequency === "Twice A Week" && (
                    <div className="space-y-3">
                      <Label className="text-lg font-medium">Choose 2 days of the week:</Label>
                      <div className="grid grid-cols-2 gap-3 max-w-[400px]">
                        {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day) => (
                          <div key={day} className="flex items-center space-x-2">
                            <Checkbox
                              id={day}
                              checked={selectedDays.includes(day)}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  if (selectedDays.length < 2) {
                                    setSelectedDays([...selectedDays, day]);
                                  }
                                } else {
                                  setSelectedDays(selectedDays.filter(d => d !== day));
                                }
                              }}
                              disabled={!selectedDays.includes(day) && selectedDays.length >= 2}
                            />
                            <Label htmlFor={day} className="text-sm font-normal">{day}</Label>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {frequency === "Three Times A Week" && (
                    <div className="space-y-3">
                      <Label className="text-lg font-medium">Choose 3 days of the week:</Label>
                      <div className="grid grid-cols-2 gap-3 max-w-[400px]">
                        {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day) => (
                          <div key={day} className="flex items-center space-x-2">
                            <Checkbox
                              id={`three-${day}`}
                              checked={selectedDays.includes(day)}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  if (selectedDays.length < 3) {
                                    setSelectedDays([...selectedDays, day]);
                                  }
                                } else {
                                  setSelectedDays(selectedDays.filter(d => d !== day));
                                }
                              }}
                              disabled={!selectedDays.includes(day) && selectedDays.length >= 3}
                            />
                            <Label htmlFor={`three-${day}`} className="text-sm font-normal">{day}</Label>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </section>
        ) : (
           <section>
             <p>
               You can proceed to scheduling, as price will be discussed upon
               inspection of property. Thank you.
             </p>
           </section>
         )}

        <div className="my-20 w-full flex justify-center">
          <Button
            onClick={handleScheduleClick}
            disabled={isBooking}
            className=" button-grad text-white w-full max-w-[350px] gap-4 px-12"
          >
            Schedule Cleaning
            <FaArrowRight />
          </Button>
        </div>
        <DrawerDialog open={open} onOpenChange={setOpen}>
          <div className="mt-6">
            <CleaningServiceForm
              frequency={frequency}
              total={total}
              buildingType={buildingType}
              cleaningType={cleaningType}
              cleaningHouse={cleaningHouse}
              time={time}
              setOpen={setOpen}
              onSubmit={handleCleaningFormSubmit}
              externalLoading={isBooking}
            />
          </div>
        </DrawerDialog>
      </aside>
    </div>
  );
};

export default CleaningCalculator;
