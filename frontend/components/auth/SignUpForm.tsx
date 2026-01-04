"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Info } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { authService } from "@/services/auth.service";

const signUpSchema = z
  .object({
    fullName: z.string().min(2, "Name is required"),
    email: z.email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(8, "Confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

type SignUpFormData = z.infer<typeof signUpSchema>;

export default function SignUpForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: SignUpFormData) => {
    setIsLoading(true);
    setError(null);

    console.log("Submitting sign up form with values:", values);

    try {
      const response = await authService.signUp(
        values.fullName,
        values.email,
        values.password
      );

      console.log(response);

      router.push("/login");
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="backdrop-blur-sm bg-[#19263366] border border-[#233648] flex flex-col items-center justify-center w-full max-w-110 rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.35)] overflow-hidden">
      <div className="w-full px-6 pb-8 pt-6">
        {error && (
          <div className="mb-4 p-3 bg-red-900/20 border border-red-600 rounded text-red-400 text-sm">
            {error}
          </div>
        )}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <Label
                    htmlFor="fullName"
                    className="text-white text-sm font-medium"
                  >
                    Full Name
                  </Label>
                  <FormControl>
                    <Input
                      id="fullName"
                      placeholder="Jane Doe"
                      className="h-12 bg-[#192633] border border-[#324d67] text-white placeholder:text-[#92adc9]"
                      {...field}
                    />
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
                  <Label
                    htmlFor="email"
                    className="text-white text-sm font-medium"
                  >
                    Work Email
                  </Label>
                  <FormControl>
                    <Input
                      id="email"
                      type="email"
                      placeholder="name@company.com"
                      className="h-12 bg-[#192633] border border-[#324d67] text-white placeholder:text-[#92adc9]"
                      {...field}
                    />
                  </FormControl>
                  <p className="text-xs text-[#92adc9] mt-2 flex text-start gap-2">
                    <Info className="w-4 h-4 mt-0.5" />
                    Your organization role (RBAC) will be assigned automatically
                    based on your email domain.
                  </p>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <Label
                    htmlFor="password"
                    className="text-white text-sm font-medium"
                  >
                    Password
                  </Label>
                  <div className="relative">
                    <FormControl>
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Min. 8 characters"
                        className="h-12 bg-[#192633] border border-[#324d67] text-white placeholder:text-[#92adc9] pr-10"
                        {...field}
                      />
                    </FormControl>
                    <button
                      type="button"
                      aria-label="Toggle password visibility"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#92adc9] hover:text-white"
                      onClick={() => setShowPassword((v) => !v)}
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <Label
                    htmlFor="confirmPassword"
                    className="text-white text-sm font-medium"
                  >
                    Confirm Password
                  </Label>
                  <div className="relative">
                    <FormControl>
                      <Input
                        id="confirmPassword"
                        type={showConfirm ? "text" : "password"}
                        placeholder="Re-enter password"
                        className="h-12 bg-[#192633] border border-[#324d67] text-white placeholder:text-[#92adc9] pr-10"
                        {...field}
                      />
                    </FormControl>
                    <button
                      type="button"
                      aria-label="Toggle confirm password visibility"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#92adc9] hover:text-white"
                      onClick={() => setShowConfirm((v) => !v)}
                    >
                      {showConfirm ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full h-12 bg-[#2b8cee] hover:bg-[#58a8f5] text-white font-semibold text-base rounded-lg shadow-[0px_10px_15px_-3px_rgba(43,140,238,0.2),0px_4px_6px_-4px_rgba(43,140,238,0.2)]"
              disabled={isLoading}
            >
              {isLoading ? "Creating account..." : "Create account"}
            </Button>

            <div className="flex items-center w-full justify-center">
              <div className="flex-1 h-px bg-[#324d67]" />
              <span className="px-3 text-sm text-[#92adc9] bg-[#16212c]">
                Or continue with
              </span>
              <div className="flex-1 h-px bg-[#324d67]" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Button
                type="button"
                variant="outline"
                className="h-11 bg-[#192633] border border-[#324d67] text-white hover:bg-[#1f2f3f] flex items-center justify-center gap-2"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M9.99935 1.6665C5.39685 1.6665 1.66602 5.40317 1.66602 10.014C1.66602 13.7015 4.05352 16.8307 7.36518 17.934C7.78185 18.0107 7.93352 17.7532 7.93352 17.5315C7.93352 17.334 7.92685 16.8082 7.92268 16.1123C5.60435 16.6165 5.11518 14.9932 5.11518 14.9932C4.73685 14.0282 4.19018 13.7715 4.19018 13.7715C3.43352 13.2548 4.24768 13.2648 4.24768 13.2648C5.08352 13.3232 5.52352 14.1248 5.52352 14.1248C6.26685 15.3998 7.47435 15.0315 7.94851 14.8182C8.02518 14.279 8.24018 13.9115 8.47852 13.7032C6.62852 13.4923 4.68268 12.7757 4.68268 9.57734C4.68268 8.6665 5.00768 7.92067 5.54018 7.33734C5.45435 7.1265 5.16852 6.27734 5.62185 5.129C5.62185 5.129 6.32185 4.904 7.91352 5.984C8.59332 5.7986 9.29471 5.70416 9.99935 5.70317C10.7077 5.7065 11.4202 5.799 12.086 5.984C13.6768 4.904 14.3752 5.12817 14.3752 5.12817C14.8302 6.27734 14.5435 7.1265 14.4585 7.33734C14.9918 7.92067 15.3152 8.6665 15.3152 9.57734C15.3152 12.784 13.366 13.4898 11.5102 13.6965C11.8093 13.954 12.0752 14.4632 12.0752 15.2423C12.0752 16.3573 12.0652 17.2582 12.0652 17.5315C12.0652 17.7548 12.2152 18.0148 12.6385 17.9332C14.2979 17.3766 15.7405 16.3126 16.7622 14.8915C17.784 13.4705 18.3334 11.7643 18.3327 10.014C18.3327 5.40317 14.601 1.6665 9.99935 1.6665Z"
                    fill="white"
                  />
                </svg>
                GitHub
              </Button>
              <Button
                type="button"
                variant="outline"
                className="h-11 bg-[#192633] border border-[#324d67] text-white hover:bg-[#1f2f3f] flex items-center justify-center gap-2"
              >
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M19.6 10.23c0-.64-.06-1.25-.18-1.84H10v3.48h5.39a4.6 4.6 0 0 1-2 3.02v2.5h3.24a9.7 9.7 0 0 0 2.97-7.16Z"
                    fill="#4285F4"
                  />
                  <path
                    d="M10 20c2.7 0 4.96-.9 6.61-2.44l-3.24-2.5c-.9.6-2.06.96-3.37.96-2.6 0-4.8-1.76-5.59-4.13H1.08v2.6A10 10 0 0 0 10 20Z"
                    fill="#34A853"
                  />
                  <path
                    d="M4.41 11.89a6 6 0 0 1 0-3.78V5.5H1.08a10 10 0 0 0 0 9.02l3.33-2.63Z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M10 4.04c1.47 0 2.8.5 3.84 1.5l2.88-2.88C14.95.98 12.7 0 10 0A10 10 0 0 0 1.08 5.5L4.4 8.11C5.2 5.74 7.4 4.04 10 4.04Z"
                    fill="#EA4335"
                  />
                </svg>
                Google
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
